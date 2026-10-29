/**
 * Painel de demonstração com dados fictícios de uma confeitaria.
 * Gráficos em SVG desenhados em escala; as animações (barras subindo, linha
 * sendo desenhada, rosca preenchendo) acontecem quando a seção entra na tela.
 */

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const FAT = [2050, 4050, 3800, 4300, 4700, 5100, 4900, 5400, 5800, 6100, 6500, 7200];
const DESP = [478, 836, 820, 900, 980, 1050, 1010, 1120, 1190, 1240, 1310, 1450];
const LIMITE = 81000;

const CATS = [
  { nome: "Insumos", pct: 52, cor: "var(--accent)" },
  { nome: "Embalagens", pct: 14, cor: "var(--teal)" },
  { nome: "Taxas de cartão", pct: 10, cor: "#9B8CFF" },
  { nome: "Marketing", pct: 9, cor: "var(--ok)" },
  { nome: "DAS", pct: 8, cor: "var(--warn)" },
  { nome: "Outros", pct: 7, cor: "#7C8590" }
];

const brl = (n: number) => n.toLocaleString("pt-BR");
const totalFat = FAT.reduce((a, b) => a + b, 0);
const totalDesp = DESP.reduce((a, b) => a + b, 0);
const lucro = totalFat - totalDesp;
const usoLimite = Math.round((totalFat / LIMITE) * 100);

