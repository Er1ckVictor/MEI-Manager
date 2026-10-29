"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Depth = "far" | "mid" | "near";
type Item = {
  data: string;
  t: string;
  conta: "Negócio" | "Pessoal";
  v: number; // positivo = entrada, negativo = saída
  cx: number; cy: number; // posição no "Antes" (% da caixa)
  z: Depth; // camada de profundidade
};

/** Lançamentos de exemplo de uma confeitaria fictícia (fevereiro). */
const ITEMS: Item[] = [
  { data: "03/02", t: "Venda de bolos", conta: "Negócio", v: 850, cx: 6, cy: 7, z: "far" },
  { data: "04/02", t: "Mercado da semana", conta: "Pessoal", v: -320, cx: 63, cy: 6, z: "mid" },
  { data: "05/02", t: "Farinha e chocolate", conta: "Negócio", v: -230, cx: 35, cy: 3, z: "far" },
  { data: "06/02", t: "Streaming", conta: "Pessoal", v: -55.9, cx: 3, cy: 31, z: "near" },
  { data: "08/02", t: "Encomenda de doces", conta: "Negócio", v: 1200, cx: 66, cy: 27, z: "far" },
  { data: "09/02", t: "Embalagens", conta: "Negócio", v: -140, cx: 8, cy: 46, z: "mid" },
  { data: "10/02", t: "Aluguel de casa", conta: "Pessoal", v: -1100, cx: 62, cy: 40, z: "near" },
  { data: "12/02", t: "Taxa da maquininha", conta: "Negócio", v: -62, cx: 4, cy: 79, z: "far" },
  { data: "14/02", t: "Farmácia", conta: "Pessoal", v: -89.5, cx: 61, cy: 80, z: "mid" },
  { data: "15/02", t: "Anúncio no Instagram", conta: "Negócio", v: -100, cx: 35, cy: 84, z: "near" },
  { data: "18/02", t: "Bolo de casamento", conta: "Negócio", v: 2400, cx: 41, cy: 72, z: "mid" },
  { data: "20/02", t: "DAS do mês", conta: "Negócio", v: -86.05, cx: 38, cy: 17, z: "near" }
];

const sum = (f: (i: Item) => boolean) => ITEMS.filter(f).reduce((a, i) => a + i.v, 0);
const ENTRADAS = sum((i) => i.v > 0);
const SAIDAS_NEG = -sum((i) => i.v < 0 && i.conta === "Negócio");
const PESSOAL = -sum((i) => i.conta === "Pessoal");
const SALDO = ENTRADAS - SAIDAS_NEG - PESSOAL;

const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (v: number) => (v > 0 ? "+ R$ " : "− R$ ") + fmt(Math.abs(v));

const SUMMARY = [
  { k: "in", label: "Entradas", value: ENTRADAS },
  { k: "out", label: "Saídas do negócio", value: SAIDAS_NEG },
  { k: "pes", label: "Gastos pessoais", value: PESSOAL },
  { k: "saldo", label: "Saldo disponível", value: SALDO }
] as const;

type Phase = "chaos" | "absorb" | "sheet";
const STAGGER = 140; // ms entre um item e outro entrando no ícone
const ABSORB_MS = ITEMS.length * STAGGER + 1100;

function useCountUp(target: number, run: boolean, delay: number) {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    setV(0);
    let raf = 0, t0 = 0;
    const timer = setTimeout(() => {
      const tick = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / 1100);
        setV(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [run, target, delay]);
  return v;
}

function SummaryCard({ k, label, value, run, i }: { k: string; label: string; value: number; run: boolean; i: number }) {
  const v = useCountUp(value, run, 1000 + i * 150);
  return (
    <div className={"mix-sum s-" + k} style={{ ["--i" as string]: i }}>
      <small>{label}</small>
      <b>R$ {fmt(v)}</b>
    </div>
  );
}

function Person() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A3038" />
          <stop offset="1" stopColor="#1A1E24" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#pg)" />
      <circle cx="60" cy="46" r="19" fill="#C9CED4" />
      <path d="M24 104c4-20 18-31 36-31s32 11 36 31" fill="#C9CED4" />
    </svg>
  );
}

