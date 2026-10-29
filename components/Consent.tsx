"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "mei_consent";
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* sem armazenamento */ } };

/**
 * Medição opcional (Google Analytics e Pixel da Meta), carregada só depois
 * do consentimento do visitante, conforme a LGPD.
 */
export default function Consent({ gaId, pixelId }: { gaId: string; pixelId: string }) {
  const [choice, setChoice] = useState<string | null | undefined>(undefined);
  const enabled = Boolean(gaId || pixelId);

  useEffect(() => { if (enabled) setChoice(read()); }, [enabled]);

  if (!enabled || choice === undefined) return null;

  if (choice === "yes") {
    return (
      <>
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
            </Script>
          </>
        )}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixelId)});fbq('track','PageView');`}
          </Script>
        )}
      </>
    );
  }
  if (choice === "no") return null;

  return (
    <div className="consent" role="dialog" aria-label="Aviso de cookies">
      <p>
        Usamos cookies de medição para entender como os visitantes chegam ao site e melhorar a sua experiência.{" "}
        <a href="/politica-de-privacidade">Saiba mais</a>
      </p>
      <div>
        <button className="btn btn-primary" type="button" onClick={() => { write("yes"); setChoice("yes"); }}>Aceitar</button>
        <button className="btn btn-ghost" type="button" onClick={() => { write("no"); setChoice("no"); }}>Recusar</button>
      </div>
    </div>
  );
}
