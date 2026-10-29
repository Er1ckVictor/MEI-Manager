"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import BuyLink from "./BuyLink";

export default function Header({ price }: { price: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"top" + (scrolled ? " scrolled" : "")} id="topo">
      <div className="wrap">
        <a className="brand" href="#topo" aria-label="MEI no Controle, voltar ao início">
          <span className="brand-mark" style={{ color: "var(--accent)" }}>
            <Icon name="chart" size={18} strokeWidth={2.4} />
          </span>
          MEI no Controle
        </a>
        <nav className="nav" aria-label="Seções da página">
          <a href="#recursos">Recursos</a>
          <a href="#simulador">Simulador</a>
          <a href="#oferta">Preço</a>
          <a href="#duvidas">Dúvidas</a>
          <BuyLink price={price}>Comprar</BuyLink>
        </nav>
      </div>
      <span className="progress" aria-hidden="true" style={{ ["--p" as string]: progress }} />
    </header>
  );
}
