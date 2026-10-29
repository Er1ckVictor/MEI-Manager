"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Promo = { active: boolean; price: string; de: string; por: string };
const Ctx = createContext<Promo>({ active: false, price: "", de: "", por: "" });

/**
 * Controla a troca automática da oferta na página: até `end` mostra o preço
 * promocional; depois, o preço normal. A troca acontece na hora, sem recarregar.
 */
export function PromoProvider({ end, de, por, initialActive, children }: {
  end: string; de: string; por: string; initialActive: boolean; children: React.ReactNode;
}) {
  const [active, setActive] = useState(initialActive);

  useEffect(() => {
    const t = Date.parse(end);
    if (!Number.isFinite(t)) { setActive(false); return; }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      const rest = t - Date.now();
      setActive(rest > 0);
      // setTimeout aceita no máximo ~24,8 dias: reagenda até chegar o prazo
      if (rest > 0) timer = setTimeout(check, Math.min(rest + 50, 2 ** 31 - 1));
    };
    check();
    return () => clearTimeout(timer);
  }, [end]);

  return <Ctx.Provider value={{ active, price: active ? por : de, de, por }}>{children}</Ctx.Provider>;
}

export const usePromo = () => useContext(Ctx);

/** Preço vigente (promocional ou normal). */
export function Price() {
  return <>{usePromo().price}</>;
}

/** Mostra o conteúdo só durante a promoção. */
export function IfPromo({ children }: { children: React.ReactNode }) {
  return usePromo().active ? <>{children}</> : null;
}

/** Mostra o conteúdo só depois que a promoção acaba. */
export function IfNotPromo({ children }: { children: React.ReactNode }) {
  return usePromo().active ? null : <>{children}</>;
}
