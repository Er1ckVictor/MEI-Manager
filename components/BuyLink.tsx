"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  tabIndex?: number;
  price?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Botão de compra. Leva para /comprar, que redireciona ao checkout
 * configurado em CHECKOUT_URL, repassando os parâmetros de campanha (UTM).
 */
export default function BuyLink({ className = "btn btn-primary", children, tabIndex, price }: Props) {
  const [href, setHref] = useState("/comprar");

  useEffect(() => {
    if (window.location.search) setHref("/comprar" + window.location.search);
  }, []);

  const track = () => {
    window.fbq?.("track", "InitiateCheckout");
    window.gtag?.("event", "begin_checkout", { currency: "BRL", value: Number(price) || 0 });
  };

  return (
    <a className={className} href={href} onClick={track} tabIndex={tabIndex} rel="nofollow">
      {children}
    </a>
  );
}
