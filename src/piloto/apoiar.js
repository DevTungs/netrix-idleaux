// Apoiar ♥: um quadro opcional com a chave Pix (chave aleatória) para ajudar o Netrix Hub.
// Só mostra e copia a chave; nada é enviado a lugar nenhum e nada muda no funcionamento da extensão.
// O botão "Apoiar" mora no rodapé do menu (piloto/suporte.js) e só aparece se este módulo carregou.
(function (raiz) {
  'use strict';
  const PIH = raiz.__pokeidleHunt;
  if (!PIH || !PIH.kit) return;
  const esc = PIH.kit.esc;

  const CHAVE_PIX = '8726c7c3-30d4-4381-b71d-1241b949fb89';
  // Pix "copia e cola" estático (BR Code, sem valor: quem paga escolhe) e o QR dele (src/qrcode-pix.png, embutido
  // aqui porque a página do jogo não carrega arquivos da extensão). Os dois dizem o mesmo; se um mudar, refazer o outro.
  const COPIA_E_COLA = '00020126580014BR.GOV.BCB.PIX01368726c7c3-30d4-4381-b71d-1241b949fb895204000053039865802BR5901N6001C62160512NETRIXDOACAO63040567';
  const QR_PNG = 'data:image/png;base64,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';
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
          <div class="plt-ap-qr-caixa"><img class="plt-ap-qr" src="${QR_PNG}" alt="${esc(tx('qr'))}" width="232" height="232"></div>
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