export default function ChaosToOrder() {
  const [phase, setPhase] = useState<Phase>("sheet");
  const [run, setRun] = useState(0);
  const [instant, setInstant] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const organize = useCallback(() => {
    clear();
    if (reduce()) { setPhase("sheet"); setRun((r) => r + 1); return; }
    setPhase("absorb");
    timers.current.push(setTimeout(() => { setPhase("sheet"); setRun((r) => r + 1); }, ABSORB_MS));
  }, []);

  const mess = () => { clear(); setPhase("chaos"); };

  // Ao chegar na seção: mostra o "Antes" e, depois de um instante, organiza.
  useEffect(() => {
    const el = box.current;
    if (!el || reduce()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.75) return;
    setInstant(true);
    setPhase("chaos");
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    const io = new IntersectionObserver(
      (en) => {
        if (en[0].isIntersecting) {
          timers.current.push(setTimeout(organize, 2200));
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); clear(); cancelAnimationFrame(raf); };
  }, [organize]);

  // Efeito de profundidade: as camadas acompanham o mouse em velocidades diferentes.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "chaos" || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

  return (
    <div className="mix reveal">
      <div className="mix-toggle" role="group" aria-label="Ver antes ou depois da planilha">
        <button type="button" aria-pressed={phase === "chaos"} onClick={mess}>Antes: tudo misturado</button>
        <button type="button" aria-pressed={phase !== "chaos"} onClick={organize}>Depois: com a planilha</button>
      </div>

      <div
        ref={box}
        className={`mix-box p-${phase}` + (instant ? " instant" : "")}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {/* a pessoa */}
        <div className="mix-user">
          <div className="mix-avatar"><Person /><span className="mix-badge" aria-hidden="true">✓</span></div>
          <div className="mix-says">
            <p className="mix-say say-chaos">Cadê o meu lucro?</p>
            <p className="mix-say say-absorb">Organizando tudo…</p>
            <p className="mix-say say-order">Agora eu sei para onde vai cada real.</p>
          </div>
        </div>

        {/* ícone que recebe os lançamentos e depois vira a planilha */}
        <div className="mix-doc" aria-hidden={phase !== "sheet"}>
          <svg className="doc-ico" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2.5" />
            <path d="M3 9h18M3 15h18M9 3v18" />
          </svg>
          <div className="doc-table">
            <div className="doc-bar">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>
              Planilha MEI no Controle · Lançamentos de fevereiro
            </div>
            <div className="doc-tr doc-head"><span className="cd">Data</span><span className="ct">Descrição</span><span className="cc">Conta</span><span className="cv">Valor</span></div>
            {ITEMS.map((it, i) => (
              <div key={it.t} className={"doc-tr " + (it.v > 0 ? "in" : "out") + (i % 2 ? " odd" : "")} style={{ ["--i" as string]: i }}>
                <span className="cd">{it.data}</span>
                <span className="ct">{it.t}</span>
                <span className={"cc tag " + (it.conta === "Negócio" ? "neg" : "pes")}>{it.conta}</span>
                <b className="cv">{money(it.v)}</b>
              </div>
            ))}
          </div>
        </div>
        <p className="mix-doc-label" aria-hidden="true">Organizando lançamentos</p>

        {/* os lançamentos soltos, em camadas de profundidade */}
        {ITEMS.map((it, i) => (
          <div
            key={it.t}
            className={"mix-row z-" + it.z + " " + (it.v > 0 ? "in" : "out")}
            style={{
              ["--cx" as string]: it.cx + "%",
              ["--cy" as string]: it.cy + "%",
              ["--d" as string]: i * STAGGER + "ms",
              ["--f" as string]: (i % 5) * 0.6 + "s"
            }}
            aria-hidden={phase !== "chaos"}
          >
            <div className="mix-chip">
              <span className="ct">{it.t}</span>
              <b className="cv">{money(it.v)}</b>
            </div>
          </div>
        ))}

        {/* resumo */}
        <div className="mix-summary" aria-live="polite">
          {SUMMARY.map((s, i) => (
            <SummaryCard key={s.k} k={s.k} label={s.label} value={s.value} run={phase === "sheet" && run > 0} i={i} />
          ))}
        </div>
      </div>
      <p className="mix-note">Exemplo com dados fictícios. Entradas: R$ {fmt(ENTRADAS)} · Lucro do negócio: R$ {fmt(ENTRADAS - SAIDAS_NEG)} · Saldo após gastos pessoais: R$ {fmt(SALDO)}.</p>
    </div>
  );
}
