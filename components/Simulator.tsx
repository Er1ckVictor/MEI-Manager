"use client";

import { useState } from "react";
import Icon from "./Icon";

const LIMITE = 81000;
const MIN = 500;
const MAX = 10000;
const brl = (n: number) => Math.round(n).toLocaleString("pt-BR");

export default function Simulator() {
  const [fat, setFat] = useState(4500);
  const ano = fat * 12;
  const pct = ano / LIMITE;

  let state: "ok" | "warn" | "bad" = "ok";
  let color = "var(--ok)";
  let msg = "Dentro do limite, com folga para crescer.";
  if (pct > 1.2) {
    state = "bad"; color = "var(--bad)";
    msg = "Mais de 20% acima do limite: o desenquadramento é retroativo. Procure um contador.";
  } else if (pct > 1) {
    state = "bad"; color = "var(--bad)";
    msg = "Acima do limite anual. Converse com um contador sobre o desenquadramento.";
  } else if (pct >= 0.8) {
    state = "warn"; color = "var(--warn)";
    msg = "Atenção: acima de 80% do limite. Acompanhe mês a mês.";
  }

  return (
    <div className="sim-panel">
      <label htmlFor="fat">Qual é o seu faturamento médio por mês?</label>
      <div className="sim-value" aria-live="polite">
        R$ {brl(fat)}<small> / mês</small>
      </div>
      <input
        className="range"
        id="fat"
        type="range"
        min={MIN}
        max={MAX}
        step={250}
        value={fat}
        onChange={(e) => setFat(Number(e.target.value))}
        aria-describedby="sim-msg"
        aria-valuetext={`R$ ${brl(fat)} por mês`}
        style={{ ["--fill" as string]: ((fat - MIN) / (MAX - MIN)) * 100 + "%" }}
      />
      <div className="scale" aria-hidden="true"><span>R$ 500</span><span>R$ 10.000</span></div>
      <div className="meter" aria-hidden="true">
        <div className="meter-fill" style={{ width: Math.min(100, pct * 100) + "%", background: color }} />
        <span className="meter-mark" title="80% do limite" />
      </div>
      <div className="kpis">
        <div className="kpi"><small>Projeção anual</small><b>R$ {brl(ano)}</b></div>
        <div className="kpi"><small>Do limite anual</small><b>{(pct * 100).toFixed(1).replace(".", ",")}%</b></div>
        <div className="kpi"><small>Margem por mês</small><b>R$ {brl(Math.max(0, LIMITE / 12 - fat))}</b></div>
      </div>
      <p className="verdict" id="sim-msg" data-s={state}>
        <Icon name="info" />
        <span>{msg}</span>
      </p>
    </div>
  );
}