function BarChart() {
  const W = 640, H = 260, L = 48, R = 8, T = 14, B = 30;
  const pw = W - L - R, ph = H - T - B, max = 8000;
  const y = (v: number) => T + ph - (v / max) * ph;
  const gw = pw / 12, bw = 15, gap = 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" role="img"
      aria-label={`Faturamento e despesas por mês. Faturamento cresce de R$ ${brl(FAT[0])} em janeiro para R$ ${brl(FAT[11])} em dezembro.`}>
      {[0, 2000, 4000, 6000, 8000].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="grid-line" />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" className="axis axis-y">{v === 0 ? "0" : `${v / 1000} mil`}</text>
        </g>
      ))}
      {MESES.map((m, i) => {
        const x0 = L + i * gw + (gw - (bw * 2 + gap)) / 2;
        return (
          <g key={m} className="bar-g" style={{ ["--i" as string]: i }}>
            <title>{`${m}: faturamento R$ ${brl(FAT[i])}, despesas R$ ${brl(DESP[i])}`}</title>
            <rect x={L + i * gw} y={T} width={gw} height={ph} className="bar-hit" />
            <rect x={x0} y={y(FAT[i])} width={bw} height={T + ph - y(FAT[i])} rx="3" className="bar bar-fat" />
            <rect x={x0 + bw + gap} y={y(DESP[i])} width={bw} height={T + ph - y(DESP[i])} rx="3" className="bar bar-desp" />
            <text x={x0 + bw} y={y(FAT[i]) - 7} textAnchor="middle" className="bar-tip">{`${(FAT[i] / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mil`}</text>
            <text x={L + i * gw + gw / 2} y={H - 9} textAnchor="middle" className={"axis" + (i % 2 ? " axis-odd" : "")}>{m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LimitChart() {
  const W = 1000, H = 260, L = 56, R = 130, T = 18, B = 30;
  const pw = W - L - R, ph = H - T - B, max = 90000;
  const acc = FAT.reduce<number[]>((a, v) => [...a, (a[a.length - 1] ?? 0) + v], []);
  const x = (i: number) => L + (i / 11) * pw;
  const y = (v: number) => T + ph - (v / max) * ph;
  const pts = acc.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `M${x(0)},${y(0)} L${pts.replace(/ /g, " L")} L${x(11)},${y(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg limit-svg" role="img"
      aria-label={`Faturamento acumulado no ano chega a R$ ${brl(totalFat)}, ${usoLimite}% do limite de R$ 81 mil.`}>
      <defs>
        <linearGradient id="accFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 30000, 60000, 90000].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="grid-line" />
          <text x={L - 8} y={y(v) + 4} textAnchor="end" className="axis axis-y">{v === 0 ? "0" : `${v / 1000} mil`}</text>
        </g>
      ))}
      <line x1={L} x2={W - R} y1={y(LIMITE)} y2={y(LIMITE)} className="limit-line" />
      <text x={W - R + 10} y={y(LIMITE) - 4} className="axis limit-label">Limite</text>
      <text x={W - R + 10} y={y(LIMITE) + 12} className="axis limit-label">R$ 81 mil</text>
      <path d={area} fill="url(#accFill)" className="acc-area" />
      <polyline points={pts} pathLength={1} className="acc-line" />
      <circle cx={x(11)} cy={y(acc[11])} r="6" className="acc-dot" />
      <text x={x(11) + 12} y={y(acc[11]) + 5} className="acc-end">R$ {brl(acc[11])}</text>
      {MESES.map((m, i) => (i % 2 === 0 ? <text key={m} x={x(i)} y={H - 8} textAnchor="middle" className="axis">{m}</text> : null))}
    </svg>
  );
}

function Donut() {
  let start = 0;
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 120 120" className="donut" role="img" aria-label="Despesas por categoria: insumos 52%, embalagens 14%, taxas 10%, marketing 9%, DAS 8%, outros 7%.">
        <circle cx="60" cy="60" r="44" className="donut-track" pathLength={100} />
        {CATS.map((c, i) => {
          const el = (
            <circle key={c.nome} cx="60" cy="60" r="44" pathLength={100} className="donut-seg"
              style={{ stroke: c.cor, ["--len" as string]: c.pct - 0.8, ["--off" as string]: -start, ["--i" as string]: i }} />
          );
          start += c.pct;
          return el;
        })}
        <text x="60" y="57" textAnchor="middle" className="donut-n">R$ {brl(totalDesp)}</text>
        <text x="60" y="72" textAnchor="middle" className="donut-l">despesas no ano</text>
      </svg>
      <ul className="legend">
        {CATS.map((c) => (
          <li key={c.nome}><i style={{ background: c.cor }} />{c.nome}<b>{c.pct}%</b></li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardDemo() {
  return (
    <div className="demo reveal">
      <div className="demo-bar" aria-hidden="true">
        <div className="dots"><i /><i /><i /></div>
        <span>Painel · Confeitaria Doce Ponto · 2027</span>
        <span className="live-dot"><i />ao vivo</span>
      </div>
      <div className="demo-body">
        <div className="kpi-row">
          <div className="dk">
            <small>Faturamento no ano</small>
            <strong>R$ <span data-count={totalFat} data-sep="">{brl(totalFat)}</span></strong>
            <em className="up">▲ 251% de jan a dez</em>
          </div>
          <div className="dk">
            <small>Lucro do negócio</small>
            <strong>R$ <span data-count={lucro} data-sep="">{brl(lucro)}</span></strong>
            <em className="up">{Math.round((lucro / totalFat) * 100)}% do faturamento</em>
          </div>
          <div className="dk">
            <small>Média por mês</small>
            <strong>R$ <span data-count={Math.round(totalFat / 12)} data-sep="">{brl(Math.round(totalFat / 12))}</span></strong>
            <em>meta: R$ 5.000</em>
          </div>
          <div className="dk dk-ring">
            <svg viewBox="0 0 64 64" className="ring" aria-hidden="true">
              <circle cx="32" cy="32" r="26" pathLength={100} className="ring-track" />
              <circle cx="32" cy="32" r="26" pathLength={100} className="ring-fill" style={{ ["--len" as string]: usoLimite }} />
            </svg>
            <div>
              <small>Limite do MEI usado</small>
              <strong><span data-count={usoLimite}>{usoLimite}</span>%</strong>
              <em className="ok-t">dentro do limite</em>
            </div>
          </div>
        </div>
        <div className="chart-row">
          <figure className="chart-card wide">
            <figcaption>
              <span>Faturamento x despesas</span>
              <span className="keys"><i className="k-fat" />Faturamento <i className="k-desp" />Despesas</span>
            </figcaption>
            <BarChart />
          </figure>
          <figure className="chart-card">
            <figcaption><span>Para onde vai o dinheiro</span></figcaption>
            <Donut />
          </figure>
        </div>
        <figure className="chart-card">
          <figcaption>
            <span>Faturamento acumulado x limite do MEI</span>
            <span className="keys"><i className="k-fat" />Acumulado <i className="k-lim" />Limite</span>
          </figcaption>
          <LimitChart />
        </figure>
      </div>
      <p className="demo-note">Exemplo com dados fictícios. Na planilha, os gráficos são montados automaticamente com os seus lançamentos.</p>
    </div>
  );
}
