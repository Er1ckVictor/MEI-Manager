"use client";

import { useEffect, useState } from "react";
import BuyLink from "./BuyLink";
import { usePromo } from "./Promo";

/** Barra fixa de compra no celular: aparece depois do topo e some na seção da oferta. */
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const { active, de, price } = usePromo();

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const offer = document.getElementById("oferta");
    let offerVisible = false;
    const update = () => setShow(!!hero && window.scrollY > hero.offsetHeight * 0.75 && !offerVisible);
    const io = new IntersectionObserver((en) => { offerVisible = en[0].isIntersecting; update(); }, { threshold: 0.15 });
    if (offer) io.observe(offer);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { io.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  return (
    <div className={"mbar" + (show ? " show" : "")} aria-hidden={!show}>
      <div>{active && <s>R$ {de}</s>}<b>R$ {price}</b></div>
      <BuyLink tabIndex={show ? 0 : -1} price={price}>Comprar agora</BuyLink>
    </div>
  );
}
