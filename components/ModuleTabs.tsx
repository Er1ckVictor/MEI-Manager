"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Icon from "./Icon";
import { modules } from "@/lib/content";

export default function ModuleTabs() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const m = modules[sel];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : modules.length - 1)) % modules.length;
    setSel(n);
    tabs.current[n]?.focus();
  };

  return (
    <>
      <div className="tabs reveal" role="tablist" aria-label="Módulos da planilha">
        {modules.map((mod, i) => (
          <button
            key={mod.label}
            ref={(el) => { tabs.current[i] = el; }}
            className="tab"
            role="tab"
            id={`tab-${i}`}
            aria-selected={i === sel}
            aria-controls="painel-mod"
            tabIndex={i === sel ? 0 : -1}
            onClick={() => setSel(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {mod.label}
          </button>
        ))}
      </div>
      <div className="panel reveal" id="painel-mod" role="tabpanel" aria-labelledby={`tab-${sel}`}>
        <div className="panel-copy fade" key={"c" + sel}>
          <h3>{m.title}</h3>
          <ul className="checks">
            {m.items.map((t) => (
              <li key={t}><Icon name="check" strokeWidth={2.6} /><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="shot fade" key={"i" + sel}>
          <Image src={m.img} width={m.w} height={m.h} alt={m.alt} sizes="(max-width: 900px) 100vw, 680px" />
        </div>
      </div>
    </>
  );
}
