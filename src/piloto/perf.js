// Medidor de desempenho da extensão (2.0.22). Mede o tempo que cada relógio (setInterval), observador de
// DOM (MutationObserver) e evento interno (PIH.on) DA EXTENSÃO gasta na thread da página, para achar o que
// engasga. Não mede nem altera os relógios do jogo: só embrulha quem foi criado por um arquivo da extensão
// (descoberto pela pilha, uma vez, na hora de criar). Custo por chamada: dois performance.now().
//
// No console da página do jogo:  __pokeidleHunt.perf.top()   → tabela com os mais pesados
//                                __pokeidleHunt.perf.zerar() → recomeça a contagem
// Um aviso "[netrix-perf] lento" sai no console quando uma única chamada passa de 50 ms.
// Precisa carregar ANTES do hook.js (o manifest põe este arquivo primeiro).
(function (raiz) {
  'use strict';
  const PIH = (raiz.__pokeidleHunt = raiz.__pokeidleHunt || {});
  if (PIH.perf) return;

  const LENTO_MS = 50;
  const stats = new Map(); // rótulo → { n, ms, max }
  const avisados = new Map(); // rótulo → quando avisou (no máximo 1 aviso por rótulo a cada 60 s)

  function medir(rotulo, fn, esto, args) {
    const t0 = performance.now();
    try { return fn.apply(esto, args); } finally {
      const dt = performance.now() - t0;
      let s = stats.get(rotulo);
      if (!s) stats.set(rotulo, (s = { n: 0, ms: 0, max: 0 }));
      s.n++; s.ms += dt; if (dt > s.max) s.max = dt;
      if (dt > LENTO_MS) {
        const agora = Date.now();
        if (agora - (avisados.get(rotulo) || 0) > 60_000) {
          avisados.set(rotulo, agora);
          try { console.warn(`[netrix-perf] lento: ${rotulo} levou ${Math.round(dt)} ms`); } catch { /* sem console */ }
        }
      }
    }
  }

  // "src/piloto/time.js:437" a partir da pilha; null se a chamada não veio de um arquivo da extensão
  const ONDE = /(?:chrome|moz)-extension:\/\/[^/\s]+\/(src\/[^\s):]+:\d+)/g;
  const ondeFoi = () => {
    for (const m of String(new Error().stack || '').matchAll(ONDE)) if (!m[1].startsWith('src/piloto/perf.js:')) return m[1]; // pula as linhas deste arquivo
    return null;
  };

  const setIntervalOriginal = raiz.setInterval;
  raiz.setInterval = function (fn, ms, ...resto) {
    if (typeof fn !== 'function') return setIntervalOriginal.call(this, fn, ms, ...resto);
    const onde = ondeFoi();
    if (!onde) return setIntervalOriginal.call(this, fn, ms, ...resto);
    const rotulo = `relógio ${ms}ms · ${onde}`;
    return setIntervalOriginal.call(this, function (...a) { return medir(rotulo, fn, this, a); }, ms, ...resto);
  };

  const ObservadorOriginal = raiz.MutationObserver;
  if (ObservadorOriginal) {
    raiz.MutationObserver = class extends ObservadorOriginal {
      constructor(cb) {
        const onde = typeof cb === 'function' ? ondeFoi() : null;
        super(onde ? function (...a) { return medir(`observador · ${onde}`, cb, this, a); } : cb);
      }
    };
  }

  // eventos internos (o hook chama isto em emitirInterno): soma de todos os ouvintes do mesmo tipo
  PIH.perf = {
    medir,
    top(n = 15) {
      const linhas = [...stats].map(([rotulo, s]) => ({ rotulo, chamadas: s.n, 'total ms': Math.round(s.ms), 'média ms': +(s.ms / s.n).toFixed(2), 'máx ms': Math.round(s.max) }))
        .sort((a, b) => b['total ms'] - a['total ms']).slice(0, n);
      try { console.table(linhas); } catch { /* sem console */ }
      return linhas;
    },
    zerar() { stats.clear(); avisados.clear(); },
  };
})(globalThis);
