// Netrix IdleAux: atualização automática de uma extensão instalada por pasta (modo desenvolvedor).
// O Chrome não deixa a extensão trocar os próprios arquivos, a não ser que a pessoa autorize a
// pasta uma vez (File System Access). Com a pasta autorizada, a extensão baixa o código do Release
// do GitHub (zip), descompacta, grava por cima e se recarrega. Roda no service worker e na página
// pasta.html. Sem dependências: o zip é lido com DecompressionStream.
(function (raiz) {
  'use strict';

  const BD = 'netrix-idleaux-pasta';
  const LOJA = 'k';
  const CHAVE = 'pasta';
  const MAX_ZIP = 40 * 1024 * 1024;
  const MAX_ARQUIVO = 10 * 1024 * 1024;

  // ---- a pasta autorizada, guardada no IndexedDB (o handle sobrevive ao navegador fechar) -------
  const abrirBd = () => new Promise((ok, falha) => {
    const r = indexedDB.open(BD, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(LOJA);
    r.onsuccess = () => ok(r.result);
    r.onerror = () => falha(r.error);
  });
  async function lerPasta() {
    const bd = await abrirBd();
    return new Promise((ok, falha) => {
      const r = bd.transaction(LOJA).objectStore(LOJA).get(CHAVE);
      r.onsuccess = () => ok(r.result || null);
      r.onerror = () => falha(r.error);
    });
  }
  async function guardarPasta(handle) {
    const bd = await abrirBd();
    return new Promise((ok, falha) => {
      const t = bd.transaction(LOJA, 'readwrite');
      t.objectStore(LOJA).put(handle, CHAVE);
      t.oncomplete = () => ok();
      t.onerror = () => falha(t.error);
    });
  }
  // 'granted' | 'prompt' | 'denied' | 'sem-pasta'
  async function permissao() {
    const h = await lerPasta().catch(() => null);
    if (!h) return 'sem-pasta';
    try { return await h.queryPermission({ mode: 'readwrite' }); } catch { return 'prompt'; }
  }

  // ---- zip ---------------------------------------------------------------------------------------
  const u16 = (d, o) => d.getUint16(o, true);
  const u32 = (d, o) => d.getUint32(o, true);
  async function inflar(bytes) {
    const fluxo = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(fluxo).arrayBuffer());
  }
  // lê pelo diretório central (o zip do GitHub usa descritor de dados: os tamanhos só estão lá)
  async function lerZip(buf) {
    const dados = new Uint8Array(buf);
    const dv = new DataView(dados.buffer, dados.byteOffset, dados.byteLength);
    let fim = -1;
    for (let i = dados.length - 22; i >= Math.max(0, dados.length - 22 - 65535); i--) if (u32(dv, i) === 0x06054b50) { fim = i; break; }
    if (fim < 0) throw new Error('zip inválido');
    const n = u16(dv, fim + 10);
    let o = u32(dv, fim + 16);
    const out = [];
    for (let k = 0; k < n; k++) {
      if (u32(dv, o) !== 0x02014b50) throw new Error('zip inválido (diretório)');
      const metodo = u16(dv, o + 10);
      const tc = u32(dv, o + 20);
      const tu = u32(dv, o + 24);
      const nn = u16(dv, o + 28); const ne = u16(dv, o + 30); const nc = u16(dv, o + 32);
      const local = u32(dv, o + 42);
      const nome = new TextDecoder().decode(dados.subarray(o + 46, o + 46 + nn));
      o += 46 + nn + ne + nc;
      if (nome.endsWith('/')) continue;
      if (tu > MAX_ARQUIVO) throw new Error('arquivo grande demais: ' + nome);
      const ini = local + 30 + u16(dv, local + 26) + u16(dv, local + 28);
      const cru = dados.subarray(ini, ini + tc);
      let conteudo;
      if (metodo === 0) conteudo = cru;
      else if (metodo === 8) conteudo = await inflar(cru);
      else throw new Error('método de zip não suportado: ' + metodo);
      out.push({ nome, conteudo });
    }
    return out;
  }

  // o zip do GitHub tem uma pasta raiz ("dono-repo-hash/"): tira, e recusa caminho fora da pasta
  function limparCaminhos(arquivos) {
    const out = [];
    for (const a of arquivos) {
      const partes = a.nome.split('/').slice(1);
      if (!partes.length || partes.some((p) => p === '' || p === '.' || p === '..' || p.includes('\\') || p.includes(':'))) continue;
      if (partes[0].startsWith('.')) continue; // .git, .github…
      out.push({ caminho: partes, conteudo: a.conteudo });
    }
    return out;
  }

  async function baixarZip(url) {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = await r.arrayBuffer();
    if (buf.byteLength > MAX_ZIP) throw new Error('zip grande demais');
    return buf;
  }

  async function gravarArquivo(pasta, caminho, conteudo) {
    let d = pasta;
    for (const p of caminho.slice(0, -1)) d = await d.getDirectoryHandle(p, { create: true });
    const f = await d.getFileHandle(caminho[caminho.length - 1], { create: true });
    const w = await f.createWritable();
    await w.write(conteudo);
    await w.close();
  }

  // Baixa o zip, confere que é esta extensão numa versão mais nova e grava na pasta autorizada.
  // O manifest.json vai por último: se algo falhar antes, a versão antiga continua valendo.
  async function aplicar({ zipUrl, versao, nome, versaoAtual, maior }) {
    const pasta = await lerPasta();
    if (!pasta) return { ok: false, motivo: 'sem-pasta' };
    if ((await pasta.queryPermission({ mode: 'readwrite' })) !== 'granted') return { ok: false, motivo: 'permissao' };
    const arquivos = limparCaminhos(await lerZip(await baixarZip(zipUrl)));
    const man = arquivos.find((a) => a.caminho.length === 1 && a.caminho[0] === 'manifest.json');
    if (!man) return { ok: false, motivo: 'sem manifest.json no zip' };
    const m = JSON.parse(new TextDecoder().decode(man.conteudo));
    if (m.name !== nome) return { ok: false, motivo: 'o zip não é desta extensão' };
    if (String(m.version) !== String(versao)) return { ok: false, motivo: `o zip é da versão ${m.version}, não da ${versao}` };
    if (!maior(m.version, versaoAtual)) return { ok: false, motivo: 'a versão do zip não é mais nova' };
    for (const a of arquivos) if (a !== man) await gravarArquivo(pasta, a.caminho, a.conteudo);
    await gravarArquivo(pasta, man.caminho, man.conteudo);
    return { ok: true, arquivos: arquivos.length, versao: m.version };
  }

  raiz.NetrixAuto = { lerPasta, guardarPasta, permissao, aplicar, _interno: { lerZip, limparCaminhos } };
})(globalThis);
