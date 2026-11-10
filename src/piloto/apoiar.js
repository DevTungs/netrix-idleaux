// Apoiar ♥: um quadro opcional com a chave Pix (chave aleatória) para ajudar o Netrix Hub.
// Só mostra e copia a chave; nada é enviado a lugar nenhum e nada muda no funcionamento da extensão.
// O botão "Apoiar" mora no rodapé do menu (piloto/suporte.js) e só aparece se este módulo carregou.
(function (raiz) {
  'use strict';
  const PIH = raiz.__pokeidleHunt;
  if (!PIH || !PIH.kit) return;
  const esc = PIH.kit.esc;

  const CHAVE_PIX = '8726c7c3-30d4-4381-b71d-1241b949fb89';
  // Pix "copia e cola" estático (BR Code, sem valor: quem paga escolhe) e o QR dele, gerados fora da
  // extensão: o desenho é um módulo por quadradinho (41×41) num só <path>. Se a chave mudar, refazer os dois.
  const COPIA_E_COLA = '00020101021126580014br.gov.bcb.pix01368726c7c3-30d4-4381-b71d-1241b949fb895204000053039865802BR5908DEVTUNGS6006BRASIL62070503***6304DAAB';
  const QR_LADO = 41;
  const QR_PATH = 'M0 0h7v1h-7zM9 0h1v1h-1zM12 0h1v1h-1zM15 0h2v1h-2zM18 0h1v1h-1zM20 0h3v1h-3zM26 0h3v1h-3zM32 0h1v1h-1zM34 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM10 1h4v1h-4zM15 1h1v1h-1zM18 1h1v1h-1zM22 1h1v1h-1zM24 1h1v1h-1zM27 1h3v1h-3zM32 1h1v1h-1zM34 1h1v1h-1zM40 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM11 2h2v1h-2zM21 2h2v1h-2zM24 2h1v1h-1zM29 2h1v1h-1zM34 2h1v1h-1zM36 2h3v1h-3zM40 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h2v1h-2zM13 3h1v1h-1zM15 3h2v1h-2zM18 3h4v1h-4zM23 3h1v1h-1zM27 3h3v1h-3zM32 3h1v1h-1zM34 3h1v1h-1zM36 3h3v1h-3zM40 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h2v1h-2zM13 4h1v1h-1zM17 4h3v1h-3zM21 4h4v1h-4zM30 4h2v1h-2zM34 4h1v1h-1zM36 4h3v1h-3zM40 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM11 5h1v1h-1zM13 5h1v1h-1zM15 5h1v1h-1zM19 5h1v1h-1zM21 5h1v1h-1zM23 5h3v1h-3zM29 5h3v1h-3zM34 5h1v1h-1zM40 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h1v1h-1zM32 6h1v1h-1zM34 6h7v1h-7zM8 7h1v1h-1zM10 7h1v1h-1zM16 7h1v1h-1zM18 7h1v1h-1zM22 7h1v1h-1zM25 7h3v1h-3zM30 7h1v1h-1zM32 7h1v1h-1zM0 8h1v1h-1zM2 8h5v1h-5zM9 8h1v1h-1zM12 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM25 8h1v1h-1zM27 8h2v1h-2zM30 8h3v1h-3zM34 8h5v1h-5zM1 9h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1zM7 9h1v1h-1zM11 9h1v1h-1zM13 9h4v1h-4zM18 9h2v1h-2zM21 9h4v1h-4zM26 9h1v1h-1zM30 9h6v1h-6zM39 9h2v1h-2zM0 10h2v1h-2zM4 10h3v1h-3zM8 10h2v1h-2zM11 10h1v1h-1zM13 10h2v1h-2zM16 10h1v1h-1zM19 10h1v1h-1zM21 10h2v1h-2zM26 10h3v1h-3zM33 10h1v1h-1zM36 10h1v1h-1zM39 10h2v1h-2zM1 11h2v1h-2zM7 11h4v1h-4zM13 11h2v1h-2zM16 11h3v1h-3zM20 11h1v1h-1zM22 11h1v1h-1zM24 11h2v1h-2zM28 11h3v1h-3zM36 11h1v1h-1zM39 11h2v1h-2zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h5v1h-5zM13 12h2v1h-2zM16 12h1v1h-1zM21 12h1v1h-1zM24 12h1v1h-1zM26 12h3v1h-3zM33 12h2v1h-2zM36 12h1v1h-1zM40 12h1v1h-1zM0 13h1v1h-1zM3 13h2v1h-2zM8 13h1v1h-1zM10 13h1v1h-1zM13 13h2v1h-2zM16 13h3v1h-3zM21 13h1v1h-1zM24 13h1v1h-1zM26 13h7v1h-7zM37 13h1v1h-1zM39 13h1v1h-1zM0 14h1v1h-1zM2 14h1v1h-1zM4 14h3v1h-3zM9 14h3v1h-3zM15 14h1v1h-1zM17 14h2v1h-2zM22 14h3v1h-3zM27 14h1v1h-1zM35 14h3v1h-3zM40 14h1v1h-1zM2 15h4v1h-4zM7 15h1v1h-1zM9 15h2v1h-2zM13 15h2v1h-2zM16 15h3v1h-3zM20 15h1v1h-1zM24 15h2v1h-2zM27 15h1v1h-1zM29 15h1v1h-1zM31 15h3v1h-3zM37 15h3v1h-3zM0 16h1v1h-1zM2 16h2v1h-2zM6 16h2v1h-2zM9 16h1v1h-1zM11 16h2v1h-2zM14 16h4v1h-4zM21 16h1v1h-1zM23 16h2v1h-2zM27 16h1v1h-1zM29 16h1v1h-1zM31 16h1v1h-1zM34 16h2v1h-2zM38 16h2v1h-2zM0 17h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM17 17h1v1h-1zM24 17h1v1h-1zM26 17h2v1h-2zM32 17h1v1h-1zM36 17h2v1h-2zM0 18h1v1h-1zM2 18h1v1h-1zM4 18h3v1h-3zM8 18h1v1h-1zM12 18h2v1h-2zM16 18h3v1h-3zM21 18h1v1h-1zM23 18h5v1h-5zM34 18h1v1h-1zM37 18h1v1h-1zM40 18h1v1h-1zM0 19h1v1h-1zM4 19h1v1h-1zM7 19h2v1h-2zM10 19h3v1h-3zM14 19h1v1h-1zM18 19h1v1h-1zM21 19h1v1h-1zM24 19h4v1h-4zM30 19h1v1h-1zM33 19h1v1h-1zM38 19h3v1h-3zM1 20h1v1h-1zM3 20h2v1h-2zM6 20h1v1h-1zM10 20h2v1h-2zM13 20h1v1h-1zM18 20h1v1h-1zM20 20h1v1h-1zM23 20h2v1h-2zM26 20h3v1h-3zM31 20h1v1h-1zM34 20h1v1h-1zM36 20h1v1h-1zM0 21h3v1h-3zM4 21h2v1h-2zM9 21h2v1h-2zM12 21h2v1h-2zM16 21h3v1h-3zM21 21h1v1h-1zM27 21h2v1h-2zM30 21h1v1h-1zM32 21h1v1h-1zM36 21h4v1h-4zM4 22h4v1h-4zM9 22h3v1h-3zM13 22h2v1h-2zM16 22h1v1h-1zM18 22h4v1h-4zM23 22h4v1h-4zM29 22h1v1h-1zM31 22h1v1h-1zM36 22h1v1h-1zM38 22h2v1h-2zM0 23h4v1h-4zM5 23h1v1h-1zM8 23h3v1h-3zM14 23h3v1h-3zM18 23h1v1h-1zM20 23h3v1h-3zM24 23h4v1h-4zM32 23h1v1h-1zM35 23h1v1h-1zM37 23h2v1h-2zM0 24h2v1h-2zM3 24h2v1h-2zM6 24h1v1h-1zM9 24h2v1h-2zM13 24h1v1h-1zM15 24h1v1h-1zM18 24h1v1h-1zM20 24h2v1h-2zM25 24h1v1h-1zM27 24h5v1h-5zM33 24h4v1h-4zM0 25h3v1h-3zM4 25h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM13 25h1v1h-1zM16 25h1v1h-1zM19 25h1v1h-1zM22 25h3v1h-3zM26 25h2v1h-2zM29 25h1v1h-1zM35 25h1v1h-1zM39 25h2v1h-2zM1 26h1v1h-1zM5 26h5v1h-5zM14 26h3v1h-3zM21 26h1v1h-1zM27 26h2v1h-2zM31 26h1v1h-1zM33 26h1v1h-1zM36 26h5v1h-5zM0 27h4v1h-4zM5 27h1v1h-1zM7 27h2v1h-2zM11 27h2v1h-2zM14 27h1v1h-1zM17 27h2v1h-2zM23 27h1v1h-1zM25 27h1v1h-1zM27 27h1v1h-1zM29 27h2v1h-2zM32 27h2v1h-2zM35 27h2v1h-2zM39 27h2v1h-2zM0 28h1v1h-1zM3 28h2v1h-2zM6 28h3v1h-3zM11 28h1v1h-1zM14 28h1v1h-1zM19 28h4v1h-4zM24 28h1v1h-1zM26 28h1v1h-1zM31 28h2v1h-2zM35 28h1v1h-1zM38 28h2v1h-2zM0 29h3v1h-3zM5 29h1v1h-1zM7 29h1v1h-1zM13 29h4v1h-4zM18 29h2v1h-2zM21 29h2v1h-2zM24 29h2v1h-2zM27 29h1v1h-1zM29 29h2v1h-2zM32 29h1v1h-1zM35 29h3v1h-3zM0 30h1v1h-1zM2 30h2v1h-2zM5 30h2v1h-2zM12 30h1v1h-1zM14 30h1v1h-1zM17 30h1v1h-1zM19 30h1v1h-1zM25 30h2v1h-2zM28 30h1v1h-1zM31 30h3v1h-3zM36 30h1v1h-1zM38 30h1v1h-1zM40 30h1v1h-1zM0 31h1v1h-1zM2 31h1v1h-1zM5 31h1v1h-1zM7 31h1v1h-1zM9 31h2v1h-2zM12 31h2v1h-2zM15 31h1v1h-1zM18 31h1v1h-1zM23 31h1v1h-1zM26 31h1v1h-1zM29 31h2v1h-2zM33 31h1v1h-1zM36 31h1v1h-1zM38 31h2v1h-2zM0 32h1v1h-1zM6 32h4v1h-4zM14 32h3v1h-3zM20 32h2v1h-2zM24 32h4v1h-4zM32 32h6v1h-6zM39 32h2v1h-2zM8 33h2v1h-2zM17 33h2v1h-2zM20 33h2v1h-2zM27 33h1v1h-1zM30 33h1v1h-1zM32 33h1v1h-1zM36 33h1v1h-1zM38 33h2v1h-2zM0 34h7v1h-7zM9 34h3v1h-3zM13 34h3v1h-3zM17 34h1v1h-1zM20 34h1v1h-1zM22 34h2v1h-2zM27 34h1v1h-1zM30 34h1v1h-1zM32 34h1v1h-1zM34 34h1v1h-1zM36 34h1v1h-1zM39 34h1v1h-1zM0 35h1v1h-1zM6 35h1v1h-1zM8 35h2v1h-2zM13 35h1v1h-1zM15 35h8v1h-8zM24 35h2v1h-2zM27 35h2v1h-2zM30 35h1v1h-1zM32 35h1v1h-1zM36 35h4v1h-4zM0 36h1v1h-1zM2 36h3v1h-3zM6 36h1v1h-1zM8 36h1v1h-1zM10 36h1v1h-1zM12 36h2v1h-2zM15 36h1v1h-1zM24 36h2v1h-2zM28 36h1v1h-1zM30 36h7v1h-7zM38 36h2v1h-2zM0 37h1v1h-1zM2 37h3v1h-3zM6 37h1v1h-1zM8 37h3v1h-3zM13 37h6v1h-6zM20 37h4v1h-4zM25 37h3v1h-3zM30 37h2v1h-2zM33 37h2v1h-2zM36 37h1v1h-1zM39 37h1v1h-1zM0 38h1v1h-1zM2 38h3v1h-3zM6 38h1v1h-1zM8 38h2v1h-2zM11 38h2v1h-2zM14 38h3v1h-3zM18 38h2v1h-2zM22 38h4v1h-4zM28 38h1v1h-1zM30 38h1v1h-1zM32 38h1v1h-1zM36 38h1v1h-1zM38 38h2v1h-2zM0 39h1v1h-1zM6 39h1v1h-1zM10 39h1v1h-1zM13 39h1v1h-1zM17 39h1v1h-1zM20 39h3v1h-3zM26 39h2v1h-2zM34 39h1v1h-1zM36 39h1v1h-1zM0 40h7v1h-7zM8 40h1v1h-1zM13 40h2v1h-2zM17 40h4v1h-4zM23 40h1v1h-1zM27 40h4v1h-4zM32 40h1v1h-1zM35 40h3v1h-3zM39 40h1v1h-1z';
  const L = () => { try { const l = PIH.idioma && PIH.idioma.atual ? PIH.idioma.atual() : 'pt'; return ['pt', 'en', 'es'].includes(l) ? l : 'pt'; } catch { return 'pt'; } };
  const T = {
    titulo: { pt: 'Apoiar o Netrix Hub', en: 'Support the Netrix Hub', es: 'Apoyar el Netrix Hub' },
    texto: {
      pt: 'O Netrix Hub é gratuito e mantido pelo DevTungs. Se ele te ajuda, você pode contribuir com qualquer valor por Pix. É opcional e não muda nada na extensão.',
      en: 'The Netrix Hub is free and maintained by DevTungs. If it helps you, you can chip in any amount through Pix (Brazil only). It is optional and changes nothing in the extension.',
      es: 'El Netrix Hub es gratuito y lo mantiene DevTungs. Si te ayuda, puedes aportar cualquier valor por Pix (solo Brasil). Es opcional y no cambia nada en la extensión.',
    },
    chave: { pt: 'Chave Pix (aleatória)', en: 'Pix key (random)', es: 'Clave Pix (aleatoria)' },
    copiar: { pt: 'Copiar chave', en: 'Copy key', es: 'Copiar clave' },
    copiada: { pt: 'Chave copiada!', en: 'Key copied!', es: '¡Clave copiada!' },
    falhou: { pt: 'Não deu para copiar: selecione a chave e copie.', en: 'Could not copy: select the key and copy it.', es: 'No se pudo copiar: selecciona la clave y cópiala.' },
    qr: { pt: 'QR Code do Pix', en: 'Pix QR Code', es: 'Código QR del Pix' },
    copiarCola: { pt: 'Copiar Pix copia e cola', en: 'Copy Pix copy-and-paste code', es: 'Copiar Pix copia y pega' },
    nota: {
      pt: 'No app do seu banco, escaneie o QR Code ou use Pix → Pagar → Pix Copia e Cola (ou Chave Pix). O valor é você que escolhe.',
      en: 'In your bank app, scan the QR Code or use Pix → Pay → Pix copy-and-paste (or Pix key). You choose the amount.',
      es: 'En la app de tu banco, escanea el código QR o usa Pix → Pagar → Pix copia y pega (o Clave Pix). El valor lo eliges tú.',
    },
    fechar: { pt: 'Fechar', en: 'Close', es: 'Cerrar' },
  };
  const tx = (k) => T[k][L()] || T[k].pt;

  let fundo = null;
  function fechar() {
    if (!fundo) return;
    fundo.remove();
    fundo = null;
    removeEventListener('keydown', aoTeclar, true);
  }
  const aoTeclar = (ev) => { if (ev.key === 'Escape') { ev.stopPropagation(); fechar(); } };

  async function copiar(btn, texto, rotulo) {
    let ok = false;
    try { await navigator.clipboard.writeText(texto); ok = true; } catch {
      const ta = document.createElement('textarea');
      ta.value = texto;
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand('copy'); } catch { /* sem cópia */ }
      ta.remove();
    }
    btn.textContent = ok ? tx('copiada') : tx('falhou');
    setTimeout(() => { if (btn.isConnected) btn.textContent = rotulo; }, 2200);
  }

  function abrir() {
    if (fundo || !document.body) return;
    fundo = document.createElement('div');
    fundo.className = 'plt-ap-fundo';
    fundo.dataset.semTraducao = '1'; // o texto já sai no idioma certo
    fundo.innerHTML = `<div class="plt-ap-caixa modal-caixa" role="dialog" aria-modal="true" aria-label="${esc(tx('titulo'))}">
        <div class="modal-topo plt-guia-topo">
          <h3 class="plt-guia-h"><span class="plt-ap-coracao" aria-hidden="true">♥</span><span>${esc(tx('titulo'))}</span></h3>
          <button type="button" class="plt-guia-fechar" data-ap="fechar" aria-label="${esc(tx('fechar'))}" title="${esc(tx('fechar'))}">×</button>
        </div>
        <div class="plt-ap-corpo">
          <p class="plt-ap-texto">${esc(tx('texto'))}</p>
          <div class="plt-ap-qr-caixa"><svg class="plt-ap-qr" viewBox="-4 -4 ${QR_LADO + 8} ${QR_LADO + 8}" role="img" aria-label="${esc(tx('qr'))}" shape-rendering="crispEdges"><rect x="-4" y="-4" width="${QR_LADO + 8}" height="${QR_LADO + 8}" fill="#fff"/><path d="${QR_PATH}" fill="#000"/></svg></div>
          <div class="plt-ap-chave"><small>${esc(tx('chave'))}</small><code>${CHAVE_PIX}</code></div>
          <p class="plt-ap-nota">${esc(tx('nota'))}</p>
        </div>
        <div class="plt-guia-rodape"><button type="button" class="cfg-escala-bt on plt-ap-copiar" data-ap="copiar">${esc(tx('copiar'))}</button><button type="button" class="cfg-escala-bt plt-ap-copiar" data-ap="copiar-cola">${esc(tx('copiarCola'))}</button></div>
      </div>`;
    fundo.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-ap]');
      ev.stopPropagation();
      if (b && b.dataset.ap === 'copiar') copiar(b, CHAVE_PIX, tx('copiar'));
      else if (b && b.dataset.ap === 'copiar-cola') copiar(b, COPIA_E_COLA, tx('copiarCola'));
      else if (ev.target === fundo || (b && b.dataset.ap === 'fechar')) fechar();
    });
    document.body.append(fundo);
    addEventListener('keydown', aoTeclar, true);
    try { fundo.querySelector('.plt-ap-copiar').focus({ preventScroll: true }); } catch { /* sem foco */ }
  }

  PIH.apoiar = { abrir, fechar, chavePix: CHAVE_PIX, copiaECola: COPIA_E_COLA };
})(globalThis);
