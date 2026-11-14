// Geometria das hunts e ritmo real, medidos enquanto você joga.
//
// GEOMETRIA (entra no cálculo): o mapa público do jogo não diz onde os selvagens nascem. Aqui,
// no instante em que uma ONDA CHEIA nasce, guardamos a distância (em tiles) do seu pokémon até
// cada selvagem novo — é a "fila de chegada" que o motor usa para estimar abates/h. Só onda
// cheia conta (pelo menos 80% dos pontos de spawn da hunt nascendo juntos): entrada no meio de
// uma onda ou reposição avulsa não dizem como a hunt é. Hunt sem onda cheia medida (e as de
// reposição por slot, acima do nv 150, que nunca têm onda) usa a geometria padrão, igual para
// todas — o ranking compara as hunts nas mesmas condições.
//
// RITMO (só referência): os abates/h de verdade por hunt e por pokémon. NÃO muda o ranking —
// senão a hunt em que você está caçando ganharia ou perderia posição só por isso.
//
// Tudo fica no localStorage do pokeidle.io, numa chave só da extensão.
(function (root) {
  'use strict';
  const PIH = (root.__pokeidleHunt ??= {});
  // v3: só ondas cheias. As amostras das versões anteriores (tiradas na entrada da hunt) são
  // descartadas; o ritmo medido (abates/h) é trazido.
  const CHAVE = 'pokeidle-hunt:geo:v3';
  const ANTIGAS = ['pokeidle-hunt:geo:v2', 'pokeidle-hunt:geo:v1'];
  const MAX_AMOSTRAS = 6;
  const JANELA_ONDA_MS = 4000; // selvagens que nascem dentro disto são a mesma onda
  const FRACAO_CHEIA = 0.8;
  const MIN_ONDA = 6;
  const MAX_SPAWNS = 16;

  let banco = ler();
  function ler() {
    try {
      const atual = JSON.parse(localStorage.getItem(CHAVE));
      if (atual) return atual;
      const hunts = {};
      for (const chave of ANTIGAS) {
        const velho = JSON.parse(localStorage.getItem(chave));
        for (const [slug, h] of Object.entries(velho?.hunts ?? {})) if (h.ritmo && !hunts[slug]) hunts[slug] = { ritmo: h.ritmo };
      }
      return { hunts };
    } catch { return { hunts: {} }; }
  }
  let gravarTimer = null;
  function gravar() {
    clearTimeout(gravarTimer);
    gravarTimer = setTimeout(() => {
      try { localStorage.setItem(CHAVE, JSON.stringify(banco)); } catch { /* cota cheia: segue sem */ }
    }, 2000);
  }

  // Quantos pontos de spawn cada hunt tem — a composição que o jogo manda no welcome.
  const pontosDaHunt = new Map();
  PIH.on?.('welcome', (m) => {
    for (const h of m?.hunts ?? []) {
      const total = (h.especies ?? []).reduce((s, e) => s + (Number(e.pontos) || 0), 0);
      if (h.slug && total) pontosDaHunt.set(h.slug, Math.min(MAX_SPAWNS, Math.round(total)));
    }
  });
  const ondaCheia = (slug) => Math.max(MIN_ONDA, Math.ceil(FRACAO_CHEIA * (pontosDaHunt.get(slug) ?? 15)));

  // O pacote vem com chaves curtas (ver `mesclar` em campo.mjs do jogo): `s` slot, `c`/`r`
  // posição, `x` morto. Boneco de XP Share, pet em treino, NPCs e treinadores não são selvagens.
  const naoSelvagem = (m) => m.bn || m.ti !== undefined || m.cura || m.tm || m.depot || m.tr;

  /** A distribuição das distâncias (todas as ondas cheias medidas). Quantos spawns, vem do jogo. */
  function distsDe(h) {
    const todas = (h?.amostras ?? []).flat();
    return todas.length ? todas.sort((a, b) => a - b) : null;
  }

  // ---- sessão atual -----------------------------------------------------------------------
  // { slug, pkId, inicio, abates, slots: Map(slot → vivo?), heroi: {c, r}, onda: { dists, timer } }
  let sessao = null;

  function fecharSessao() {
    if (!sessao) return;
    clearTimeout(sessao.onda?.timer);
    const seg = (Date.now() - sessao.inicio) / 1000;
    if (seg >= 60 && sessao.abates > 0) {
      const h = (banco.hunts[sessao.slug] ??= {});
      const r = ((h.ritmo ??= {})[sessao.pkId ?? '?'] ??= { abates: 0, seg: 0 });
      r.abates += sessao.abates;
      r.seg += seg;
      r.xp = (r.xp ?? 0) + sessao.xp; // XP que o pokémon ganhou nesta hunt
      r.xpSeg = (r.xpSeg ?? 0) + seg; // tempo com XP contado (o registro antigo não tem XP)
      gravar();
    }
    sessao = null;
  }

  function fecharOnda(s) {
    const onda = s.onda;
    s.onda = null;
    if (!onda || onda.dists.length < ondaCheia(s.slug)) return; // onda parcial: não conta
    const h = (banco.hunts[s.slug] ??= {});
    h.amostras = [...(h.amostras ?? []), onda.dists.sort((a, b) => a - b)].slice(-MAX_AMOSTRAS);
    h.medidoEm = Date.now();
    gravar();
  }

  /** Um selvagem nasceu: entra na onda que está nascendo (ou começa uma). */
  function nasceu(s, x) {
    if (!s.heroi || x.c == null || x.r == null) return;
    if (!s.onda) {
      const onda = { dists: [] };
      onda.timer = setTimeout(() => { if (s.onda === onda) fecharOnda(s); }, JANELA_ONDA_MS);
      s.onda = onda;
    }
    s.onda.dists.push(Math.round(Math.hypot(x.c - s.heroi.c, x.r - s.heroi.r) * 10) / 10);
  }

  // O ritmo é guardado por pokémon e por "com/sem disco AoE": aplicar o disco muda o ritmo, e
  // a medição de antes não pode contaminar a de depois.
  const chaveDoPokemon = (pk) => {
    if (!pk?.id) return null;
    const aoe = pk.tmAoe ?? pk.tm_aoe;
    return `${pk.id}${aoe === true || aoe === 'true' || aoe === 1 ? ':aoe' : ''}`;
  };
  let pkAtivoId = null;
  let pkPx = null; // XP total do pokémon ativo na última leitura (ele só sobe; a diferença é o ganho)
  PIH.on?.('estado', (eu) => {
    const pk = eu?.pokemons?.find((p) => p.id === eu.activeId);
    const chave = chaveDoPokemon(pk);
    if (chave !== pkAtivoId) {
      fecharSessao();
      pkAtivoId = chave;
      pkPx = null;
    }
    if (pk?.xp == null) return;
    if (sessao && pkPx != null && pk.xp > pkPx) sessao.xp += pk.xp - pkPx;
    pkPx = pk.xp;
  });

  PIH.on?.('campo.init', (m) => {
    fecharSessao();
    if (!m?.slug || m.centro || m.pvp || m.casa != null) return;
    // A entrada NÃO é medida: o herói está na porta do mapa e a onda pode estar pela metade.
    sessao = { slug: m.slug, pkId: pkAtivoId, inicio: Date.now(), abates: 0, xp: 0, slots: new Map(), heroi: null, onda: null };
    if (m.heroi?.c != null) sessao.heroi = { c: m.heroi.c, r: m.heroi.r };
    for (const x of m.mobs ?? []) if (!naoSelvagem(x)) sessao.slots.set(x.s, !x.x);
  });

  PIH.on?.('campo', (m) => {
    const s = sessao;
    if (!s) return;
    if (m.heroi?.c != null) s.heroi = { c: m.heroi.c, r: m.heroi.r };
    for (const x of m.mobs ?? []) {
      if (naoSelvagem(x)) continue;
      const conhecido = s.slots.has(x.s);
      const vivoAntes = s.slots.get(x.s);
      if (x.x) {
        if (vivoAntes) s.abates++;
        s.slots.set(x.s, false);
      } else if (!conhecido || (vivoAntes === false && x.x === false)) {
        // slot novo, ou um corpo que voltou à vida: é um selvagem nascendo
        s.slots.set(x.s, true);
        nasceu(s, x);
      }
    }
    for (const slot of m.fora ?? []) s.slots.delete(slot);
  });

  addEventListener('pagehide', fecharSessao);

  PIH.geo = {
    /** `{ dists }` da hunt (ondas cheias medidas), ou null. */
    daHunt(slug) {
      const dists = distsDe(banco.hunts[slug]);
      return dists ? { dists } : null;
    },
    chaveDoPokemon,
    /** Abates/h medidos com este pokémon nesta hunt (só com 10+ min acumulados). Só referência. */
    ritmoMedido(slug, chave) {
      const r = banco.hunts[slug]?.ritmo?.[chave];
      return r && r.seg >= 600 ? r.abates * 3600 / r.seg : null;
    },
    /**
     * XP/h e abates/h com este pokémon nesta hunt, AO VIVO: o gravado + a sessão em curso. `ao_vivo`
     * é true quando você está caçando isso agora. Cada valor só aparece com 10+ min contados.
     */
    ritmoVivo(slug, chave) {
      if (!chave) return null;
      const r = banco.hunts[slug]?.ritmo?.[chave];
      const s = sessao && sessao.slug === slug && sessao.pkId === chave ? sessao : null;
      const agora = Date.now();
      const seg = (r?.seg ?? 0) + (s ? (agora - s.inicio) / 1000 : 0);
      const xpSeg = (r?.xpSeg ?? 0) + (s ? (agora - s.inicio) / 1000 : 0);
      return {
        kph: seg >= 600 ? ((r?.abates ?? 0) + (s?.abates ?? 0)) * 3600 / seg : null,
        xpH: xpSeg >= 600 ? ((r?.xp ?? 0) + (s?.xp ?? 0)) * 3600 / xpSeg : null,
        ao_vivo: !!s,
        // só a sessão em curso (condições de agora: bônus, poções), com 10+ min
        sessaoXpH: s && agora - s.inicio >= 600_000 ? (s.xp * 3_600_000) / (agora - s.inicio) : null,
      };
    },
    /** Há uma caçada medindo agora (a aba Caçar repinta a cada poucos segundos só nesse caso). */
    aoVivo: () => !!sessao,
    huntsMedidas: () => Object.values(banco.hunts).filter((h) => h.amostras?.length).length,
  };
})(globalThis);
