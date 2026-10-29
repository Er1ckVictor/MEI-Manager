"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ end }: { end: string }) {
  const target = Date.parse(end);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (Number.isNaN(target)) return null;
  const left = now === null ? null : Math.max(0, target - now);
  if (left === 0) return <p className="ended">A condição de Black Friday foi encerrada.</p>;

  const s = left === null ? 0 : Math.floor(left / 1000);
  const parts = [
    { v: left === null ? "--" : pad(Math.floor(s / 86400)), l: "dias" },
    { v: left === null ? "--" : pad(Math.floor((s % 86400) / 3600)), l: "horas" },
    { v: left === null ? "--" : pad(Math.floor((s % 3600) / 60)), l: "min" },
    { v: left === null ? "--" : pad(s % 60), l: "seg" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      <span className="muted" style={{ fontSize: 14 }}>A condição especial termina em</span>
      <div className="clock" role="timer" aria-label="Tempo restante da condição especial">
        {parts.map((p) => (
          <div key={p.l}><b>{p.v}</b><small>{p.l}</small></div>
        ))}
      </div>
    </div>
  );
}
