import { jsx as e, jsxs as c, Fragment as Ne } from "react/jsx-runtime";
import { useState as oe, useMemo as _e, useEffect as Xe, useRef as Vt, useCallback as he, memo as Ut } from "react";
import { createPortal as Gt } from "react-dom";
import { ChevronUp as Ht, ChevronDown as Xt, X as Yt } from "lucide-react";
import { ResponsiveContainer as Zt, AreaChart as Jt, CartesianGrid as Qt, XAxis as en, YAxis as tn, Tooltip as nn, Area as on, ReferenceDot as sn } from "recharts";
function ut(n, s) {
  if (!s) return n;
  const l = n.toLowerCase().indexOf(s.toLowerCase());
  return l === -1 ? n : /* @__PURE__ */ c(Ne, { children: [
    n.slice(0, l),
    /* @__PURE__ */ e("mark", { style: { backgroundColor: "var(--pastelo-pv-hl)", color: "inherit" }, children: n.slice(l, l + s.length) }),
    n.slice(l + s.length)
  ] });
}
function rn(n) {
  return Array.isArray(n) ? n.length : typeof n == "object" && n !== null ? Object.keys(n).length : 0;
}
function At({ name: n, value: s, depth: l, collapsedDepth: m, search: f }) {
  const [N, w] = oe(l < m), h = typeof s == "object" && s !== null, g = Array.isArray(s), y = n !== void 0 && /* @__PURE__ */ e("span", { style: { color: "var(--pastelo-pv-key)" }, children: ut(JSON.stringify(n), f) });
  if (!h) {
    let M, j = "var(--pastelo-pv-punct)";
    return typeof s == "string" ? (j = "var(--pastelo-pv-string)", M = ut(JSON.stringify(s), f)) : typeof s == "number" ? (j = "var(--pastelo-pv-number)", M = String(s)) : (j = "var(--pastelo-pv-literal)", M = String(s)), /* @__PURE__ */ c("div", { style: { paddingLeft: 16 }, children: [
      y,
      n !== void 0 && /* @__PURE__ */ e("span", { style: { color: "var(--pastelo-pv-punct)" }, children: ": " }),
      /* @__PURE__ */ e("span", { style: { color: j }, children: M })
    ] });
  }
  const D = g ? s.map((M, j) => [String(j), M]) : Object.entries(s), B = rn(s);
  return /* @__PURE__ */ c("div", { style: { paddingLeft: l === 0 ? 0 : 16 }, children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: () => w(!N),
        "aria-expanded": N,
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          font: "inherit",
          color: "var(--pastelo-pv-punct)"
        },
        children: [
          /* @__PURE__ */ e("span", { style: { display: "inline-block", width: 14 }, children: N ? "▾" : "▸" }),
          y,
          n !== void 0 && /* @__PURE__ */ e("span", { children: ": " }),
          /* @__PURE__ */ e("span", { children: g ? "[" : "{" }),
          !N && /* @__PURE__ */ c("span", { style: { color: "var(--pastelo-text-light)" }, children: [
            " ",
            B,
            " ",
            g ? "éléments" : "clés",
            " ",
            g ? "]" : "}"
          ] })
        ]
      }
    ),
    N && /* @__PURE__ */ c("div", { children: [
      D.map(([M, j]) => /* @__PURE__ */ e(
        At,
        {
          name: g ? void 0 : M,
          value: j,
          depth: l + 1,
          collapsedDepth: m,
          search: f
        },
        M
      )),
      /* @__PURE__ */ e("div", { style: { paddingLeft: 16, color: "var(--pastelo-pv-punct)" }, children: g ? "]" : "}" })
    ] })
  ] });
}
const ln = {
  fr: {
    visual: "Visuel",
    json: "JSON",
    search: "Rechercher…",
    copy: "Copier",
    copied: "Copié !",
    summary: "Résumé automatique",
    rootType: "Type racine",
    depth: "Profondeur",
    keys: "Clés totales",
    renderer: "Rendu détecté",
    metaEngine: "Moteur",
    metaTime: "Temps de calcul",
    metaSource: "Source",
    metaCached: "Cache"
  },
  en: {
    visual: "Visual",
    json: "JSON",
    search: "Search…",
    copy: "Copy",
    copied: "Copied!",
    summary: "Automatic summary",
    rootType: "Root type",
    depth: "Depth",
    keys: "Total keys",
    renderer: "Detected renderer",
    metaEngine: "Engine",
    metaTime: "Compute time",
    metaSource: "Source",
    metaCached: "Cache"
  }
};
function an(n) {
  if (typeof n != "object" || n === null) return "generic";
  const s = n;
  return s.codex !== void 0 && s.context !== void 0 ? "codex" : s.matrix !== void 0 && typeof s.matrix == "object" && s.matrix !== null && "positions" in s.matrix ? "matrix" : s.planets !== void 0 && s.aspects !== void 0 ? "natal" : "generic";
}
function cn(n) {
  let s = 0, l = 0;
  const m = (N, w) => {
    if (w > l && (l = w), typeof N != "object" || N === null) return;
    const h = Array.isArray(N) ? N : Object.values(N);
    s += Array.isArray(N) ? 0 : Object.keys(N).length;
    for (const g of h) m(g, w + 1);
  };
  return m(n, 1), { rootType: Array.isArray(n) ? `Array[${n.length}]` : n === null ? "null" : typeof n, depth: l, keys: s };
}
function dn(n) {
  const s = {};
  if (typeof n != "object" || n === null) return s;
  const l = n, m = l.metadata?.engine ?? l.engine;
  m && (s.engine = String(m));
  const f = l.metadata?.calculationTime ?? l.calculationTime;
  return f !== void 0 && (s.calculationTime = `${f} ms`), l.source && (s.source = String(l.source)), l.cached !== void 0 && (s.cached = l.cached ? "hit" : "miss"), s;
}
function Un({
  payload: n,
  view: s = "visual",
  visualRenderer: l = "auto",
  onViewChange: m,
  jsonOptions: f = {},
  showMeta: N = !0,
  theme: w = "auto",
  lang: h = "fr",
  className: g = ""
}) {
  const y = ln[h], [D, B] = oe(s), [M, j] = oe(""), [W, G] = oe(!1), { collapsedDepth: z = 2, searchable: J = !0, copyButton: H = !0 } = f, Q = l === "auto" ? an(n) : l, Y = _e(() => cn(n), [n]), $ = _e(() => dn(n), [n]), d = (K) => {
    B(K), m?.(K);
  }, q = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(n, null, 2)), G(!0), setTimeout(() => G(!1), 2e3);
    } catch {
    }
  }, ge = w === "auto" ? void 0 : w;
  return /* @__PURE__ */ c(
    "div",
    {
      className: `pm-widget pm-payload-viewer ${g}`,
      "data-theme": ge,
      style: {
        border: "1px solid var(--pastelo-med-violet)",
        borderRadius: "var(--pastelo-radius-panel)",
        backgroundColor: "var(--pastelo-page-bg)",
        boxShadow: "var(--pastelo-shadow-panel)",
        overflow: "hidden",
        fontSize: 14
      },
      children: [
        /* @__PURE__ */ c(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderBottom: "1px solid var(--pastelo-med-violet)",
              backgroundColor: "var(--pastelo-bg-violet)"
            },
            children: [
              N && Object.keys($).length > 0 && /* @__PURE__ */ e("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginRight: "auto" }, children: Object.entries($).map(([K, ee]) => /* @__PURE__ */ c(
                "span",
                {
                  style: {
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: "var(--pastelo-radius)",
                    backgroundColor: "var(--pastelo-med-violet)",
                    color: "var(--pastelo-text-main)"
                  },
                  children: [
                    K,
                    ": ",
                    ee
                  ]
                },
                K
              )) }),
              /* @__PURE__ */ e("nav", { role: "tablist", style: { display: "flex", gap: 4, marginLeft: "auto" }, children: ["visual", "json"].map((K) => /* @__PURE__ */ e(
                "button",
                {
                  role: "tab",
                  "aria-selected": D === K,
                  onClick: () => d(K),
                  style: {
                    padding: "5px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    border: "1px solid var(--pastelo-med-violet)",
                    borderRadius: "var(--pastelo-radius)",
                    cursor: "pointer",
                    backgroundColor: D === K ? "var(--pastelo-acc-violet)" : "transparent",
                    color: D === K ? "#1A052D" : "var(--pastelo-text-main)"
                  },
                  children: K === "visual" ? y.visual : y.json
                },
                K
              )) })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { style: { padding: 14 }, children: D === "json" ? /* @__PURE__ */ c("section", { className: "pm-payload-json", children: [
          (J || H) && /* @__PURE__ */ c("div", { style: { display: "flex", gap: 8, marginBottom: 10 }, children: [
            J && /* @__PURE__ */ e(
              "input",
              {
                type: "search",
                value: M,
                onChange: (K) => j(K.target.value),
                placeholder: y.search,
                "aria-label": y.search,
                style: {
                  flex: 1,
                  padding: "6px 10px",
                  fontSize: 12,
                  border: "1px solid var(--pastelo-med-violet)",
                  borderRadius: "var(--pastelo-radius)",
                  backgroundColor: "var(--pastelo-page-bg)",
                  color: "var(--pastelo-text-main)"
                }
              }
            ),
            H && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: q,
                style: {
                  padding: "6px 12px",
                  fontSize: 12,
                  border: "1px solid var(--pastelo-med-violet)",
                  borderRadius: "var(--pastelo-radius)",
                  backgroundColor: "transparent",
                  color: "var(--pastelo-text-main)",
                  cursor: "pointer"
                },
                children: W ? y.copied : y.copy
              }
            )
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              style: {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12.5,
                lineHeight: 1.6,
                maxHeight: "70vh",
                overflow: "auto"
              },
              children: /* @__PURE__ */ e(At, { value: n, depth: 0, collapsedDepth: z, search: M || void 0 })
            }
          )
        ] }) : /* @__PURE__ */ c("section", { className: "pm-payload-visual", children: [
          Q !== "generic" && /* @__PURE__ */ c("p", { style: { fontSize: 12, color: "var(--pastelo-text-muted)", marginTop: 0 }, children: [
            y.renderer,
            " : ",
            /* @__PURE__ */ e("strong", { children: Q })
          ] }),
          /* @__PURE__ */ e("h3", { style: { fontSize: 15, fontWeight: 700, margin: "4px 0 10px", color: "var(--pastelo-accent-violet-text)" }, children: y.summary }),
          /* @__PURE__ */ c("dl", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 16px", margin: 0 }, children: [
            /* @__PURE__ */ e("dt", { style: { color: "var(--pastelo-text-muted)" }, children: y.rootType }),
            /* @__PURE__ */ e("dd", { style: { margin: 0, fontWeight: 600 }, children: Y.rootType }),
            /* @__PURE__ */ e("dt", { style: { color: "var(--pastelo-text-muted)" }, children: y.depth }),
            /* @__PURE__ */ e("dd", { style: { margin: 0, fontWeight: 600 }, children: Y.depth }),
            /* @__PURE__ */ e("dt", { style: { color: "var(--pastelo-text-muted)" }, children: y.keys }),
            /* @__PURE__ */ e("dd", { style: { margin: 0, fontWeight: 600 }, children: Y.keys })
          ] })
        ] }) })
      ]
    }
  );
}
function un({ children: n }) {
  const [s, l] = oe(!1);
  return Xe(() => (l(!0), () => l(!1)), []), s ? Gt(n, document.body) : null;
}
const le = {
  rose: { bg: "#fce7f3", border: "#fda4af", text: "#fb7185", hover: "#fda4af" },
  violet: { bg: "#f3e8ff", border: "#c4b5fd", text: "#a78bfa", hover: "#c4b5fd" },
  blue: { bg: "#e0f2fe", border: "#7dd3fc", text: "#38bdf8", hover: "#7dd3fc" },
  green: { bg: "#dcfce7", border: "#86efac", text: "#4ade80", hover: "#86efac" },
  orange: { bg: "#ffedd5", border: "#fdba74", text: "#fb923c", hover: "#fdba74" },
  yellow: { bg: "#fef9c3", border: "#fde047", text: "#facc15", hover: "#fde047" }
}, mn = [
  le.rose,
  // House 1
  le.violet,
  // House 2
  le.blue,
  // House 3
  le.green,
  // House 4
  le.orange,
  // House 5
  le.yellow,
  // House 6
  le.rose,
  // House 7
  le.violet,
  // House 8
  le.blue,
  // House 9
  le.green,
  // House 10
  le.orange,
  // House 11
  le.yellow
  // House 12
];
function fn(n) {
  return mn[(n - 1) % 12];
}
const pn = {
  Fire: "#ef4444",
  Earth: "#d97706",
  Air: "#22c55e",
  Water: "#3b82f6"
}, U = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768), C = U ? 1.5 : 1;
function mt(n) {
  return n < 480 ? 900 : n < 640 ? 1050 : n < 1024 ? 1350 : 1550;
}
function yn() {
  const [n, s] = oe(() => typeof window > "u" ? 1400 : mt(window.innerWidth));
  return Xe(() => {
    let l;
    function m() {
      cancelAnimationFrame(l), l = requestAnimationFrame(() => {
        s(mt(window.innerWidth));
      });
    }
    return window.addEventListener("resize", m, { passive: !0 }), () => {
      window.removeEventListener("resize", m), cancelAnimationFrame(l);
    };
  }, []), n;
}
const hn = 1200, gn = 560, xn = pn, ae = "︎", Me = [
  { name: "Aries", symbol: `♈${ae}`, angle: 0, element: "Fire", modality: "Cardinal", ruler: "Mars" },
  { name: "Taurus", symbol: `♉${ae}`, angle: 30, element: "Earth", modality: "Fixed", ruler: "Venus" },
  { name: "Gemini", symbol: `♊${ae}`, angle: 60, element: "Air", modality: "Mutable", ruler: "Mercury" },
  { name: "Cancer", symbol: `♋${ae}`, angle: 90, element: "Water", modality: "Cardinal", ruler: "Moon" },
  { name: "Leo", symbol: `♌${ae}`, angle: 120, element: "Fire", modality: "Fixed", ruler: "Sun" },
  { name: "Virgo", symbol: `♍${ae}`, angle: 150, element: "Earth", modality: "Mutable", ruler: "Mercury" },
  { name: "Libra", symbol: `♎${ae}`, angle: 180, element: "Air", modality: "Cardinal", ruler: "Venus" },
  { name: "Scorpio", symbol: `♏${ae}`, angle: 210, element: "Water", modality: "Fixed", ruler: "Pluto" },
  { name: "Sagittarius", symbol: `♐${ae}`, angle: 240, element: "Fire", modality: "Mutable", ruler: "Jupiter" },
  { name: "Capricorn", symbol: `♑${ae}`, angle: 270, element: "Earth", modality: "Cardinal", ruler: "Saturn" },
  { name: "Aquarius", symbol: `♒${ae}`, angle: 300, element: "Air", modality: "Fixed", ruler: "Uranus" },
  { name: "Pisces", symbol: `♓${ae}`, angle: 330, element: "Water", modality: "Mutable", ruler: "Neptune" }
].map((n) => ({ ...n, color: xn[n.element] })), ce = {
  sun: { symbol: "☉", color: "#f59e0b", type: "planet" },
  moon: { symbol: "☽", color: "#FDE047", type: "planet" },
  // Jaune clair pour la Lune
  mercury: { symbol: "☿", color: "#4169E1", type: "planet" },
  // Bleu roi pour Mercure
  venus: { symbol: "♀", color: "#ec4899", type: "planet" },
  mars: { symbol: "♂", color: "#ef4444", type: "planet" },
  jupiter: { symbol: "♃", color: "#f97316", type: "planet" },
  saturn: { symbol: "♄", color: "#a16207", type: "planet" },
  uranus: { symbol: "♅", color: "#06b6d4", type: "planet" },
  neptune: { symbol: "♆", color: "#6366f1", type: "planet" },
  pluto: { symbol: "♇", color: "#7c3aed", type: "planet" },
  // Symbole astrologique standard
  northNode: { symbol: "☊", color: "#a855f7", type: "point" },
  southNode: { symbol: "☋", color: "#7c3aed", type: "point" },
  // lilith: { symbol: '⚸', color: '#e11d48', type: 'point' }, // HIDDEN: True Lilith disabled
  lilithMean: { symbol: "⚸", color: "#f43f5e", type: "point" },
  partOfFortune: { symbol: "⊗", color: "#10b981", type: "point" },
  vertex: { symbol: "Vx", color: "#0891b2", type: "point" },
  antiVertex: { symbol: "Av", color: "#0e7490", type: "point" },
  chiron: { symbol: "⚷", color: "#ea580c", type: "asteroid" },
  ceres: { symbol: "⚳", color: "#d97706", type: "asteroid" },
  pallas: { symbol: "⚴", color: "#65a30d", type: "asteroid" },
  juno: { symbol: "⚵", color: "#dc2626", type: "asteroid" },
  vesta: { symbol: "⚶", color: "#ea580c", type: "asteroid" }
};
function bn({ size: n, color: s }) {
  return /* @__PURE__ */ c("svg", { width: n, height: n, viewBox: "0 0 100 100", style: { overflow: "visible" }, children: [
    /* @__PURE__ */ e("circle", { cx: "50", cy: "28", r: "16", fill: "none", stroke: s, strokeWidth: "10" }),
    /* @__PURE__ */ e("path", { d: "M 18 32 A 32 32 0 0 0 82 32", fill: "none", stroke: s, strokeWidth: "10", strokeLinecap: "butt" }),
    /* @__PURE__ */ e("line", { x1: "50", y1: "64", x2: "50", y2: "95", stroke: s, strokeWidth: "10", strokeLinecap: "butt" }),
    /* @__PURE__ */ e("line", { x1: "30", y1: "78", x2: "70", y2: "78", stroke: s, strokeWidth: "10", strokeLinecap: "butt" })
  ] });
}
function pe({
  planetKey: n,
  symbol: s,
  color: l,
  size: m,
  x: f,
  y: N,
  hasStroke: w = !1,
  strokeWidth: h = 0,
  filter: g
}) {
  if (n === "pluto") {
    const y = m * 0.8, D = f - y / 2, B = N - y / 2;
    return /* @__PURE__ */ e("foreignObject", { x: D, y: B, width: y, height: y, children: /* @__PURE__ */ e(bn, { size: y, color: l }) });
  }
  return /* @__PURE__ */ e(
    "text",
    {
      x: f,
      y: N,
      textAnchor: "middle",
      dominantBaseline: "middle",
      fontSize: m,
      fill: l,
      stroke: w ? l : void 0,
      strokeWidth: w ? h : void 0,
      style: { fontWeight: 900, filter: g },
      children: s
    }
  );
}
const ft = {
  trueNode: "North Node (true)",
  meanNode: "North Node (mean)",
  northNode: "North Node (true)",
  southNode: "South Node"
};
function Fe(n, s) {
  return ft[n] ? ft[n] : s ? s.charAt(0).toUpperCase() + s.slice(1) : n.charAt(0).toUpperCase() + n.slice(1);
}
const kn = {
  conjunction: {
    symbol: "☌",
    angle: 0,
    color: "#8b5cf6",
    nature: "Fusion",
    description: "Les deux planètes fusionnent leurs énergies. Intensification mutuelle pouvant être constructive ou excessive selon les planètes impliquées."
  },
  sextile: {
    symbol: "⚹",
    angle: 60,
    color: "#06b6d4",
    nature: "Harmonique",
    description: "Aspect d'opportunité et de talent naturel. Les planètes coopèrent facilement, offrant des capacités latentes à exploiter."
  },
  square: {
    symbol: "□",
    angle: 90,
    color: "#ef4444",
    nature: "Tension",
    description: "Friction et tension dynamique entre les planètes. Source de défis mais aussi de motivation et de croissance personnelle."
  },
  trine: {
    symbol: "△",
    angle: 120,
    color: "#10b981",
    nature: "Harmonique",
    description: "Flux naturel et harmonieux entre les planètes. Talents innés, facilité et grâce dans les domaines concernés."
  },
  opposition: {
    symbol: "☍",
    angle: 180,
    color: "#f43f5e",
    nature: "Tension",
    description: "Polarité et confrontation entre deux forces opposées. Appelle à l'intégration et à l'équilibre conscient."
  },
  quincunx: {
    symbol: "⚻",
    angle: 150,
    color: "#f59e0b",
    nature: "Ajustement",
    description: "Aspect d'inconfort nécessitant des ajustements constants. Les planètes ne se comprennent pas intuitivement."
  },
  semisextile: {
    symbol: "⚺",
    angle: 30,
    color: "#a78bfa",
    nature: "Mineur harmonique",
    description: "Lien subtil entre signes voisins. Influence discrète mais persistante, comme un murmure d'arrière-plan."
  },
  semisquare: {
    symbol: "∠",
    angle: 45,
    color: "#fb923c",
    nature: "Mineur tendu",
    description: "Irritation mineure et agitation intérieure. Crée une friction subtile qui pousse à l'action."
  },
  sesquiquadrate: {
    symbol: "⚼",
    angle: 135,
    color: "#e11d48",
    nature: "Mineur tendu",
    description: "Tension latente qui se manifeste de façon inattendue. Frustration accumulée nécessitant une résolution."
  },
  quintile: {
    symbol: "Q",
    angle: 72,
    color: "#14b8a6",
    nature: "Créatif",
    description: "Aspect de talent créatif et de don unique. Révèle une capacité spéciale et originale."
  },
  biquintile: {
    symbol: "bQ",
    angle: 144,
    color: "#0d9488",
    nature: "Créatif",
    description: "Renforcement du potentiel créatif. Talent artistique ou intellectuel qui demande à être exprimé."
  }
};
function Ie(n) {
  const s = n.toLowerCase().replace(/[\s-]/g, "");
  return kn[s] || null;
}
function ne(n) {
  if (!n || typeof n != "string") return "unknown";
  const s = n.toLowerCase();
  return s.includes("true node") || s.includes("mean node") ? "northNode" : s.includes("south node") ? "southNode" : s.includes("lilith") && s.includes("mean") ? "lilithMean" : s.includes("lilith") ? "lilith" : s.includes("part of fortune") ? "partOfFortune" : s.includes("anti-vertex") ? "antiVertex" : s.includes("vertex") ? "vertex" : s === "chiron" ? "chiron" : s === "ceres" ? "ceres" : s === "pallas" ? "pallas" : s === "juno" ? "juno" : s === "vesta" ? "vesta" : s === "sun" ? "sun" : s === "moon" ? "moon" : s === "mercury" ? "mercury" : s === "venus" ? "venus" : s === "mars" ? "mars" : s === "jupiter" ? "jupiter" : s === "saturn" ? "saturn" : s === "uranus" ? "uranus" : s === "neptune" ? "neptune" : s === "pluto" ? "pluto" : s.replace(/\s+/g, "").replace(/[()]/g, "");
}
const vn = [
  { type: "Conjunction", angle: 0, orb: 2 },
  { type: "Opposition", angle: 180, orb: 2 },
  { type: "Trine", angle: 120, orb: 2 },
  { type: "Square", angle: 90, orb: 2 },
  { type: "Sextile", angle: 60, orb: 2 }
];
function An(n, s, l) {
  const m = [], f = (N, w, h, g, y, D) => {
    const B = Math.abs(h - D), M = Math.min(B, 360 - B);
    for (const j of vn) {
      const W = Math.abs(M - j.angle);
      if (W <= j.orb)
        return m.push({
          planet1: N,
          planet2: g,
          type: j.type,
          angle: j.angle,
          orb: W,
          longitude1: h,
          longitude2: D
        }), !0;
    }
    return !1;
  };
  for (const [N, w] of Object.entries(n))
    for (const [h, g] of Object.entries(s))
      f(
        N,
        w.name || N,
        w.longitude,
        h,
        g.name || h,
        g.longitude
      );
  if (l) {
    const N = {
      ascendant: { lon: l.ascendant, name: "AS (Ascendant)" },
      midheaven: { lon: l.midheaven, name: "MC (Milieu du Ciel)" },
      descendant: { lon: l.descendant, name: "DC (Descendant)" },
      imumCoeli: { lon: l.imumCoeli, name: "IC (Fond du Ciel)" }
    };
    for (const [w, h] of Object.entries(n))
      for (const [g, y] of Object.entries(N))
        if (y.lon !== void 0 && f(
          w,
          "",
          h.longitude,
          g,
          "",
          y.lon
        ))
          break;
  }
  return m.sort((N, w) => N.orb - w.orb);
}
const Cn = {
  sun: ["Leo"],
  moon: ["Cancer"],
  mercury: ["Gemini", "Virgo"],
  venus: ["Taurus", "Libra"],
  mars: ["Aries", "Scorpio"],
  jupiter: ["Sagittarius", "Pisces"],
  saturn: ["Capricorn", "Aquarius"],
  uranus: ["Aquarius"],
  neptune: ["Pisces"],
  pluto: ["Scorpio"]
}, Nn = {
  sun: "Aries",
  moon: "Taurus",
  mercury: "Virgo",
  venus: "Pisces",
  mars: "Capricorn",
  jupiter: "Cancer",
  saturn: "Libra",
  uranus: "Scorpio",
  neptune: "Cancer",
  pluto: "Leo"
}, $n = {
  sun: "Libra",
  moon: "Scorpio",
  mercury: "Pisces",
  venus: "Virgo",
  mars: "Cancer",
  jupiter: "Capricorn",
  saturn: "Aries",
  uranus: "Taurus",
  neptune: "Capricorn",
  pluto: "Aquarius"
}, wn = {
  sun: ["Aquarius"],
  moon: ["Capricorn"],
  mercury: ["Sagittarius", "Pisces"],
  venus: ["Aries", "Scorpio"],
  mars: ["Taurus", "Libra"],
  jupiter: ["Gemini", "Virgo"],
  saturn: ["Cancer", "Leo"],
  uranus: ["Leo"],
  neptune: ["Virgo"],
  pluto: ["Taurus"]
};
function pt(n, s) {
  const l = n.toLowerCase();
  return Cn[l]?.includes(s) ? { label: "Domicile", emoji: "🏠", color: "#10b981", description: "En Domicile : Force maximale, la planète est chez elle." } : Nn[l] === s ? { label: "Exaltation", emoji: "⭐", color: "#f59e0b", description: "En Exaltation : Puissance élevée, expression magnifiée." } : $n[l] === s ? { label: "Chute", emoji: "⬇", color: "#ef4444", description: "En Chute : Affaiblissement, expression difficile." } : wn[l]?.includes(s) ? { label: "Exil", emoji: "🚫", color: "#e11d48", description: "En Exil : Très inconfortable, énergie contrariée." } : { label: "Pérégrine", emoji: "🌐", color: "#64748b", description: "Pérégrine : Sans dignité essentielle, neutre." };
}
const yt = {
  1: "Identité, apparence",
  2: "Finances, valeurs",
  3: "Communication, fratrie",
  4: "Foyer, racines",
  5: "Créativité, romance",
  6: "Santé, routine",
  7: "Partenariat, mariage",
  8: "Transformation, héritage",
  9: "Voyages, philosophie",
  10: "Carrière, réputation",
  11: "Amis, projets",
  12: "Inconscient, spiritualité"
};
function Sn(n) {
  return n * Math.PI / 180;
}
function Ee(n) {
  return Me[Math.floor(n / 30) % 12].name;
}
function Ae(n) {
  const s = n % 30;
  return `${Math.floor(s)}°`;
}
function Ce(n) {
  const s = n % 30, l = Math.floor(s), m = Math.floor((s - l) * 60);
  return `${l}°${m.toString().padStart(2, "0")}'`;
}
const Ln = 1.12, ht = 5;
function In(n, s) {
  const l = Math.abs(n - s);
  return Math.min(l, 360 - l);
}
function En(n, s) {
  const l = Math.floor(n / 30) * 30, f = l + 30 - n - 1e-3, N = l - n + 1e-3;
  return Math.max(N, Math.min(f, s));
}
function Ct(n, s, l = 350) {
  if (!n.length) return [];
  const m = [...n].sort((h, g) => h.longitude - g.longitude), f = [];
  let N = 0;
  for (let h = 1; h <= m.length; h++)
    (h === m.length || In(m[h].longitude, m[h - 1].longitude) >= ht) && (h - N >= 2 && f.push({ start: N, end: h - 1 }), N = h);
  const w = /* @__PURE__ */ new Map();
  for (const h of f) {
    const g = h.end - h.start + 1, y = ht / (g - 1);
    for (let D = 0; D < g; D++) {
      const B = m[h.start + D], M = (D - (g - 1) / 2) * y, j = En(B.longitude, M);
      w.set(B.key, j);
    }
  }
  return m.map((h) => {
    const g = w.get(h.key) || 0;
    return {
      key: h.key,
      longitude: h.longitude,
      svgAngle: 180 - (h.longitude + g) + s,
      radialOffset: 0,
      lateralOffset: g,
      stackIndex: 0,
      isInStack: g !== 0
    };
  });
}
function gt(n, s, l, m, f, N) {
  if (!n.length) return [];
  const w = Ct(n, m, l), h = l * Ln;
  return w.map((g) => {
    const y = g.svgAngle * Math.PI / 180, D = (180 - g.longitude + m) * Math.PI / 180, B = f + h * Math.cos(y), M = N + h * Math.sin(y);
    return {
      key: g.key,
      longitude: g.longitude,
      svgAngle: g.svgAngle,
      radialOffset: g.radialOffset,
      lateralOffset: g.lateralOffset,
      stackIndex: g.stackIndex,
      isStacked: g.isInStack,
      isInStack: g.isInStack,
      x: B,
      y: M,
      tickStartX: f + l * Math.cos(D),
      tickStartY: N + l * Math.sin(D)
    };
  });
}
function Ve(n, s, l, m, f, N) {
  return n.length ? Ct(n, m, l).map((h) => {
    const g = h.svgAngle * Math.PI / 180, y = (180 - h.longitude + m) * Math.PI / 180, D = f + s * Math.cos(g), B = N + s * Math.sin(g);
    return {
      key: h.key,
      longitude: h.longitude,
      svgAngle: h.svgAngle,
      radialOffset: h.radialOffset,
      lateralOffset: h.lateralOffset,
      stackIndex: h.stackIndex,
      isStacked: h.isInStack,
      isInStack: h.isInStack,
      x: D,
      y: B,
      tickStartX: f + l * Math.cos(y),
      tickStartY: N + l * Math.sin(y)
    };
  }) : [];
}
const xt = {
  ascendant: { house: 1, label: "AS", color: "#ef4444", description: "Ascendant : Point de lever, personnalité visible" },
  imumcoeli: { house: 4, label: "IC", color: "#3b82f6", description: "Fond du Ciel : Racines, foyer, vie privée" },
  descendant: { house: 7, label: "DC", color: "#f97316", description: "Descendant : Relations, partenariats" },
  midheaven: { house: 10, label: "MC", color: "#10b981", description: "Milieu du Ciel : Carrière, vocation publique" }
};
function Mn({
  data: n,
  outerData: s,
  innerData: l,
  outerLabel: m = "Outer",
  innerLabel: f = "Inner",
  biWheelMode: N = "standard",
  showHouses: w = !0,
  showAspects: h = !0,
  visiblePlanets: g = Object.keys(ce),
  visibleAngles: y = ["ascendant", "midheaven", "descendant", "imumcoeli"],
  visibleAspectTypes: D,
  // 🆕 Filtrer les types d'aspects visibles
  hoveredPlanet: B,
  onPlanetHover: M,
  crossAspects: j
}) {
  const W = !!(s && l), G = W && N === "transit", z = W ? s : n, J = W ? l : null, H = W && l ? l : z, Q = (z.aspects || []).filter(
    (t) => t && typeof t.planet1 == "string" && typeof t.planet2 == "string" && typeof t.type == "string"
  ), Y = yn(), $ = Y / 2, d = Y / hn, q = gn * d, ge = q * 0.4, K = q * 0.4, ee = q * 0.75, Be = q * 0.65, $t = q * 1, Ye = q * 1.1, wt = q * 0.4, Ze = q * 1.15, St = q * 0.4, Lt = q * 0.75, It = q * 0.65, Je = q * 1, Et = q * 1.48, De = q * 1.35, we = G ? wt : ge, se = G ? St : K, ie = G ? Lt : ee, ye = G ? It : Be, de = G ? Je : $t, ue = q * 1, Mt = G ? Ze : Ye, ze = W ? 420 : 220, Qe = Y + ze * 2, [$e, je] = oe(null), [et, Ke] = oe(null), [Te, Rt] = oe(/* @__PURE__ */ new Set()), [Bt, qe] = oe(null), [Tt, tt] = oe(null), [Ft, nt] = oe(null), [ot, st] = oe(null), Ot = Vt(null), ke = G && J?.angles?.ascendant ? J.angles.ascendant : z.angles?.ascendant || z.ascendant?.longitude || 0, te = he((t) => 180 - t + ke, [ke]), T = he((t, i) => {
    const o = Sn(t);
    return { x: $ + i * Math.cos(o), y: $ + i * Math.sin(o) };
  }, [$]), it = he((t) => {
    if (!Q.length) return [];
    const i = t.replace(/^inner-/, ""), o = [];
    return Q.forEach((r) => {
      const a = ne(r.planet1), u = ne(r.planet2), v = (b) => b.includes("ascendant") ? "ascendant" : b.includes("midheaven") ? "midheaven" : b.includes("descendant") ? "descendant" : b.includes("imum") ? "imumcoeli" : b, p = v(a), x = v(u), A = v(i);
      if (p === A || x === A) {
        const b = p === A ? u : a, O = p === A ? r.planet2 : r.planet1, I = ce[b], _ = Ie(r.type)?.symbol || r.symbol || "";
        o.push(
          `${_} ${r.type} avec ${I?.symbol || ""} ${O} (orbe ${(r.orb ?? 0).toFixed(1)}°)`
        );
      }
    }), o;
  }, [Q]), rt = he(() => {
    je(null), st(null), M?.(null);
  }, [M]);
  Xe(() => {
    const t = () => je(null);
    return window.addEventListener("scroll", t, { passive: !0, capture: !0 }), () => window.removeEventListener("scroll", t, { capture: !0 });
  }, []);
  const xe = he((t, i, o, r, a) => {
    const u = U ? 300 : 280, v = Math.min(200 + o.length * 20, 400), p = window.innerHeight, x = i > p * 0.6, A = t > window.innerWidth * 0.6;
    let b;
    A ? b = t - u - 15 : b = t + 15;
    let O;
    x ? O = i - v - 15 : O = i + 15, b = Math.max(10, Math.min(b, window.innerWidth - u - 10)), O = Math.max(10, Math.min(O, window.innerHeight - v - 10)), je({
      x: b,
      y: O,
      lines: o,
      color: r
    }), a && st(a);
  }, []), lt = he((t, i, o) => {
    xe(t.clientX, t.clientY, i, o);
  }, [xe]), Se = he((t, i, o, r) => {
    const a = it(i), u = a.length > 0 ? [...o, "", "Aspects :", ...a] : o;
    xe(t.clientX, t.clientY, u, r, i);
  }, [it, xe]), at = Object.entries(z.planets || {}).filter(([t, i]) => g.includes(t) && i?.longitude !== void 0).map(([t, i]) => ({ key: t, longitude: i.longitude })), Wt = G ? W ? Ve(at, Et, De, ke, $, $) : Ve(at, Ye, ue, ke, $, $) : [], Pt = G && J ? Object.entries(J.planets || {}).filter(([t, i]) => g.includes(t) && i?.longitude !== void 0).map(([t, i]) => ({ key: t, longitude: i.longitude })) : [], _t = G ? Ve(Pt, Ze, Je, ke, $, $) : [], Dt = Object.entries(z?.planets || {}).filter(([t, i]) => g.includes(t) && i?.longitude !== void 0).map(([t, i]) => ({ key: t, longitude: i.longitude })), zt = G ? [] : gt(Dt, Mt, ue, ke, $, $), jt = W && !G && J ? Object.entries(J?.planets || {}).filter(([t, i]) => g.includes(t) && i?.longitude !== void 0).map(([t, i]) => ({ key: t, longitude: i.longitude })) : [], Kt = W && !G ? gt(jt, q * 0.68, ie * 0.95, ke, $, $) : [], ct = he((t) => {
    if (!H.houses || H.houses.length < 12) return null;
    const i = [...H.houses].sort((o, r) => o.house - r.house);
    for (let o = 0; o < 12; o++) {
      const r = i[o].cusp, a = i[(o + 1) % 12].cusp;
      if (a > r) {
        if (t >= r && t < a) return i[o].house;
      } else if (t >= r || t < a) return i[o].house;
    }
    return null;
  }, [H.houses]), qt = he((t, i) => {
    const o = Q[i];
    if (!o) return;
    const r = o.planet1, a = o.planet2, u = ce[r.toLowerCase()], v = ce[a.toLowerCase()], p = Ie(o.type), x = p?.symbol || o.symbol || "", A = p?.color || (o.harmonious ? "#14b8a6" : o.harmonious === !1 ? "#f43f5e" : "#a78bfa"), b = [
      `${x} ${o.type} : ${p?.nature || ""}`,
      `${u?.symbol || ""} ${r}  ${x}  ${v?.symbol || ""} ${a}`,
      `Orbe: ${(o.orb ?? 0).toFixed(2)}° · ${o.isApplying ? "Appliquant" : "Séparant"}`
    ];
    if (p?.description) {
      const I = p.description.split(" ");
      let P = "";
      for (const _ of I)
        (P + " " + _).length > 50 ? (b.push(P.trim()), P = _) : P += " " + _;
      P.trim() && b.push(P.trim());
    }
    Ke(i), Rt(/* @__PURE__ */ new Set([r.toLowerCase(), a.toLowerCase()])), lt(t, b, A);
  }, [Q, lt]), { relatedAspectIndices: dt, relatedPlanetKeys: re } = _e(() => {
    const t = ot || B;
    if (!t || !Q.length)
      return { relatedAspectIndices: /* @__PURE__ */ new Set(), relatedPlanetKeys: /* @__PURE__ */ new Set() };
    const i = t.replace(/^inner-/, ""), o = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
    return Q.forEach((a, u) => {
      const v = ne(a.planet1), p = ne(a.planet2), x = (I) => I.includes("ascendant") ? "ascendant" : I.includes("midheaven") ? "midheaven" : I.includes("descendant") ? "descendant" : I.includes("imum") ? "imumcoeli" : I, A = x(v), b = x(p), O = x(i);
      (A === O || b === O) && (o.add(u), A === O ? r.add(p) : r.add(v));
    }), { relatedAspectIndices: o, relatedPlanetKeys: r };
  }, [ot, B, Q]);
  return /* @__PURE__ */ c(
    "div",
    {
      className: "flex flex-col items-center justify-center px-0 pt-2 pb-0 overflow-visible",
      children: [
        /* @__PURE__ */ e("div", { ref: Ot, id: "skychart-export-target", className: "relative overflow-visible", children: /* @__PURE__ */ c(
          "svg",
          {
            id: "skychart-svg-root",
            viewBox: `${-ze} ${-ze} ${Qe} ${Qe}`,
            preserveAspectRatio: "xMidYMid meet",
            className: U ? "" : "drop-shadow-xl",
            style: {
              width: "100%",
              height: "auto",
              display: "block",
              maxWidth: "100%",
              touchAction: "manipulation",
              willChange: "auto",
              overflow: "visible"
            },
            onClick: rt,
            children: [
              /* @__PURE__ */ c("defs", { children: [
                !U && /* @__PURE__ */ e("style", { children: `
                @keyframes anemone-sway {
                  0%, 100% { transform: rotate(-2deg); }
                  50% { transform: rotate(2deg); }
                }
                .anemone-sway {
                  transform-origin: center;
                  animation: anemone-sway 3s ease-in-out infinite;
                  will-change: transform;
                }
              ` }),
                /* @__PURE__ */ c("radialGradient", { id: "sc-bg-outer", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#f0f0ff" }),
                  /* @__PURE__ */ e("stop", { offset: "60%", stopColor: "#e8e5f8" }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#ddd8f0" })
                ] }),
                /* @__PURE__ */ c("radialGradient", { id: "sc-bg-house", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#faf9ff" }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#f0edf8" })
                ] }),
                /* @__PURE__ */ c("radialGradient", { id: "sc-bg-center", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#ffffff" }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#f5f3ff" })
                ] }),
                /* @__PURE__ */ c("linearGradient", { id: "sc-ring-grad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
                  /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#818cf8" }),
                  /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#c084fc" })
                ] }),
                !U && /* @__PURE__ */ c(Ne, { children: [
                  /* @__PURE__ */ c("filter", { id: "glow-aspect", children: [
                    /* @__PURE__ */ e("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
                    /* @__PURE__ */ c("feMerge", { children: [
                      /* @__PURE__ */ e("feMergeNode", { in: "blur" }),
                      /* @__PURE__ */ e("feMergeNode", { in: "SourceGraphic" })
                    ] })
                  ] }),
                  /* @__PURE__ */ c("filter", { id: "glow-planet", children: [
                    /* @__PURE__ */ e("feGaussianBlur", { stdDeviation: "4", result: "blur" }),
                    /* @__PURE__ */ c("feMerge", { children: [
                      /* @__PURE__ */ e("feMergeNode", { in: "blur" }),
                      /* @__PURE__ */ e("feMergeNode", { in: "SourceGraphic" })
                    ] })
                  ] }),
                  /* @__PURE__ */ c("filter", { id: "glow-cardinal-bar", children: [
                    /* @__PURE__ */ e("feGaussianBlur", { stdDeviation: "2.5", result: "blur" }),
                    /* @__PURE__ */ e("feFlood", { "flood-color": "white", "flood-opacity": "0.6", result: "glowColor" }),
                    /* @__PURE__ */ e("feComposite", { in: "glowColor", in2: "blur", operator: "in", result: "glow" }),
                    /* @__PURE__ */ c("feMerge", { children: [
                      /* @__PURE__ */ e("feMergeNode", { in: "glow" }),
                      /* @__PURE__ */ e("feMergeNode", { in: "SourceGraphic" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: q, fill: "url(#sc-bg-outer)" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: q, fill: "none", stroke: "url(#sc-ring-grad)", strokeWidth: "3" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: ie, fill: "none", stroke: "#818cf8", strokeWidth: "1.5" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: se, fill: "none", stroke: "#6366f1", strokeWidth: "2" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: we, fill: "url(#sc-bg-center)" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: we, fill: "none", stroke: "#a78bfa", strokeWidth: "1.5" }),
              _e(() => {
                const t = U ? 5 : 1, i = [];
                for (let o = 0; o < 360; o += t) {
                  const r = te(o), a = o % 10 === 0, u = o % 5 === 0, v = ue, p = a ? ue - 22 : u ? ue - 14 : ue - 7, x = T(r, v), A = T(r, p), b = a ? 3 : u ? 2 : 1;
                  i.push(
                    /* @__PURE__ */ e(
                      "line",
                      {
                        x1: x.x,
                        y1: x.y,
                        x2: A.x,
                        y2: A.y,
                        stroke: "#4f46e5",
                        strokeWidth: b
                      },
                      `tick-${o}`
                    )
                  );
                }
                return i;
              }, [te, ue, T]),
              w && H.houses && (() => {
                const t = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
                return H.houses.map((i) => {
                  const o = te(i.cusp), a = H.houses.find((R) => R.house === i.house % 12 + 1)?.cusp ?? i.cusp + 30, u = te(a), v = Bt === i.house, p = fn(i.house), x = v ? p.hover : p.bg, A = T(o, de), b = T(u, de), O = T(u, ye), I = T(o, ye);
                  let P = (i.cusp + a) / 2;
                  a < i.cusp && (P = (i.cusp + (a + 360)) / 2 % 360);
                  const _ = te(P), F = T(_, (ye + de) / 2), S = Math.floor(i.cusp % 360 / 30), L = Me[S], E = [
                    `Maison ${t[i.house - 1]}`,
                    `Commence en ${L.symbol} ${L.name}`,
                    `Cuspide: ${Ce(i.cusp)}`,
                    `${L.element} · ${L.modality}`
                  ];
                  return /* @__PURE__ */ c(
                    "g",
                    {
                      className: "cursor-pointer",
                      onMouseEnter: () => qe(i.house),
                      onMouseLeave: () => qe(null),
                      onClick: (R) => {
                        R.stopPropagation(), qe(i.house), xe(R.clientX, R.clientY, E, L.color);
                      },
                      children: [
                        /* @__PURE__ */ e(
                          "path",
                          {
                            d: `M ${A.x} ${A.y} A ${de} ${de} 0 0 1 ${b.x} ${b.y} L ${O.x} ${O.y} A ${ye} ${ye} 0 0 0 ${I.x} ${I.y} Z`,
                            fill: x,
                            stroke: v ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
                            strokeWidth: v ? "2" : "1",
                            style: U ? void 0 : { transition: "all 0.15s ease-out" }
                          }
                        ),
                        /* @__PURE__ */ e(
                          "circle",
                          {
                            cx: F.x,
                            cy: F.y,
                            r: 20 * d,
                            fill: "transparent",
                            stroke: "transparent",
                            strokeWidth: "2"
                          }
                        ),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: F.x,
                            y: F.y,
                            textAnchor: "middle",
                            dominantBaseline: "middle",
                            fontSize: v ? 32 * d : 30 * d,
                            fill: "#000000",
                            style: {
                              fontFamily: "system-ui, -apple-system, sans-serif",
                              fontWeight: 900
                            },
                            children: t[i.house - 1]
                          }
                        )
                      ]
                    },
                    `house-sector-${i.house}`
                  );
                });
              })(),
              Me.map((t) => {
                const i = te(t.angle), o = te(t.angle + 30), r = (i + o) / 2, a = T(i, ie), u = T(o, ie), v = T(i, se), p = T(o, se), x = T(r, (ie + se) / 2), A = [
                  `${t.symbol} ${t.name}`,
                  `${t.element} · ${t.modality}`,
                  `Maître : ${t.ruler}`
                ], b = Tt === t.name;
                return /* @__PURE__ */ c(
                  "g",
                  {
                    className: "cursor-pointer",
                    onMouseEnter: () => tt(t.name),
                    onMouseLeave: () => tt(null),
                    onClick: (O) => {
                      O.stopPropagation(), xe(O.clientX, O.clientY, A, t.color);
                    },
                    children: [
                      /* @__PURE__ */ e(
                        "path",
                        {
                          d: `M ${a.x} ${a.y} A ${ie} ${ie} 0 0 1 ${u.x} ${u.y} L ${p.x} ${p.y} A ${se} ${se} 0 0 0 ${v.x} ${v.y} Z`,
                          fill: t.color,
                          fillOpacity: b ? "0.4" : "0.2",
                          stroke: t.color,
                          strokeWidth: b ? "3" : "1.5"
                        }
                      ),
                      (() => {
                        const O = T(i, se), I = T(i, se - 18);
                        return /* @__PURE__ */ e("line", { x1: O.x, y1: O.y, x2: I.x, y2: I.y, stroke: t.color, strokeWidth: "2.5" });
                      })(),
                      /* @__PURE__ */ e(
                        "circle",
                        {
                          cx: x.x,
                          cy: x.y,
                          r: 32 * d * C,
                          fill: "white",
                          stroke: t.color,
                          strokeWidth: "2"
                        }
                      ),
                      /* @__PURE__ */ e(
                        "text",
                        {
                          x: x.x,
                          y: x.y,
                          textAnchor: "middle",
                          dominantBaseline: "middle",
                          fontSize: 46 * d * C,
                          fill: t.color,
                          style: { fontFamily: "serif", fontWeight: 700, pointerEvents: "none" },
                          children: t.symbol
                        }
                      )
                    ]
                  },
                  t.name
                );
              }),
              h && Q.length > 0 && Q.map((t, i) => {
                const o = t.planet1, r = t.planet2, a = ne(o), u = ne(r), v = o.toLowerCase().includes("ascendant") || o.toLowerCase().includes("midheaven") || o.toLowerCase().includes("descendant") || o.toLowerCase().includes("imum"), p = r.toLowerCase().includes("ascendant") || r.toLowerCase().includes("midheaven") || r.toLowerCase().includes("descendant") || r.toLowerCase().includes("imum"), x = !v && z.planets[a] !== void 0, A = !p && z.planets[u] !== void 0;
                let b = !1, O = !1;
                if (v) {
                  let X = a;
                  o.toLowerCase().includes("ascendant") ? X = "ascendant" : o.toLowerCase().includes("midheaven") ? X = "midheaven" : o.toLowerCase().includes("descendant") ? X = "descendant" : o.toLowerCase().includes("imum") && (X = "imumcoeli"), b = y.includes(X);
                } else
                  b = g.includes(a);
                if (p) {
                  let X = u;
                  r.toLowerCase().includes("ascendant") ? X = "ascendant" : r.toLowerCase().includes("midheaven") ? X = "midheaven" : r.toLowerCase().includes("descendant") ? X = "descendant" : r.toLowerCase().includes("imum") && (X = "imumcoeli"), O = y.includes(X);
                } else
                  O = g.includes(u);
                if (!b || !O) return null;
                if (D && D.length > 0) {
                  const X = t.type;
                  if (!D.includes(X))
                    return null;
                }
                const I = ce[a], P = ce[u], _ = I?.type === "planet", F = P?.type === "planet";
                if (!_ || !F)
                  return null;
                let S, L;
                if (x && z.planets[a])
                  S = z.planets[a].longitude;
                else if (v && z.angles)
                  if (o.toLowerCase().includes("ascendant")) S = z.angles.ascendant;
                  else if (o.toLowerCase().includes("midheaven")) S = z.angles.midheaven;
                  else if (o.toLowerCase().includes("descendant")) S = z.angles.descendant;
                  else if (o.toLowerCase().includes("imum")) S = z.angles.imumCoeli;
                  else return null;
                else
                  return null;
                if (A && z.planets[u])
                  L = z.planets[u].longitude;
                else if (p && z.angles)
                  if (r.toLowerCase().includes("ascendant")) L = z.angles.ascendant;
                  else if (r.toLowerCase().includes("midheaven")) L = z.angles.midheaven;
                  else if (r.toLowerCase().includes("descendant")) L = z.angles.descendant;
                  else if (r.toLowerCase().includes("imum")) L = z.angles.imumCoeli;
                  else return null;
                else
                  return null;
                const E = T(te(S), we), R = T(te(L), we), k = Ie(t.type)?.color || (t.harmonious ? "#14b8a6" : t.harmonious === !1 ? "#f43f5e" : "#a78bfa"), Z = et === i || dt.has(i), me = (et !== null || dt.size > 0) && !Z;
                return /* @__PURE__ */ c(
                  "g",
                  {
                    onMouseEnter: () => Ke(i),
                    onMouseLeave: () => Ke(null),
                    children: [
                      /* @__PURE__ */ e(
                        "line",
                        {
                          x1: E.x,
                          y1: E.y,
                          x2: R.x,
                          y2: R.y,
                          stroke: "transparent",
                          strokeWidth: "10",
                          className: "cursor-pointer",
                          onClick: (X) => qt(X, i)
                        }
                      ),
                      /* @__PURE__ */ e(
                        "line",
                        {
                          x1: E.x,
                          y1: E.y,
                          x2: R.x,
                          y2: R.y,
                          stroke: k,
                          strokeWidth: Z ? 4 : 1.3,
                          opacity: Z ? 1 : me ? 0.15 : 0.5,
                          strokeDasharray: "none",
                          filter: Z ? "url(#glow-aspect)" : void 0,
                          className: "pointer-events-none"
                        }
                      )
                    ]
                  },
                  `asp-${i}`
                );
              }),
              G && h && J && (() => {
                const t = An(
                  z.planets || {},
                  // Source A: Transit (Mobile/Dynamique)
                  J.planets || {},
                  // Source B: Natal (Fixe/Ancre) - Planètes
                  J.angles
                  // Source B: Points cardinaux nataux
                ), i = q * 0.45;
                return t.map((o, r) => {
                  const a = ne(o.planet1), u = ne(o.planet2), v = o.planet1.toLowerCase().includes("ascendant") || o.planet1.toLowerCase().includes("midheaven") || o.planet1.toLowerCase().includes("descendant") || o.planet1.toLowerCase().includes("imum") || o.planet1 === "ASC" || o.planet1 === "MC" || o.planet1 === "DS" || o.planet1 === "IC", p = o.planet2.toLowerCase().includes("ascendant") || o.planet2.toLowerCase().includes("midheaven") || o.planet2.toLowerCase().includes("descendant") || o.planet2.toLowerCase().includes("imum") || o.planet2 === "ASC" || o.planet2 === "MC" || o.planet2 === "DS" || o.planet2 === "IC";
                  let x = !1, A = !1;
                  if (v) {
                    let S = a;
                    o.planet1.toLowerCase().includes("ascendant") ? S = "ascendant" : o.planet1.toLowerCase().includes("midheaven") ? S = "midheaven" : o.planet1.toLowerCase().includes("descendant") ? S = "descendant" : o.planet1.toLowerCase().includes("imum") && (S = "imumcoeli"), x = y.includes(S);
                  } else
                    x = g.includes(a);
                  if (p) {
                    let S = u;
                    o.planet2.toLowerCase().includes("ascendant") ? S = "ascendant" : o.planet2.toLowerCase().includes("midheaven") ? S = "midheaven" : o.planet2.toLowerCase().includes("descendant") ? S = "descendant" : o.planet2.toLowerCase().includes("imum") && (S = "imumcoeli"), A = y.includes(S);
                  } else
                    A = g.includes(u);
                  if (!x || !A) return null;
                  const b = te(o.longitude1), O = te(o.longitude2), I = T(b, i), P = T(O, i), F = Ie(o.type)?.color || "#a78bfa";
                  return /* @__PURE__ */ c("g", { children: [
                    /* @__PURE__ */ e(
                      "line",
                      {
                        x1: P.x,
                        y1: P.y,
                        x2: I.x,
                        y2: I.y,
                        stroke: "transparent",
                        strokeWidth: "10",
                        className: "cursor-pointer"
                      }
                    ),
                    /* @__PURE__ */ e(
                      "line",
                      {
                        x1: P.x,
                        y1: P.y,
                        x2: I.x,
                        y2: I.y,
                        stroke: F,
                        strokeWidth: 1.5,
                        opacity: 0.5,
                        strokeDasharray: "4,3",
                        className: "pointer-events-none"
                      }
                    )
                  ] }, `cross-asp-${r}`);
                });
              })(),
              W && h && j && j.length > 0 && (() => {
                const t = q * 0.42;
                return j.map((i, o) => {
                  const r = i.planet1, a = i.planet2, u = r.toLowerCase().includes("ascendant") || r.toLowerCase().includes("midheaven") || r.toLowerCase().includes("descendant") || r.toLowerCase().includes("imum") || r === "ASC" || r === "MC" || r === "DS" || r === "IC", v = a.toLowerCase().includes("ascendant") || a.toLowerCase().includes("midheaven") || a.toLowerCase().includes("descendant") || a.toLowerCase().includes("imum") || a === "ASC" || a === "MC" || a === "DS" || a === "IC";
                  let p, x;
                  if (u) {
                    const k = s?.angles;
                    r.toLowerCase().includes("ascendant") || r === "ASC" ? p = k?.ascendant : r.toLowerCase().includes("midheaven") || r === "MC" ? p = k?.midheaven : r.toLowerCase().includes("descendant") || r === "DS" ? p = k?.descendant : (r.toLowerCase().includes("imum") || r === "IC") && (p = k?.imumCoeli);
                  } else {
                    const k = ne(r);
                    p = s?.planets?.[k]?.longitude;
                  }
                  if (v) {
                    const k = l?.angles;
                    a.toLowerCase().includes("ascendant") || a === "ASC" ? x = k?.ascendant : a.toLowerCase().includes("midheaven") || a === "MC" ? x = k?.midheaven : a.toLowerCase().includes("descendant") || a === "DS" ? x = k?.descendant : (a.toLowerCase().includes("imum") || a === "IC") && (x = k?.imumCoeli);
                  } else {
                    const k = ne(a);
                    x = l?.planets?.[k]?.longitude;
                  }
                  if (p === void 0)
                    if (u) {
                      const k = l?.angles;
                      r.toLowerCase().includes("ascendant") || r === "ASC" ? p = k?.ascendant : r.toLowerCase().includes("midheaven") || r === "MC" ? p = k?.midheaven : r.toLowerCase().includes("descendant") || r === "DS" ? p = k?.descendant : (r.toLowerCase().includes("imum") || r === "IC") && (p = k?.imumCoeli);
                    } else {
                      const k = ne(r);
                      p = l?.planets?.[k]?.longitude;
                    }
                  if (x === void 0)
                    if (v) {
                      const k = s?.angles;
                      a.toLowerCase().includes("ascendant") || a === "ASC" ? x = k?.ascendant : a.toLowerCase().includes("midheaven") || a === "MC" ? x = k?.midheaven : a.toLowerCase().includes("descendant") || a === "DS" ? x = k?.descendant : (a.toLowerCase().includes("imum") || a === "IC") && (x = k?.imumCoeli);
                    } else {
                      const k = ne(a);
                      x = s?.planets?.[k]?.longitude;
                    }
                  if (p === void 0 || x === void 0) return null;
                  let A = !1, b = !1;
                  if (u) {
                    let k = "";
                    r.toLowerCase().includes("ascendant") ? k = "ascendant" : r.toLowerCase().includes("midheaven") ? k = "midheaven" : r.toLowerCase().includes("descendant") ? k = "descendant" : r.toLowerCase().includes("imum") && (k = "imumcoeli"), A = y.includes(k);
                  } else
                    A = g.includes(ne(r));
                  if (v) {
                    let k = "";
                    a.toLowerCase().includes("ascendant") ? k = "ascendant" : a.toLowerCase().includes("midheaven") ? k = "midheaven" : a.toLowerCase().includes("descendant") ? k = "descendant" : a.toLowerCase().includes("imum") && (k = "imumcoeli"), b = y.includes(k);
                  } else
                    b = g.includes(ne(a));
                  if (!A || !b) return null;
                  const O = ne(r), I = ne(a), P = ce[O], _ = ce[I], F = P?.type === "planet", S = _?.type === "planet";
                  if (!F || !S)
                    return null;
                  const E = Ie(i.type)?.color || (i.harmonious ? "#14b8a6" : i.harmonious === !1 ? "#f43f5e" : "#a78bfa"), R = T(te(p), t), V = T(te(x), t);
                  return /* @__PURE__ */ c("g", { children: [
                    /* @__PURE__ */ e(
                      "line",
                      {
                        x1: R.x,
                        y1: R.y,
                        x2: V.x,
                        y2: V.y,
                        stroke: "transparent",
                        strokeWidth: "10",
                        className: "cursor-pointer"
                      }
                    ),
                    /* @__PURE__ */ e(
                      "line",
                      {
                        x1: R.x,
                        y1: R.y,
                        x2: V.x,
                        y2: V.y,
                        stroke: E,
                        strokeWidth: 2,
                        opacity: 0.7,
                        className: "pointer-events-none"
                      }
                    )
                  ] }, `synasp-${o}`);
                });
              })(),
              W && N === "transit" && (() => {
                const t = q * 1.35, i = t + 25 * d, o = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
                return /* @__PURE__ */ c("g", { children: [
                  /* @__PURE__ */ e(
                    "circle",
                    {
                      cx: $,
                      cy: $,
                      r: t,
                      fill: "none",
                      stroke: "#1a1a2e",
                      strokeWidth: 3
                    }
                  ),
                  Array.from({ length: 12 }, (r, a) => {
                    const u = te(a * 30), v = T(u, t), p = T(u, t - 12);
                    return /* @__PURE__ */ e(
                      "line",
                      {
                        x1: v.x,
                        y1: v.y,
                        x2: p.x,
                        y2: p.y,
                        stroke: "#1a1a2e",
                        strokeWidth: 3
                      },
                      `transit-tick-${a}`
                    );
                  }),
                  Array.from({ length: 72 }, (r, a) => {
                    if (a % 6 === 0) return null;
                    const u = te(a * 5), v = T(u, t), p = T(u, t - 6);
                    return /* @__PURE__ */ e(
                      "line",
                      {
                        x1: v.x,
                        y1: v.y,
                        x2: p.x,
                        y2: p.y,
                        stroke: "#334155",
                        strokeWidth: 1.5
                      },
                      `transit-minor-${a}`
                    );
                  }),
                  w && z.houses && z.houses.map((r) => {
                    const u = z.houses.find((A) => A.house === r.house % 12 + 1)?.cusp ?? r.cusp + 30, v = te((r.cusp + u) / 2), p = T(v, i);
                    let x = v - 90;
                    return x > 90 && x < 270 && (x += 180), /* @__PURE__ */ e(
                      "text",
                      {
                        x: p.x,
                        y: p.y,
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        transform: `rotate(${x}, ${p.x}, ${p.y})`,
                        fontSize: 16 * d,
                        fill: "#64748B",
                        style: { fontFamily: "system-ui, sans-serif", fontWeight: 700, filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.9))" },
                        children: o[r.house - 1]
                      },
                      `transit-house-label-${r.house}`
                    );
                  })
                ] });
              })(),
              w && H.houses && (() => {
                const t = Object.entries(xt).filter(([o]) => y.includes(o)).map(([o, r]) => {
                  const a = H.houses.find((u) => u.house === r.house);
                  return a ? { key: o, ...r, longitude: a.cusp, angle: te(a.cusp) } : null;
                }).filter(Boolean);
                return /* @__PURE__ */ e(Ne, { children: !G && [
                  ["ascendant", "descendant"],
                  ["midheaven", "imumcoeli"]
                ].map((o, r) => {
                  const a = t.find((b) => b.key === o[0]), u = t.find((b) => b.key === o[1]);
                  if (!a || !u) return null;
                  const v = q * 1.15, p = T(a.angle, v), x = T(u.angle, v), A = B === a.key || B === u.key || re.has(a.key) || re.has(u.key);
                  return /* @__PURE__ */ e("g", { opacity: A ? 1 : 0.5, children: /* @__PURE__ */ e(
                    "line",
                    {
                      x1: p.x,
                      y1: p.y,
                      x2: x.x,
                      y2: x.y,
                      stroke: "#0f172a",
                      strokeWidth: A ? 2 : 1,
                      strokeDasharray: A ? "none" : "8,4",
                      opacity: 0
                    }
                  ) }, `axis-${r}`);
                }) });
              })(),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: 8 * d, fill: "none", stroke: "#a78bfa", strokeWidth: "2" }),
              /* @__PURE__ */ e("circle", { cx: $, cy: $, r: 3 * d, fill: "#a78bfa" }),
              U && (console.log("Mobile overlays rendering - IS_MOBILE:", U), /* @__PURE__ */ c(Ne, { children: [
                Me.map((t) => {
                  const i = te(t.angle), o = te(t.angle + 30), r = T(i, ie), a = T(o, ie), u = T(i, se), v = T(o, se), p = [
                    `${t.symbol} ${t.name}`,
                    `${t.element} · ${t.modality}`,
                    `Maître : ${t.ruler}`
                  ];
                  return /* @__PURE__ */ e(
                    "path",
                    {
                      d: `M ${r.x} ${r.y} A ${ie} ${ie} 0 0 1 ${a.x} ${a.y} L ${v.x} ${v.y} A ${se} ${se} 0 0 0 ${u.x} ${u.y} Z`,
                      fill: "rgba(0,0,0,0.01)",
                      stroke: "none",
                      className: "cursor-pointer",
                      style: { pointerEvents: "all" },
                      onClick: (x) => {
                        x.stopPropagation(), xe(x.clientX, x.clientY, p, t.color);
                      }
                    },
                    `${t.name}-overlay`
                  );
                }),
                w && H.houses && H.houses.map((t) => {
                  const i = te(t.cusp), r = H.houses.find((P) => P.house === t.house % 12 + 1)?.cusp ?? t.cusp + 30, a = te(r), u = T(i, de), v = T(a, de), p = T(a, ye), x = T(i, ye), A = Math.floor(t.cusp % 360 / 30), b = Me[A], I = [
                    `Maison ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][t.house - 1]}`,
                    `Commence en ${b.symbol} ${b.name}`,
                    `Cuspide: ${Ce(t.cusp)}`,
                    `${b.element} · ${b.modality}`
                  ];
                  return /* @__PURE__ */ e(
                    "path",
                    {
                      d: `M ${u.x} ${u.y} A ${de} ${de} 0 0 1 ${v.x} ${v.y} L ${p.x} ${p.y} A ${ye} ${ye} 0 0 0 ${x.x} ${x.y} Z`,
                      fill: "rgba(0,0,0,0.01)",
                      stroke: "none",
                      className: "cursor-pointer",
                      style: { pointerEvents: "all" },
                      onClick: (P) => {
                        P.stopPropagation(), xe(P.clientX, P.clientY, I, b.color);
                      }
                    },
                    `house-${t.house}-overlay`
                  );
                })
              ] })),
              !G && zt.map((t) => {
                const i = z.planets[t.key], o = ce[t.key] || {
                  symbol: t.key.charAt(0).toUpperCase(),
                  color: "#ea580c",
                  type: "asteroid"
                };
                if (!i) return null;
                const r = ue, a = T(t.svgAngle, r), u = { x: t.x, y: t.y }, v = i.isRetrograde || i.retrograde, p = Te.has(t.key) || B === t.key || re.has(t.key), x = (Te.size > 0 || B || re.size > 0) && !p, A = t.key === "northNode" || t.key === "southNode" || t.key === "trueNode" || t.key === "meanNode", b = t.key === "lilithMean", O = t.key === "vertex" || t.key === "antiVertex" || t.key === "partOfFortune", I = ["jupiter", "saturn", "uranus", "neptune", "vesta", "chiron", "ceres", "pallas", "juno"].includes(t.key), P = O || A || I, _ = !W, F = t.key === "mars" || t.key === "venus", S = t.key === "mars" || t.key === "venus", L = i.longitude % 360 / 360 * 4;
                return /* @__PURE__ */ c(
                  "g",
                  {
                    className: "cursor-pointer",
                    style: U ? void 0 : { transition: "opacity 0.2s" },
                    opacity: x ? 0.4 : 1,
                    onMouseEnter: () => {
                      M?.(t.key);
                    },
                    onMouseLeave: () => {
                      M?.(null);
                    },
                    onClick: (E) => {
                      E.stopPropagation();
                      const R = i.sign || Ee(i.longitude), V = i.house || ct(i.longitude), k = pt(t.key, R), Z = V && yt[V] || "", me = A ? [
                        "Source : NASA JPL DE440"
                      ] : [v ? "℞ Rétrograde" : ""], fe = [
                        `${o.symbol} ${Fe(t.key, i.name)}`,
                        _ ? n?.metadata?.name || "Natal" : m || "Transit",
                        `${R} ${Ce(i.longitude)}`,
                        V ? `Maison ${V} : ${Z}` : "",
                        `${k.emoji} ${k.label}`,
                        `Longitude : ${i.longitude.toFixed(4)}°`,
                        ...me
                      ].filter(Boolean);
                      Se(E, t.key, fe, o.color);
                    },
                    children: [
                      (() => {
                        const E = u.x - a.x, R = u.y - a.y, V = Math.sqrt(E * E + R * R) || 1, k = E / V, Z = R / V, me = (P ? 52 : S ? 68 : 72) * d * C, fe = F && !P ? 2.5 * d : 0, X = me * 0.38 + fe + 1, ve = u.x - k * X, Le = u.y - Z * X;
                        return /* @__PURE__ */ e(
                          "path",
                          {
                            d: `M ${a.x} ${a.y} L ${ve} ${Le}`,
                            stroke: o.color,
                            strokeWidth: p ? 2.5 : 2,
                            fill: "none",
                            opacity: 0.4,
                            strokeLinecap: "round"
                          }
                        );
                      })(),
                      /* @__PURE__ */ e("circle", { cx: a.x, cy: a.y, r: (p ? 5 : 3.5) * d, fill: o.color }),
                      _ ? /* @__PURE__ */ c("g", { className: U ? void 0 : "anemone-sway", style: U ? void 0 : { animationDelay: `-${L.toFixed(2)}s`, transformOrigin: `${u.x}px ${u.y}px` }, children: [
                        F && !P && /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: S ? 76 * d * C : 80 * d * C,
                            x: u.x,
                            y: u.y,
                            hasStroke: !0,
                            strokeWidth: 5 * d
                          }
                        ),
                        /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: P ? 60 * d * C : S ? 76 * d * C : 80 * d * C,
                            x: u.x,
                            y: u.y,
                            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                          }
                        ),
                        (() => {
                          const E = (P ? 38 * d : S ? 46 * d : 50 * d) * C, V = Math.sqrt((u.x - $) ** 2 + (u.y - $) ** 2) + E, k = T(t.svgAngle, V);
                          let Z = t.svgAngle - 90;
                          return Z > 90 && Z < 270 && (Z += 180), /* @__PURE__ */ e(
                            "text",
                            {
                              x: k.x,
                              y: k.y,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              transform: `rotate(${Z}, ${k.x}, ${k.y})`,
                              fontSize: 24 * d * C,
                              fill: o.color,
                              style: { fontWeight: 700, fontFamily: "monospace" },
                              children: Ae(i.longitude)
                            }
                          );
                        })()
                      ] }) : /* @__PURE__ */ c("g", { className: U ? void 0 : "anemone-sway", style: U ? void 0 : { animationDelay: `-${L.toFixed(2)}s`, transformOrigin: `${u.x}px ${u.y}px` }, children: [
                        F && !P && /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: S ? 80 * d * C : 84 * d * C,
                            x: u.x,
                            y: u.y,
                            hasStroke: !0,
                            strokeWidth: 5 * d
                          }
                        ),
                        /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: P ? 64 * d * C : S ? 80 * d * C : 84 * d * C,
                            x: u.x,
                            y: u.y,
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                          }
                        ),
                        (() => {
                          const E = (P ? 40 * d : S ? 48 * d : 52 * d) * C, V = Math.sqrt((u.x - $) ** 2 + (u.y - $) ** 2) + E, k = T(t.svgAngle, V);
                          let Z = t.svgAngle - 90;
                          return Z > 90 && Z < 270 && (Z += 180), /* @__PURE__ */ e(
                            "text",
                            {
                              x: k.x,
                              y: k.y,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              transform: `rotate(${Z}, ${k.x}, ${k.y})`,
                              fontSize: 24 * d * C,
                              fill: o.color,
                              style: { fontWeight: 700, fontFamily: "monospace" },
                              children: Ae(i.longitude)
                            }
                          );
                        })()
                      ] }),
                      v && !A && !b && (o.type === "planet" || o.type === "point") && /* @__PURE__ */ c("g", { children: [
                        /* @__PURE__ */ e("circle", { cx: u.x + 26 * d * C, cy: u.y - 26 * d * C, r: 12 * d * C, fill: "#fef2f2", stroke: "#ef4444", strokeWidth: "1.5" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: u.x + 26 * d * C,
                            y: u.y - 26 * d * C,
                            textAnchor: "middle",
                            dominantBaseline: "middle",
                            fontSize: 16 * d * C,
                            fill: "#ef4444",
                            style: { fontWeight: 800 },
                            children: "℞"
                          }
                        )
                      ] })
                    ]
                  },
                  t.key
                );
              }),
              W && !G && Kt.map((t) => {
                const i = J.planets[t.key], o = ce[t.key] || {
                  symbol: t.key.charAt(0).toUpperCase(),
                  color: "#06b6d4",
                  type: "asteroid"
                };
                if (!i) return null;
                const r = { x: t.x, y: t.y }, a = ie * 0.95, u = T(t.svgAngle, a), v = B === `inner-${t.key}` || re.has(t.key), p = (B || re.size > 0) && !v, x = i.isRetrograde || i.retrograde, A = t.key === "northNode" || t.key === "southNode" || t.key === "trueNode" || t.key === "meanNode", b = t.key === "lilithMean", O = t.key === "mars" || t.key === "venus", I = t.key === "mars" || t.key === "venus", P = t.key === "vertex" || t.key === "antiVertex" || t.key === "partOfFortune", _ = ["jupiter", "saturn", "uranus", "neptune", "vesta", "chiron", "ceres", "pallas", "juno"].includes(t.key), F = P || A || _, S = i.longitude % 360 / 360 * 4;
                return /* @__PURE__ */ c(
                  "g",
                  {
                    className: "cursor-pointer",
                    style: U ? void 0 : { transition: "opacity 0.2s" },
                    opacity: p ? 0.4 : 1,
                    onMouseEnter: () => {
                      M?.(`inner-${t.key}`);
                    },
                    onMouseLeave: () => {
                      M?.(null);
                    },
                    onClick: (L) => {
                      L.stopPropagation();
                      const E = i.sign || Ee(i.longitude), R = [
                        `${o.symbol} ${Fe(t.key, i.name)}`,
                        f || "Natal",
                        `${E} ${Ce(i.longitude)}`,
                        `Longitude : ${i.longitude.toFixed(4)}°`,
                        x && !A && !b ? "℞ Rétrograde" : ""
                      ].filter(Boolean);
                      Se(L, `inner-${t.key}`, R, o.color);
                    },
                    children: [
                      (() => {
                        const L = r.x - u.x, E = r.y - u.y, R = Math.sqrt(L * L + E * E) || 1, V = L / R, k = E / R, Z = (F ? 60 : I ? 76 : 80) * d * C, me = O && !F ? 2 * d : 0, fe = Z * 0.38 + me + 1, X = r.x - V * fe, ve = r.y - k * fe;
                        return /* @__PURE__ */ e(
                          "path",
                          {
                            d: `M ${u.x} ${u.y} L ${X} ${ve}`,
                            stroke: o.color,
                            strokeWidth: v ? 2.5 : 2,
                            fill: "none",
                            opacity: 0.4,
                            strokeLinecap: "round"
                          }
                        );
                      })(),
                      /* @__PURE__ */ e("circle", { cx: u.x, cy: u.y, r: 3.5 * d, fill: o.color }),
                      /* @__PURE__ */ c("g", { className: U ? void 0 : "anemone-sway", style: U ? void 0 : { animationDelay: `-${S.toFixed(2)}s`, transformOrigin: `${r.x}px ${r.y}px` }, children: [
                        O && !F && /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: I ? 76 * d * C : 80 * d * C,
                            x: r.x,
                            y: r.y,
                            hasStroke: !0,
                            strokeWidth: 5 * d
                          }
                        ),
                        /* @__PURE__ */ e(
                          pe,
                          {
                            planetKey: t.key,
                            symbol: o.symbol,
                            color: o.color,
                            size: F ? 60 * d * C : I ? 76 * d * C : 80 * d * C,
                            x: r.x,
                            y: r.y,
                            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                          }
                        ),
                        (() => {
                          const L = F ? 38 * d : I ? 46 * d : 50 * d, R = Math.sqrt((r.x - $) ** 2 + (r.y - $) ** 2) + L, V = T(t.svgAngle, R);
                          let k = t.svgAngle - 90;
                          return k > 90 && k < 270 && (k += 180), /* @__PURE__ */ e(
                            "text",
                            {
                              x: V.x,
                              y: V.y,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              transform: `rotate(${k}, ${V.x}, ${V.y})`,
                              fontSize: 24 * d * C,
                              fill: o.color,
                              style: { fontWeight: 700, fontFamily: "monospace" },
                              children: Ae(i.longitude)
                            }
                          );
                        })()
                      ] }),
                      x && !A && !b && (o.type === "planet" || o.type === "point") && /* @__PURE__ */ c("g", { children: [
                        /* @__PURE__ */ e("circle", { cx: r.x + 22 * d * C, cy: r.y - 22 * d * C, r: 10 * d * C, fill: "white", stroke: "#ef4444", strokeWidth: "1.5" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: r.x + 22 * d * C,
                            y: r.y - 22 * d * C,
                            textAnchor: "middle",
                            dominantBaseline: "middle",
                            fontSize: 14 * d * C,
                            fill: "#ef4444",
                            style: { fontWeight: 800 },
                            children: "℞"
                          }
                        )
                      ] })
                    ]
                  },
                  `inner-${t.key}`
                );
              }),
              G && /* @__PURE__ */ c(Ne, { children: [
                _t.map((t) => {
                  const i = J.planets[t.key], o = ce[t.key] || {
                    symbol: t.key.charAt(0).toUpperCase(),
                    color: "#06b6d4",
                    type: "asteroid"
                  };
                  if (!i) return null;
                  const r = i.isRetrograde || i.retrograde, a = t.key === "northNode" || t.key === "southNode" || t.key === "trueNode" || t.key === "meanNode", u = t.key === "lilithMean", v = B === `inner-${t.key}` || re.has(t.key), p = (B || re.size > 0) && !v, x = t.key === "mars" || t.key === "venus", A = t.key === "mars" || t.key === "venus", b = t.key === "vertex" || t.key === "antiVertex" || t.key === "partOfFortune", O = ["jupiter", "saturn", "uranus", "neptune", "vesta", "chiron", "ceres", "pallas", "juno"].includes(t.key), I = b || a || O, P = i.longitude % 360 / 360 * 4;
                  return /* @__PURE__ */ c(
                    "g",
                    {
                      className: "cursor-pointer",
                      style: U ? void 0 : { transition: "opacity 0.2s" },
                      opacity: p ? 0.4 : 1,
                      onMouseEnter: () => {
                        M?.(`inner-${t.key}`);
                      },
                      onMouseLeave: () => {
                        M?.(null);
                      },
                      onClick: (_) => {
                        _.stopPropagation();
                        const F = i.sign || Ee(i.longitude), S = [
                          `${o.symbol} ${Fe(t.key, i.name)}`,
                          f || "Natal",
                          `${F} ${Ce(i.longitude)}`,
                          `Longitude : ${i.longitude.toFixed(4)}°`,
                          r && !a && !u ? "℞ Rétrograde" : ""
                        ].filter(Boolean);
                        Se(_, `inner-${t.key}`, S, o.color);
                      },
                      children: [
                        (() => {
                          const _ = ue, F = t.svgAngle * Math.PI / 180, S = $ + _ * Math.cos(F), L = $ + _ * Math.sin(F), E = t.x - S, R = t.y - L, V = Math.sqrt(E * E + R * R) || 1, k = E / V, Z = R / V, me = (I ? 60 : A ? 76 : 80) * d * C, fe = x && !I ? 2 * d : 0, X = me * 0.38 + fe + 1, ve = t.x - k * X, Le = t.y - Z * X;
                          return /* @__PURE__ */ e(
                            "path",
                            {
                              d: `M ${S} ${L} L ${ve} ${Le}`,
                              stroke: o.color,
                              strokeWidth: v ? 2.5 : 2,
                              fill: "none",
                              opacity: 0.5,
                              strokeLinecap: "round"
                            }
                          );
                        })(),
                        (() => {
                          const _ = ue, F = t.svgAngle * Math.PI / 180, S = $ + _ * Math.cos(F), L = $ + _ * Math.sin(F);
                          return /* @__PURE__ */ e("circle", { cx: S, cy: L, r: 4 * d, fill: o.color });
                        })(),
                        /* @__PURE__ */ c("g", { className: U ? void 0 : "anemone-sway", style: U ? void 0 : { animationDelay: `-${P.toFixed(2)}s`, transformOrigin: `${t.x}px ${t.y}px` }, children: [
                          x && !I && /* @__PURE__ */ e(
                            pe,
                            {
                              planetKey: t.key,
                              symbol: o.symbol,
                              color: o.color,
                              size: A ? 76 * d * C : 80 * d * C,
                              x: t.x,
                              y: t.y,
                              hasStroke: !0,
                              strokeWidth: 5 * d
                            }
                          ),
                          /* @__PURE__ */ e(
                            pe,
                            {
                              planetKey: t.key,
                              symbol: o.symbol,
                              color: o.color,
                              size: I ? 60 * d * C : A ? 76 * d * C : 80 * d * C,
                              x: t.x,
                              y: t.y,
                              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                            }
                          ),
                          (() => {
                            const _ = I ? 38 * d : A ? 46 * d : 50 * d, F = q * 1.15 + _, S = T(t.svgAngle, F);
                            let L = t.svgAngle - 90;
                            return L > 90 && L < 270 && (L += 180), /* @__PURE__ */ e(
                              "text",
                              {
                                x: S.x,
                                y: S.y,
                                textAnchor: "middle",
                                dominantBaseline: "middle",
                                transform: `rotate(${L}, ${S.x}, ${S.y})`,
                                fontSize: 24 * d * C,
                                fill: o.color,
                                style: { fontWeight: 700, fontFamily: "monospace" },
                                children: Ae(i.longitude)
                              }
                            );
                          })()
                        ] }),
                        r && !a && !u && (o.type === "planet" || o.type === "point") && /* @__PURE__ */ c("g", { children: [
                          /* @__PURE__ */ e("circle", { cx: t.x + 26 * d * C, cy: t.y - 26 * d * C, r: 12 * d * C, fill: "white", stroke: "#ef4444", strokeWidth: "1.5" }),
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: t.x + 26 * d * C,
                              y: t.y - 26 * d * C,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: 16 * d * C,
                              fill: "#ef4444",
                              style: { fontWeight: 800 },
                              children: "℞"
                            }
                          )
                        ] })
                      ]
                    },
                    `natal-${t.key}`
                  );
                }),
                Wt.map((t) => {
                  const i = z.planets[t.key], o = ce[t.key] || {
                    symbol: t.key.charAt(0).toUpperCase(),
                    color: "#ea580c",
                    type: "asteroid"
                  };
                  if (!i) return null;
                  const r = i.isRetrograde || i.retrograde, a = t.key === "northNode" || t.key === "southNode" || t.key === "trueNode" || t.key === "meanNode", u = t.key === "lilithMean", v = Te.has(t.key) || B === t.key || re.has(t.key), p = (Te.size > 0 || B || re.size > 0) && !v, x = t.key === "mars" || t.key === "venus", A = t.key === "mars" || t.key === "venus", b = t.key === "vertex" || t.key === "antiVertex" || t.key === "partOfFortune", O = ["jupiter", "saturn", "uranus", "neptune", "vesta", "chiron", "ceres", "pallas", "juno"].includes(t.key), I = b || a || O, P = i.longitude % 360 / 360 * 4;
                  return /* @__PURE__ */ c(
                    "g",
                    {
                      className: "cursor-pointer",
                      style: U ? void 0 : { transition: "opacity 0.2s" },
                      opacity: p ? 0.4 : 1,
                      onMouseEnter: () => {
                        M?.(t.key);
                      },
                      onMouseLeave: () => {
                        M?.(null);
                      },
                      onClick: (_) => {
                        _.stopPropagation();
                        const F = i.sign || Ee(i.longitude), S = i.house || ct(i.longitude), L = pt(t.key, F), E = S && yt[S] || "", R = [
                          `${o.symbol} ${Fe(t.key, i.name)}`,
                          m || "Transit",
                          `${F} ${Ce(i.longitude)}`,
                          S ? `Maison ${S} : ${E}` : "",
                          `${L.emoji} ${L.label}`,
                          `Longitude : ${i.longitude.toFixed(4)}°`,
                          r && !a && !u ? "℞ Rétrograde" : ""
                        ].filter(Boolean);
                        Se(_, t.key, R, o.color);
                      },
                      children: [
                        (() => {
                          const _ = De, F = t.svgAngle * Math.PI / 180, S = $ + _ * Math.cos(F), L = $ + _ * Math.sin(F), E = t.x - S, R = t.y - L, V = Math.sqrt(E * E + R * R) || 1, k = E / V, Z = R / V, me = (I ? 54 : A ? 64 : 68) * d * C, fe = x && !I ? 2 * d : 0, X = me * 0.38 + fe + 1, ve = t.x - k * X, Le = t.y - Z * X;
                          return /* @__PURE__ */ e(
                            "path",
                            {
                              d: `M ${S} ${L} L ${ve} ${Le}`,
                              stroke: o.color,
                              strokeWidth: v ? 2.5 : 2,
                              fill: "none",
                              opacity: 0.5,
                              strokeLinecap: "round"
                            }
                          );
                        })(),
                        (() => {
                          const _ = De, F = t.svgAngle * Math.PI / 180, S = $ + _ * Math.cos(F), L = $ + _ * Math.sin(F);
                          return /* @__PURE__ */ e("circle", { cx: S, cy: L, r: 4 * d, fill: o.color });
                        })(),
                        /* @__PURE__ */ c("g", { className: U ? void 0 : "anemone-sway", style: U ? void 0 : { animationDelay: `-${P.toFixed(2)}s`, transformOrigin: `${t.x}px ${t.y}px` }, children: [
                          /* @__PURE__ */ e("circle", { cx: t.x, cy: t.y, r: 34 * d, fill: "white", stroke: o.color, strokeWidth: 2, opacity: 0.95 }),
                          x && !I && /* @__PURE__ */ e(
                            pe,
                            {
                              planetKey: t.key,
                              symbol: o.symbol,
                              color: o.color,
                              size: A ? 64 * d * C : 68 * d * C,
                              x: t.x,
                              y: t.y,
                              hasStroke: !0,
                              strokeWidth: 5 * d
                            }
                          ),
                          /* @__PURE__ */ e(
                            pe,
                            {
                              planetKey: t.key,
                              symbol: o.symbol,
                              color: o.color,
                              size: I ? 54 * d * C : A ? 64 * d * C : 68 * d * C,
                              x: t.x,
                              y: t.y,
                              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                            }
                          ),
                          (() => {
                            const F = (W ? 58 : I ? 40 : A ? 48 : 52) * d, L = Math.sqrt((t.x - $) ** 2 + (t.y - $) ** 2) + F, E = T(t.svgAngle, L);
                            let R = t.svgAngle - 90;
                            return R > 90 && R < 270 && (R += 180), /* @__PURE__ */ e(
                              "text",
                              {
                                x: E.x,
                                y: E.y,
                                textAnchor: "middle",
                                dominantBaseline: "middle",
                                transform: `rotate(${R}, ${E.x}, ${E.y})`,
                                fontSize: 24 * d * C,
                                fill: o.color,
                                style: { fontWeight: 700, fontFamily: "monospace" },
                                children: Ae(i.longitude)
                              }
                            );
                          })()
                        ] }),
                        r && !a && !u && (o.type === "planet" || o.type === "point") && /* @__PURE__ */ c("g", { children: [
                          /* @__PURE__ */ e("circle", { cx: t.x + 26 * d * C, cy: t.y - 26 * d * C, r: 12 * d * C, fill: "#fef2f2", stroke: "#ef4444", strokeWidth: "1.5" }),
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: t.x + 26 * d * C,
                              y: t.y - 26 * d * C,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: 16 * d * C,
                              fill: "#ef4444",
                              style: { fontWeight: 800 },
                              children: "℞"
                            }
                          )
                        ] })
                      ]
                    },
                    `transit-${t.key}`
                  );
                })
              ] }),
              w && H.houses && H.houses.map((t) => {
                const i = te(t.cusp), o = T(i, de), r = T(i, we);
                return /* @__PURE__ */ e("g", { children: /* @__PURE__ */ e(
                  "line",
                  {
                    x1: o.x,
                    y1: o.y,
                    x2: r.x,
                    y2: r.y,
                    stroke: "#ffffff",
                    strokeWidth: 3
                  }
                ) }, `cusp-${t.house}`);
              }),
              w && H.houses && (() => {
                const t = Object.entries(xt).filter(([o]) => y.includes(o)).map(([o, r]) => {
                  const a = H.houses.find((u) => u.house === r.house);
                  return a ? { key: o, ...r, longitude: a.cusp, angle: te(a.cusp) } : null;
                }).filter(Boolean), i = de * 0.92;
                return t.map(({ key: o, house: r, label: a, description: u, longitude: v, angle: p }) => {
                  const A = T(p, ue), b = T(p, i), O = (B === o ? 11 : 8) * d, I = B === o || re.has(o), P = (B || re.size > 0) && !I, _ = [
                    `${a} : Maison ${r}`,
                    u,
                    `${Ce(v)} ${Ee(v)}`
                  ], F = Ft === o, S = a === "MC" || a === "IC", L = I || F ? 44 * d : 38 * d;
                  return /* @__PURE__ */ c(
                    "g",
                    {
                      className: "cursor-pointer",
                      style: U ? void 0 : { transition: "opacity 0.2s" },
                      opacity: P ? 0.4 : 1,
                      onMouseEnter: () => nt(o),
                      onMouseLeave: () => nt(null),
                      onClick: (E) => {
                        E.stopPropagation(), M?.(o), Se(E, o, _, "#1e293b");
                      },
                      children: [
                        S ? /* @__PURE__ */ c("g", { transform: `rotate(${(() => {
                          const E = (p % 360 + 360) % 360;
                          return E > 180 && E < 360 ? E + 90 : E - 90;
                        })()}, ${b.x}, ${b.y})`, children: [
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: b.x,
                              y: b.y - L * 0.42,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: L,
                              fill: "#0f172a",
                              style: { fontWeight: 700, filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.9))" },
                              children: a[0]
                            }
                          ),
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: b.x,
                              y: b.y + L * 0.42,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: L,
                              fill: "#0f172a",
                              style: { fontWeight: 700, filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.9))" },
                              children: a[1]
                            }
                          ),
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: b.x,
                              y: b.y + (a === "IC" ? -L * 1.3 : L * 1.3),
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: 20 * d,
                              fill: "#0f172a",
                              style: { fontWeight: 700, opacity: 0.9, filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.9))" },
                              children: Ae(v)
                            }
                          )
                        ] }) : /* @__PURE__ */ c(Ne, { children: [
                          /* @__PURE__ */ e(
                            "text",
                            {
                              x: b.x,
                              y: b.y,
                              textAnchor: "middle",
                              dominantBaseline: "middle",
                              fontSize: I || F ? 48 * d : 42 * d,
                              fill: "#0f172a",
                              style: { fontWeight: 700, filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.9))" },
                              children: a
                            }
                          ),
                          (() => {
                            const E = i - 52 * d, R = T(p, E);
                            return /* @__PURE__ */ e(
                              "text",
                              {
                                x: R.x,
                                y: R.y,
                                textAnchor: "middle",
                                dominantBaseline: "middle",
                                fontSize: 20 * d,
                                fill: "#0f172a",
                                style: { fontWeight: 700, opacity: 0.9, filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.9))" },
                                children: Ae(v)
                              }
                            );
                          })()
                        ] }),
                        /* @__PURE__ */ e(
                          "polygon",
                          {
                            points: `${A.x},${A.y - O} ${A.x + O},${A.y} ${A.x},${A.y + O} ${A.x - O},${A.y}`,
                            fill: I || F ? "#1e293b" : "#ffffff",
                            stroke: "#0f172a",
                            strokeWidth: I || F ? 3.5 : 2.5
                          }
                        )
                      ]
                    },
                    `cardinal-${a}`
                  );
                });
              })(),
              (() => {
                const t = W ? Y * 0.05 : 0, i = W ? Y * 0.15 : 0;
                return /* @__PURE__ */ c("g", { children: [
                  /* @__PURE__ */ e(
                    "text",
                    {
                      x: Y - 12 + t,
                      y: Y - 55 + i,
                      textAnchor: "end",
                      fontSize: 22 * d,
                      fill: "#1E293B",
                      style: { fontFamily: "system-ui, sans-serif", fontWeight: 800, letterSpacing: "-0.02em" },
                      children: "Psychomantic"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "text",
                    {
                      x: Y - 12 + t,
                      y: Y - 32 + i,
                      textAnchor: "end",
                      fontSize: 12 * d,
                      fill: "#64748B",
                      style: { fontFamily: "system-ui, sans-serif", fontWeight: 800, letterSpacing: "0.1em" },
                      children: "POWERED BY"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "text",
                    {
                      x: Y - 12 + t,
                      y: Y - 12 + i,
                      textAnchor: "end",
                      fontSize: 18 * d,
                      fill: "#647499",
                      style: { fontFamily: "system-ui, sans-serif", fontWeight: 700 },
                      children: "IshtarEngine"
                    }
                  )
                ] });
              })()
            ]
          }
        ) }),
        $e && /* @__PURE__ */ c(un, { children: [
          /* @__PURE__ */ e(
            "div",
            {
              className: "fixed inset-0 z-[2147483646]",
              style: { backgroundColor: "transparent" },
              onClick: rt
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: `fixed z-[2147483647] bg-white border-2 rounded-2xl shadow-xl pointer-events-auto ${U ? "px-3 py-2" : "px-4 py-3"}`,
              style: {
                left: $e.x + "px",
                top: $e.y + "px",
                position: "fixed",
                borderColor: $e.color || "#818cf8",
                maxWidth: "min(300px, 85vw)",
                minWidth: U ? "140px" : "180px"
                // No maxHeight or overflowY - tooltip expands fully without scrollbar
              },
              onClick: (t) => t.stopPropagation(),
              children: $e.lines.map((t, i) => /* @__PURE__ */ e(
                "div",
                {
                  className: i === 0 ? U ? "text-sm font-black tracking-wide" : "text-base font-black tracking-wide" : i === 1 ? U ? "text-xs font-bold pastelo-text-muted mt-0.5" : "text-sm font-bold pastelo-text-muted mt-1" : U ? "text-[10px] pastelo-text-muted mt-0.5 leading-tight" : "text-xs pastelo-text-muted mt-1 leading-relaxed",
                  style: i === 0 ? { color: $e.color || "#4338ca" } : void 0,
                  children: t
                },
                i
              ))
            }
          )
        ] })
      ]
    }
  );
}
function Gn({
  theme: n = "auto",
  size: s,
  className: l = "",
  ...m
}) {
  const f = n === "auto" ? void 0 : n;
  return /* @__PURE__ */ e(
    "div",
    {
      className: `pm-widget pm-natal-chart ${l}`,
      "data-theme": f,
      role: "img",
      "aria-label": "Carte du ciel astrologique",
      style: { width: "100%", maxWidth: s },
      children: /* @__PURE__ */ e(Mn, { ...m })
    }
  );
}
const He = 500, bt = He / 2, kt = 180;
function Rn({ positions: n, onArcanaClick: s }) {
  const l = (K) => n[K], m = l("NW"), f = l("NE"), N = l("SW"), w = l("SE"), h = l("A"), g = l("B"), y = l("C"), D = l("D"), B = l("E");
  if (!m || !f || !N || !w || !h || !g || !y || !D || !B) return null;
  const M = (K, ee) => ({
    x: bt + K * kt,
    y: bt - ee * kt
  }), j = M(h.x, h.y), W = M(g.x, g.y), G = M(y.x, y.y), z = M(D.x, D.y), J = M(B.x, B.y), H = M(m.x, m.y), Q = M(f.x, f.y), Y = M(N.x, N.y), $ = M(w.x, w.y), d = (K) => {
    s?.(K.value, K.label);
  }, q = ({ pos: K, svg: ee, color: Be }) => /* @__PURE__ */ c(
    "g",
    {
      className: "cursor-pointer transition-opacity hover:opacity-80",
      onClick: () => d(K),
      role: "button",
      "aria-label": `Arcane ${K.value} position ${K.label}`,
      children: [
        /* @__PURE__ */ e("circle", { cx: ee.x, cy: ee.y, r: "34", fill: "#ffffff", stroke: Be, strokeWidth: "3" }),
        /* @__PURE__ */ e("circle", { cx: ee.x, cy: ee.y, r: "28", fill: `${Be}22` }),
        /* @__PURE__ */ e("text", { x: ee.x, y: ee.y + 10, textAnchor: "middle", fontSize: "32", fontWeight: "800", fill: "#1e293b", children: K.value }),
        /* @__PURE__ */ e("text", { x: ee.x, y: ee.y - 44, textAnchor: "middle", fontSize: "16", fontWeight: "700", fill: "#64748b", children: K.label })
      ]
    }
  ), ge = ({ pos: K, svg: ee }) => /* @__PURE__ */ c(
    "g",
    {
      className: "cursor-pointer transition-opacity hover:opacity-80",
      onClick: () => d(K),
      role: "button",
      "aria-label": `Arcane ${K.value} position ${K.label}`,
      children: [
        /* @__PURE__ */ e("circle", { cx: ee.x, cy: ee.y, r: "38", fill: "#ffffff", stroke: "#70CEF9", strokeWidth: "3" }),
        /* @__PURE__ */ e("circle", { cx: ee.x, cy: ee.y, r: "32", fill: "#70CEF922" }),
        /* @__PURE__ */ e("text", { x: ee.x, y: ee.y + 12, textAnchor: "middle", fontSize: "34", fontWeight: "800", fill: "#1e293b", children: K.value }),
        /* @__PURE__ */ e("text", { x: ee.x, y: ee.y - 50, textAnchor: "middle", fontSize: "16", fontWeight: "700", fill: "#64748b", children: K.label })
      ]
    }
  );
  return /* @__PURE__ */ e("div", { className: "relative w-full max-w-lg mx-auto aspect-square", children: /* @__PURE__ */ c("svg", { viewBox: `0 0 ${He} ${He}`, className: "w-full h-full drop-shadow-sm", children: [
    /* @__PURE__ */ e("rect", { x: "20", y: "20", width: "460", height: "460", rx: "28", fill: "#f3e8ff", fillOpacity: "0.35" }),
    /* @__PURE__ */ e(
      "polygon",
      {
        points: `${H.x},${H.y} ${Q.x},${Q.y} ${$.x},${$.y} ${Y.x},${Y.y}`,
        fill: "none",
        stroke: "#70CEF9",
        strokeWidth: "3",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ e(
      "polygon",
      {
        points: `${j.x},${j.y} ${G.x},${G.y} ${W.x},${W.y} ${z.x},${z.y}`,
        fill: "none",
        stroke: "#BEABFA",
        strokeWidth: "3",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ e("line", { x1: H.x, y1: H.y, x2: $.x, y2: $.y, stroke: "#70CEF9", strokeWidth: "2", strokeDasharray: "8 5", opacity: "0.7" }),
    /* @__PURE__ */ e("line", { x1: Q.x, y1: Q.y, x2: Y.x, y2: Y.y, stroke: "#70CEF9", strokeWidth: "2", strokeDasharray: "8 5", opacity: "0.7" }),
    /* @__PURE__ */ e("line", { x1: H.x, y1: H.y, x2: j.x, y2: j.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: H.x, y1: H.y, x2: z.x, y2: z.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: Q.x, y1: Q.y, x2: j.x, y2: j.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: Q.x, y1: Q.y, x2: G.x, y2: G.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: $.x, y1: $.y, x2: G.x, y2: G.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: $.x, y1: $.y, x2: W.x, y2: W.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: Y.x, y1: Y.y, x2: z.x, y2: z.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ e("line", { x1: Y.x, y1: Y.y, x2: W.x, y2: W.y, stroke: "#BEABFA", strokeWidth: "2", opacity: "0.6" }),
    /* @__PURE__ */ c(
      "g",
      {
        className: "cursor-pointer transition-opacity hover:opacity-80",
        onClick: () => d(B),
        role: "button",
        "aria-label": `Arcane ${B.value} centre ${B.label}`,
        children: [
          /* @__PURE__ */ e("circle", { cx: J.x, cy: J.y, r: "42", fill: "#F999A8", fillOpacity: "0.9" }),
          /* @__PURE__ */ e("circle", { cx: J.x, cy: J.y, r: "34", fill: "#ffffff" }),
          /* @__PURE__ */ e("text", { x: J.x, y: J.y + 11, textAnchor: "middle", fontSize: "34", fontWeight: "800", fill: "#1e293b", children: B.value }),
          /* @__PURE__ */ e("text", { x: J.x, y: J.y - 50, textAnchor: "middle", fontSize: "16", fontWeight: "700", fill: "#64748b", children: B.label })
        ]
      }
    ),
    /* @__PURE__ */ e(q, { pos: h, svg: j, color: "#BEABFA" }),
    /* @__PURE__ */ e(q, { pos: g, svg: W, color: "#BEABFA" }),
    /* @__PURE__ */ e(q, { pos: y, svg: G, color: "#BEABFA" }),
    /* @__PURE__ */ e(q, { pos: D, svg: z, color: "#BEABFA" }),
    /* @__PURE__ */ e(ge, { pos: m, svg: H }),
    /* @__PURE__ */ e(ge, { pos: f, svg: Q }),
    /* @__PURE__ */ e(ge, { pos: w, svg: $ }),
    /* @__PURE__ */ e(ge, { pos: N, svg: Y })
  ] }) });
}
const Bn = [
  { key: "sahasrara", label: "Sahasrara", color: "#BEABFA" },
  { key: "ajna", label: "Ajna", color: "#70CEF9" },
  { key: "vishuddha", label: "Vishuddha", color: "#7DE5A5" },
  { key: "anahata", label: "Anahata", color: "#F999A8" },
  { key: "manipura", label: "Manipura", color: "#F9B075" },
  { key: "svadhisthana", label: "Svadhisthana", color: "#F8D95A" },
  { key: "muladhara", label: "Muladhara", color: "#F999A8" }
];
function Tn({ chakraMatrix: n, arcana: s, onArcanaClick: l }) {
  const [m, f] = oe(null), N = (w) => {
    f((h) => h === w ? null : w);
  };
  return /* @__PURE__ */ e("div", { className: "space-y-3", children: Bn.map(({ key: w, label: h, color: g }) => {
    const y = n[w];
    if (!y) return null;
    const D = m === w, B = s[y.physical], M = s[y.emotional], j = s[y.spiritual];
    return /* @__PURE__ */ c(
      "div",
      {
        className: "rounded-xl border border-[#e2e8f0] bg-white/60 dark:bg-[#0F172A]/40 overflow-hidden backdrop-blur-sm",
        children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              onClick: () => N(w),
              className: "w-full flex items-center justify-between p-4 text-left",
              children: [
                /* @__PURE__ */ c("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ e("span", { className: "w-3 h-3 rounded-full", style: { backgroundColor: g } }),
                  /* @__PURE__ */ e("span", { className: "font-bold text-sm pastelo-text-main", children: h }),
                  /* @__PURE__ */ e("span", { className: "text-[10px] uppercase tracking-wider pastelo-text-muted font-sans hidden sm:inline", children: y.archetype })
                ] }),
                /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ c("span", { className: "text-xs font-sans font-bold pastelo-text-muted", children: [
                    y.physical,
                    " · ",
                    y.emotional,
                    " · ",
                    y.spiritual
                  ] }),
                  D ? /* @__PURE__ */ e(Ht, { size: 16, className: "text-[#BEABFA]" }) : /* @__PURE__ */ e(Xt, { size: 16, className: "text-[#BEABFA]" })
                ] })
              ]
            }
          ),
          D && /* @__PURE__ */ c("div", { className: "px-4 pb-4 space-y-4 border-t border-[#e2e8f0] pt-4", children: [
            /* @__PURE__ */ c("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ e(
                Ue,
                {
                  value: y.physical,
                  label: "Physique",
                  color: g,
                  arcana: B,
                  onArcanaClick: l
                }
              ),
              /* @__PURE__ */ e(
                Ue,
                {
                  value: y.emotional,
                  label: "Émotionnel",
                  color: g,
                  arcana: M,
                  onArcanaClick: l
                }
              ),
              /* @__PURE__ */ e(
                Ue,
                {
                  value: y.spiritual,
                  label: "Spirituel",
                  color: g,
                  arcana: j,
                  onArcanaClick: l
                }
              )
            ] }),
            B?.health && /* @__PURE__ */ c("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e("h4", { className: "text-xs uppercase tracking-wider font-black pastelo-text-muted", children: "Risques & recommandations - Niveau physique" }),
              /* @__PURE__ */ e(vt, { health: B.health })
            ] }),
            M?.health && /* @__PURE__ */ c("div", { className: "space-y-2", children: [
              /* @__PURE__ */ e("h4", { className: "text-xs uppercase tracking-wider font-black pastelo-text-muted", children: "Risques & recommandations - Niveau émotionnel" }),
              /* @__PURE__ */ e(vt, { health: M.health })
            ] })
          ] })
        ]
      },
      w
    );
  }) });
}
function Ue({ value: n, label: s, color: l, arcana: m, onArcanaClick: f }) {
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: () => f?.(n),
      className: "rounded-lg p-2 text-center w-full transition-transform hover:scale-[1.02]",
      style: { backgroundColor: `${l}18`, border: `1px solid ${l}40` },
      children: [
        /* @__PURE__ */ e("div", { className: "text-lg font-black", style: { color: l }, children: n }),
        /* @__PURE__ */ e("div", { className: "text-[9px] uppercase tracking-wider pastelo-text-muted font-bold", children: s }),
        m && /* @__PURE__ */ e("div", { className: "text-[9px] pastelo-text-main mt-1 truncate px-1", children: m.names?.fr ?? m.names?.en ?? `Arcane ${n}` })
      ]
    }
  );
}
function vt({ health: n }) {
  return /* @__PURE__ */ c("div", { className: "text-xs space-y-2 pastelo-text-muted leading-relaxed", children: [
    n.vulnerable_chakras?.length > 0 && /* @__PURE__ */ c("p", { children: [
      /* @__PURE__ */ e("span", { className: "font-bold", children: "Chakras vulnérables :" }),
      " ",
      n.vulnerable_chakras.join(", ")
    ] }),
    n.physical_risks?.length > 0 && /* @__PURE__ */ e("ul", { className: "list-disc pl-4 space-y-1", children: n.physical_risks.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `p-${l}`)) }),
    n.emotional_risks?.length > 0 && /* @__PURE__ */ e("ul", { className: "list-disc pl-4 space-y-1", children: n.emotional_risks.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `e-${l}`)) }),
    n.recommendations?.length > 0 && /* @__PURE__ */ c("div", { className: "bg-[#dcfce7]/40 dark:bg-[#052D15]/40 rounded-md p-2 border border-[#7DE5A5]/30", children: [
      /* @__PURE__ */ e("span", { className: "font-bold text-[#7DE5A5] block mb-1", children: "Recommandations" }),
      /* @__PURE__ */ e("ul", { className: "list-disc pl-4 space-y-1", children: n.recommendations.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `r-${l}`)) })
    ] })
  ] });
}
const Fn = Ut(function({ yearlyEnergies: s, yearlyForecasts: l }) {
  const m = s.map((f) => ({
    age: f.age,
    energy: f.energy,
    isTurningPoint: f.isKarmicTurningPoint,
    forecast: l[f.energy]?.theme ?? null
  }));
  return /* @__PURE__ */ e("div", { className: "w-full h-72 min-h-[300px] rounded-xl border border-[#e2e8f0] bg-white/60 dark:bg-[#0F172A]/40 p-4 backdrop-blur-sm", children: /* @__PURE__ */ e(Zt, { width: "100%", height: "100%", minHeight: 280, children: /* @__PURE__ */ c(Jt, { data: m, margin: { top: 10, right: 16, left: -20, bottom: 0 }, children: [
    /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ c("linearGradient", { id: "energyGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ e("stop", { offset: "5%", stopColor: "#BEABFA", stopOpacity: 0.5 }),
      /* @__PURE__ */ e("stop", { offset: "95%", stopColor: "#BEABFA", stopOpacity: 0.05 })
    ] }) }),
    /* @__PURE__ */ e(Qt, { strokeDasharray: "3 3", stroke: "#e2e8f0" }),
    /* @__PURE__ */ e(
      en,
      {
        dataKey: "age",
        tick: { fontSize: 11, fill: "#64748b" },
        tickMargin: 8,
        label: { value: "Âge", position: "insideBottom", offset: -4, fill: "#64748b", fontSize: 11 }
      }
    ),
    /* @__PURE__ */ e(
      tn,
      {
        domain: [0, 22],
        tick: { fontSize: 11, fill: "#64748b" },
        allowDecimals: !1
      }
    ),
    /* @__PURE__ */ e(
      nn,
      {
        content: ({ active: f, payload: N }) => {
          if (!f || !N || N.length === 0) return null;
          const w = N[0].payload;
          return /* @__PURE__ */ c("div", { className: "bg-white dark:bg-[#0F172A] border border-[#e2e8f0] rounded-lg p-3 shadow-lg", children: [
            /* @__PURE__ */ c("div", { className: "text-sm font-bold pastelo-text-main", children: [
              "Âge ",
              w.age
            ] }),
            /* @__PURE__ */ c("div", { className: "text-sm", style: { color: "#BEABFA" }, children: [
              "Énergie : ",
              w.energy
            ] }),
            w.forecast && /* @__PURE__ */ e("div", { className: "text-xs pastelo-text-muted mt-1 max-w-[200px]", children: w.forecast }),
            w.isTurningPoint && /* @__PURE__ */ e("div", { className: "text-[10px] uppercase tracking-wider text-[#F999A8] font-bold mt-1", children: "Point karmique" })
          ] });
        }
      }
    ),
    /* @__PURE__ */ e(
      on,
      {
        type: "monotone",
        dataKey: "energy",
        stroke: "#BEABFA",
        strokeWidth: 2,
        fill: "url(#energyGradient)",
        activeDot: { r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#BEABFA" }
      }
    ),
    m.filter((f) => f.isTurningPoint).map((f) => /* @__PURE__ */ e(
      sn,
      {
        x: f.age,
        y: f.energy,
        r: 5,
        fill: "#F999A8",
        stroke: "#ffffff",
        strokeWidth: 2
      },
      `tp-${f.age}`
    ))
  ] }) }) });
}), On = {
  1: "/images/tarot/01-le-bateleur.webp",
  2: "/images/tarot/02-la-papesse.webp",
  3: "/images/tarot/03-l-imperatrice.webp",
  4: "/images/tarot/04-l-empereur.webp",
  5: "/images/tarot/05-le-pape.webp",
  6: "/images/tarot/06-l-amoureux.webp",
  7: "/images/tarot/07-le-chariot.webp",
  8: "/images/tarot/08-la-justice.webp",
  9: "/images/tarot/09-l-hermite.webp",
  10: "/images/tarot/10-la-roue-de-fortune.webp",
  11: "/images/tarot/11-la-force.webp",
  12: "/images/tarot/12-le-pendu.webp",
  13: "/images/tarot/13-l-arcane-sans-nom.webp",
  14: "/images/tarot/14-temperance.webp",
  15: "/images/tarot/15-le-diable.webp",
  16: "/images/tarot/16-la-maison-dieu.webp",
  17: "/images/tarot/17-l-etoile.webp",
  18: "/images/tarot/18-la-lune.webp",
  19: "/images/tarot/19-le-soleil.webp",
  20: "/images/tarot/20-le-jugement.webp",
  21: "/images/tarot/21-le-monde.webp",
  22: "/images/tarot/00-le-mat.webp"
};
function Nt(n) {
  return On[n];
}
function Wn({ selection: n, result: s, library: l = [], onClose: m, drawerRef: f }) {
  if (!n) return null;
  const N = !!n, w = (h) => s?.arcana[h] ?? l.find((g) => g.id === h) ?? null;
  return /* @__PURE__ */ c(Ne, { children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: `fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${N ? "opacity-100" : "opacity-0 pointer-events-none"}`,
        onClick: m
      }
    ),
    /* @__PURE__ */ c(
      "div",
      {
        ref: f,
        className: `fixed top-0 right-0 h-full w-full max-w-md bg-white/95 dark:bg-[#0F172A]/95 border-l border-[#e2e8f0] shadow-2xl z-50 transform transition-transform duration-300 ease-out overflow-y-auto ${N ? "translate-x-0" : "translate-x-full"}`,
        children: [
          /* @__PURE__ */ e("div", { className: "sticky top-0 z-10 flex items-center justify-end p-4 bg-white/90 dark:bg-[#0F172A]/90 border-b border-[#e2e8f0] backdrop-blur-sm", children: /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
              className: "p-2 rounded-full hover:bg-[#BEABFA]/10 text-[#64748b] transition-colors",
              "aria-label": "Fermer",
              children: /* @__PURE__ */ e(Yt, { size: 20 })
            }
          ) }),
          /* @__PURE__ */ e("div", { className: "p-6 pt-2", children: n.type === "arcana" ? /* @__PURE__ */ e(Pn, { arcana: w(n.id) }) : /* @__PURE__ */ e(_n, { program: s?.karmicProgram, arcanas: s?.karmicArcana }) })
        ]
      }
    )
  ] });
}
function Pn({ arcana: n }) {
  if (!n)
    return /* @__PURE__ */ e("div", { className: "pt-8 text-center pastelo-text-muted", children: /* @__PURE__ */ e("p", { className: "text-sm", children: "Aucune interprétation disponible pour cet arcane." }) });
  const s = n.names?.fr ?? n.names?.en ?? `Arcane ${n.id}`, l = Nt(n.id);
  return /* @__PURE__ */ c("div", { className: "space-y-6", children: [
    l && /* @__PURE__ */ e("div", { className: "rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg", children: /* @__PURE__ */ e("img", { src: l, alt: s, className: "w-full aspect-[3/4] object-cover" }) }),
    /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ c("div", { className: "text-[11px] uppercase tracking-widest pastelo-text-muted font-black mb-1", children: [
        "Arcane ",
        n.id
      ] }),
      /* @__PURE__ */ e("h2", { className: "text-2xl font-display font-black pastelo-text-main", children: s }),
      /* @__PURE__ */ c("div", { className: "flex flex-wrap gap-2 mt-2", children: [
        /* @__PURE__ */ e(Re, { label: n.archetype, color: "#BEABFA" }),
        /* @__PURE__ */ e(Re, { label: n.element, color: "#70CEF9" }),
        /* @__PURE__ */ e(Re, { label: n.planet, color: "#F999A8" })
      ] })
    ] }),
    /* @__PURE__ */ e(be, { title: "Description", color: "#BEABFA", children: /* @__PURE__ */ e("p", { className: "text-sm leading-relaxed pastelo-text-muted", children: n.description }) }),
    /* @__PURE__ */ e(Pe, { title: "Manifestation en Plus (+)", items: n.manifestationPlus, color: "#7DE5A5" }),
    /* @__PURE__ */ e(Pe, { title: "Manifestation en Moins (-)", items: n.manifestationMinus, color: "#F999A8" }),
    /* @__PURE__ */ e(Pe, { title: "Tâches karmiques", items: n.karmicTasks, color: "#F9B075" }),
    n.finance && /* @__PURE__ */ e(be, { title: "Finance & Abondance", color: "#7DE5A5", children: /* @__PURE__ */ c("div", { className: "space-y-3 text-sm pastelo-text-muted", children: [
      n.finance.suitable_professions?.length > 0 && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Métiers adaptés :" }),
        " ",
        n.finance.suitable_professions.join(", ")
      ] }),
      n.finance.money_blockers?.length > 0 && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Blocages financiers :" }),
        /* @__PURE__ */ e("ul", { className: "list-disc pl-4 mt-1 space-y-1", children: n.finance.money_blockers.map((m, f) => /* @__PURE__ */ e("li", { children: m }, `b-${f}`)) })
      ] }),
      n.finance.wealth_potential && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Potentiel de richesse :" }),
        " ",
        n.finance.wealth_potential
      ] })
    ] }) }),
    n.relationships && /* @__PURE__ */ e(be, { title: "Relations & Amour", color: "#F999A8", children: /* @__PURE__ */ c("div", { className: "space-y-3 text-sm pastelo-text-muted", children: [
      n.relationships.ideal_partner && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Partenaire idéal :" }),
        " ",
        n.relationships.ideal_partner
      ] }),
      n.relationships.love_strengths?.length > 0 && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Forces relationnelles :" }),
        " ",
        n.relationships.love_strengths.join(", ")
      ] }),
      n.relationships.relationship_traps?.length > 0 && /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ e("span", { className: "font-bold", children: "Pièges relationnels :" }),
        /* @__PURE__ */ e("ul", { className: "list-disc pl-4 mt-1 space-y-1", children: n.relationships.relationship_traps.map((m, f) => /* @__PURE__ */ e("li", { children: m }, `t-${f}`)) })
      ] })
    ] }) }),
    n.health && /* @__PURE__ */ e(be, { title: "Santé & Bien-être", color: "#70CEF9", children: /* @__PURE__ */ e(Dn, { health: n.health }) })
  ] });
}
function _n({
  program: n,
  arcanas: s
}) {
  if (n) {
    const m = n.title?.fr ?? n.title?.en ?? n.id;
    return /* @__PURE__ */ c("div", { className: "space-y-6", children: [
      /* @__PURE__ */ c("div", { children: [
        /* @__PURE__ */ c("div", { className: "text-[11px] uppercase tracking-widest pastelo-text-muted font-black mb-1", children: [
          "Programme Karmique ",
          n.id
        ] }),
        /* @__PURE__ */ e("h2", { className: "text-2xl font-display font-black pastelo-text-main", children: m }),
        /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(Re, { label: `Sévérité : ${n.severity}`, color: "#F9B075" }) })
      ] }),
      /* @__PURE__ */ e(be, { title: "Cause dans les vies antérieures", color: "#BEABFA", children: /* @__PURE__ */ e("p", { className: "text-sm leading-relaxed pastelo-text-muted", children: n.pastLifeCause }) }),
      /* @__PURE__ */ e(be, { title: "Manifestation présente", color: "#F999A8", children: /* @__PURE__ */ e("p", { className: "text-sm leading-relaxed pastelo-text-muted", children: n.presentManifestation }) }),
      /* @__PURE__ */ e(Pe, { title: "Clés de résolution", items: n.resolutionKeys, color: "#7DE5A5" }),
      n.lifeSummary && /* @__PURE__ */ e(be, { title: "Bilan de vie", color: "#BEABFA", children: /* @__PURE__ */ e("p", { className: "text-sm leading-relaxed pastelo-text-muted", children: n.lifeSummary }) }),
      n.relatedChakras?.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-2", children: n.relatedChakras.map((f) => /* @__PURE__ */ e(Re, { label: f, color: "#70CEF9" }, f)) })
    ] });
  }
  const l = s?.filter((m) => m !== null) ?? [];
  return /* @__PURE__ */ c("div", { className: "space-y-6", children: [
    /* @__PURE__ */ c("div", { className: "rounded-xl p-4 border border-[#BEABFA]/20 bg-[#BEABFA]/5", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] uppercase tracking-widest pastelo-text-muted font-black mb-1", children: "Queue karmique" }),
      /* @__PURE__ */ e("h2", { className: "text-2xl font-display font-black pastelo-text-main", children: "K1 · K2 · K3" }),
      /* @__PURE__ */ c("p", { className: "text-sm pastelo-text-muted mt-2 leading-relaxed", children: [
        "La queue karmique révèle les schémas répétitifs hérités d’autres vies.",
        /* @__PURE__ */ e("strong", { className: "text-[#BEABFA]", children: " K1" }),
        " = la racine du schéma,",
        /* @__PURE__ */ e("strong", { className: "text-[#BEABFA]", children: " K2" }),
        " = comment il se réactive,",
        /* @__PURE__ */ e("strong", { className: "text-[#BEABFA]", children: " K3" }),
        " = la clé de sortie."
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs pastelo-text-muted mt-2 italic", children: "Ce programme combiné n’est pas encore dans le corpus. En attendant, lisez les trois énergies individuelles ci-dessous." })
    ] }),
    l.length === 0 ? /* @__PURE__ */ e("div", { className: "text-center pastelo-text-muted text-sm", children: "Aucune interprétation disponible pour cette queue karmique." }) : l.map((m, f) => {
      const N = ["La racine du schéma", "Le déclencheur", "La clé de sortie"][f] ?? `Clé ${f + 1}`, w = Nt(m.id);
      return /* @__PURE__ */ c("div", { className: "rounded-xl overflow-hidden border border-[#BEABFA]/20 bg-white/40 dark:bg-[#0F172A]/30", children: [
        w && /* @__PURE__ */ e("div", { className: "flex justify-center bg-[#BEABFA]/5 p-4", children: /* @__PURE__ */ e("img", { src: w, alt: "", className: "w-32 h-auto rounded-lg shadow-md" }) }),
        /* @__PURE__ */ c("div", { className: "p-4", children: [
          /* @__PURE__ */ c("div", { className: "text-[10px] uppercase tracking-wider pastelo-text-muted font-black mb-1", children: [
            ["K1", "K2", "K3"][f] ?? `K${f + 1}`,
            " - ",
            N
          ] }),
          /* @__PURE__ */ c("h3", { className: "text-lg font-black pastelo-text-main mb-1", children: [
            "Arcane ",
            m.id,
            " · ",
            m.names?.fr ?? m.names?.en ?? `Arcane ${m.id}`
          ] }),
          /* @__PURE__ */ e("p", { className: "text-sm pastelo-text-muted leading-relaxed", children: m.description }),
          m.karmicTasks && m.karmicTasks.length > 0 && /* @__PURE__ */ c("div", { className: "mt-3", children: [
            /* @__PURE__ */ e("span", { className: "text-[10px] uppercase tracking-wider font-bold text-[#F9B075]", children: "Tâche karmique" }),
            /* @__PURE__ */ e("ul", { className: "list-disc pl-4 mt-1 text-sm pastelo-text-muted space-y-1", children: m.karmicTasks.map((h, g) => /* @__PURE__ */ e("li", { children: h }, g)) })
          ] })
        ] })
      ] }, m.id);
    })
  ] });
}
function be({ title: n, color: s, children: l }) {
  return /* @__PURE__ */ c("div", { className: "rounded-xl p-4 border", style: { borderColor: `${s}40`, backgroundColor: `${s}10` }, children: [
    /* @__PURE__ */ e("h3", { className: "text-xs uppercase tracking-widest font-black mb-2", style: { color: s }, children: n }),
    l
  ] });
}
function Pe({ title: n, items: s, color: l }) {
  return !s || s.length === 0 ? null : /* @__PURE__ */ e(be, { title: n, color: l, children: /* @__PURE__ */ e("ul", { className: "list-disc pl-4 space-y-2 text-sm pastelo-text-muted", children: s.map((m, f) => /* @__PURE__ */ e("li", { children: m }, `${n}-${f}`)) }) });
}
function Re({ label: n, color: s }) {
  return n ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full",
      style: { backgroundColor: `${s}20`, color: s },
      children: n
    }
  ) : null;
}
function Dn({ health: n }) {
  return /* @__PURE__ */ c("div", { className: "space-y-3 text-sm pastelo-text-muted", children: [
    n.vulnerable_chakras?.length > 0 && /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ e("span", { className: "font-bold", children: "Chakras vulnérables :" }),
      " ",
      n.vulnerable_chakras.join(", ")
    ] }),
    n.physical_risks?.length > 0 && /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ e("span", { className: "font-bold", children: "Risques physiques :" }),
      /* @__PURE__ */ e("ul", { className: "list-disc pl-4 mt-1 space-y-1", children: n.physical_risks.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `hp-${l}`)) })
    ] }),
    n.emotional_risks?.length > 0 && /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ e("span", { className: "font-bold", children: "Risques émotionnels :" }),
      /* @__PURE__ */ e("ul", { className: "list-disc pl-4 mt-1 space-y-1", children: n.emotional_risks.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `he-${l}`)) })
    ] }),
    n.recommendations?.length > 0 && /* @__PURE__ */ c("div", { className: "bg-white/60 dark:bg-[#0F172A]/40 rounded-lg p-3 border border-[#7DE5A5]/30", children: [
      /* @__PURE__ */ e("span", { className: "font-bold text-[#7DE5A5] block mb-1", children: "Recommandations" }),
      /* @__PURE__ */ e("ul", { className: "list-disc pl-4 space-y-1", children: n.recommendations.map((s, l) => /* @__PURE__ */ e("li", { children: s }, `hr-${l}`)) })
    ] })
  ] });
}
const Oe = {
  octogram: { fr: "Octogramme de naissance", en: "Birth octogram" },
  keys: { fr: "Clés et programme karmique", en: "Keys and karmic program" },
  chakras: { fr: "Grille des 7 chakras", en: "7 chakras grid" },
  yearly: { fr: "Énergies annuelles", en: "Yearly energies" }
};
function We({ title: n }) {
  return /* @__PURE__ */ e(
    "h3",
    {
      style: {
        fontSize: 16,
        fontWeight: 700,
        margin: "0 0 12px",
        color: "var(--pastelo-accent-violet-text)"
      },
      children: n
    }
  );
}
function Ge({
  label: n,
  value: s,
  detail: l,
  accentVar: m,
  onClick: f
}) {
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: f,
      style: {
        textAlign: "left",
        padding: 16,
        borderRadius: "var(--pastelo-radius-panel)",
        border: `2px solid var(${m})`,
        backgroundColor: "var(--pastelo-page-bg)",
        cursor: f ? "pointer" : "default",
        font: "inherit",
        color: "var(--pastelo-text-main)"
      },
      children: [
        /* @__PURE__ */ e("div", { style: { fontSize: 12, color: "var(--pastelo-text-muted)", marginBottom: 4 }, children: n }),
        /* @__PURE__ */ e("div", { style: { fontSize: 22, fontWeight: 800, color: `var(${m})` }, children: s }),
        l && /* @__PURE__ */ e(
          "div",
          {
            style: {
              fontSize: 12,
              color: "var(--pastelo-text-muted)",
              marginTop: 6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            },
            children: l
          }
        )
      ]
    }
  );
}
function Hn({
  data: n,
  library: s = [],
  sections: l = ["octogram", "keys", "chakras", "yearly"],
  theme: m = "auto",
  lang: f = "fr",
  className: N = ""
}) {
  const [w, h] = oe(null), g = m === "auto" ? void 0 : m, { matrix: y, arcana: D, karmicProgram: B } = n, M = (W) => h({ type: "arcana", id: W }), j = (W) => D[W]?.names?.[f] ?? D[W]?.names?.fr ?? "";
  return /* @__PURE__ */ c("div", { className: `pm-widget pm-matrix-grid ${N}`, "data-theme": g, children: [
    /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", gap: 28 }, children: [
      l.includes("octogram") && /* @__PURE__ */ c("section", { "data-section": "octogram", children: [
        /* @__PURE__ */ e(We, { title: Oe.octogram[f] }),
        /* @__PURE__ */ c("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }, children: [
          /* @__PURE__ */ e(
            Rn,
            {
              positions: y.positions,
              onArcanaClick: (W) => M(W)
            }
          ),
          /* @__PURE__ */ e("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, alignContent: "start" }, children: Object.values(y.positions).map((W) => /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              onClick: () => M(W.value),
              style: {
                padding: "8px 10px",
                borderRadius: "var(--pastelo-radius)",
                border: "1px solid var(--pastelo-med-violet)",
                backgroundColor: "var(--pastelo-bg-violet)",
                cursor: "pointer",
                font: "inherit",
                textAlign: "left",
                color: "var(--pastelo-text-main)"
              },
              children: [
                /* @__PURE__ */ e("div", { style: { fontSize: 11, color: "var(--pastelo-text-muted)" }, children: W.name }),
                /* @__PURE__ */ c("div", { style: { fontSize: 15, fontWeight: 700 }, children: [
                  W.value,
                  " · ",
                  j(W.value)
                ] })
              ]
            },
            W.label
          )) })
        ] })
      ] }),
      l.includes("keys") && /* @__PURE__ */ c("section", { "data-section": "keys", children: [
        /* @__PURE__ */ e(We, { title: Oe.keys[f] }),
        /* @__PURE__ */ c("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }, children: [
          /* @__PURE__ */ e(
            Ge,
            {
              label: f === "fr" ? "Clé Cœur" : "Heart Key",
              value: String(y.heartKey),
              detail: j(y.heartKey),
              accentVar: "--pastelo-acc-rose",
              onClick: () => M(y.heartKey)
            }
          ),
          /* @__PURE__ */ e(
            Ge,
            {
              label: f === "fr" ? "Clé Portefeuille" : "Wallet Key",
              value: String(y.walletKey),
              detail: j(y.walletKey),
              accentVar: "--pastelo-acc-vert",
              onClick: () => M(y.walletKey)
            }
          ),
          /* @__PURE__ */ e(
            Ge,
            {
              label: f === "fr" ? "Queue karmique" : "Karmic tail",
              value: `${y.karmicTail.k1}-${y.karmicTail.k2}-${y.karmicTail.k3}`,
              detail: B ? B.title[f] ?? B.title.fr : void 0,
              accentVar: "--pastelo-acc-violet",
              onClick: () => h({ type: "karmic" })
            }
          )
        ] })
      ] }),
      l.includes("chakras") && /* @__PURE__ */ c("section", { "data-section": "chakras", children: [
        /* @__PURE__ */ e(We, { title: Oe.chakras[f] }),
        /* @__PURE__ */ e(
          Tn,
          {
            chakraMatrix: y.chakraMatrix,
            arcana: D,
            onArcanaClick: (W) => M(W)
          }
        )
      ] }),
      l.includes("yearly") && /* @__PURE__ */ c("section", { "data-section": "yearly", children: [
        /* @__PURE__ */ e(We, { title: Oe.yearly[f] }),
        /* @__PURE__ */ e(
          Fn,
          {
            yearlyEnergies: y.yearlyEnergies,
            yearlyForecasts: n.yearlyForecasts
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e(
      Wn,
      {
        selection: w,
        result: n,
        library: s,
        onClose: () => h(null)
      }
    )
  ] });
}
export {
  Un as PayloadViewer,
  Hn as PsychomanticMatrixGrid,
  Gn as PsychomanticNatalChart
};
