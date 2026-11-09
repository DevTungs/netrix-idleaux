// Página de autorização única da pasta da extensão (precisa de um clique: regra do Chrome).
'use strict';
const $ = (id) => document.getElementById(id);
const msg = (t, c) => { $('msg').textContent = t; $('msg').className = c || ''; };
const NOME = chrome.runtime.getManifest().name;

async function mostrar() {
  const p = await NetrixAuto.permissao();
  $('estado').textContent = p === 'granted' ? 'Pasta autorizada: a atualização automática está ativa.'
    : p === 'prompt' ? 'A pasta já foi escolhida, mas o Chrome pede para confirmar o acesso de novo.' : '';
  $('bt').textContent = p === 'prompt' ? 'Permitir de novo' : p === 'granted' ? 'Escolher outra pasta' : 'Escolher a pasta da extensão';
}

async function pastaCerta(h) {
  try {
    const f = await (await h.getFileHandle('manifest.json')).getFile();
    return NetrixAuto.NOMES.includes(JSON.parse(await f.text()).name);
  } catch { return false; }
}

$('bt').addEventListener('click', async () => {
  try {
    let h = await NetrixAuto.lerPasta();
    if (h && (await NetrixAuto.permissao()) === 'prompt') {
      if ((await h.requestPermission({ mode: 'readwrite' })) !== 'granted') return msg('Acesso negado.', 'erro');
    } else {
      h = await showDirectoryPicker({ id: 'netrix-idleaux', mode: 'readwrite' });
      if (!(await pastaCerta(h))) return msg(`Essa não é a pasta do ${NOME} (não achei o manifest.json dele). Escolha a pasta onde você carregou a extensão.`, 'erro');
      if ((await h.requestPermission({ mode: 'readwrite' })) !== 'granted') return msg('Acesso negado.', 'erro');
      await NetrixAuto.guardarPasta(h);
    }
    msg('Pronto. Procurando atualização…', 'ok');
    const r = (await chrome.runtime.sendMessage({ tipo: 'upd:aplicar' })).dados;
    msg(r && r.status === 'aplicando' ? 'Atualizando agora: a extensão vai recarregar sozinha.' : 'Pasta autorizada. Você já está na versão mais nova (ou ela chega na próxima checagem).', 'ok');
    mostrar();
  } catch (e) { msg(String((e && e.message) || e), 'erro'); }
});
mostrar();
