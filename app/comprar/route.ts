import { NextResponse, type NextRequest } from "next/server";
import { promoAtiva, site } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Parâmetros de campanha repassados ao checkout. */
const PASS = /^(utm_[a-z_]+|src|sck|xcod|fbclid|gclid|ttclid)$/i;
const valid = (u?: string) => (u && /^https:\/\//i.test(u.trim()) ? u.trim() : "");

/**
 * GET /comprar
 * Até o fim da oferta (NEXT_PUBLIC_FIM_OFERTA) leva para CHECKOUT_URL_PROMO.
 * Depois, leva para CHECKOUT_URL. Se um dos dois não estiver preenchido, usa o outro.
 * Os parâmetros de campanha (UTM) são repassados ao checkout.
 *
 * GET /comprar?teste  -> mostra a configuração atual, sem redirecionar.
 */
export function GET(req: NextRequest) {
  const promo = valid(process.env.CHECKOUT_URL_PROMO);
  const normal = valid(process.env.CHECKOUT_URL);
  const ativa = promoAtiva();
  const raw = ativa ? promo || normal : normal || promo;

  if (req.nextUrl.searchParams.has("teste")) {
    const ok = Boolean(raw);
    const describe = (v: string, name: string) =>
      v || (process.env[name] ? "inválido: precisa começar com https://" : "não definido");
    return NextResponse.json(
      {
        status: ok ? "OK: os botões levam para o checkout" : "ERRO: nenhum link de checkout configurado",
        ofertaAtiva: ativa,
        fimOferta: site.fimOferta,
        destinoAgora: raw || "(nenhum: os botões voltam para a seção de preço)",
        CHECKOUT_URL_PROMO: describe(promo, "CHECKOUT_URL_PROMO"),
        CHECKOUT_URL: describe(normal, "CHECKOUT_URL"),
        ...(ok
          ? {}
          : {
              dica:
                "Na Vercel: Settings > Environment Variables (marque Production) e depois Deployments > Redeploy. " +
                "No computador: crie o arquivo .env.local na raiz do projeto e reinicie o npm run dev."
            })
      },
      { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
    );
  }

  if (!raw) {
    console.error("[/comprar] Nenhum link de checkout configurado. Defina CHECKOUT_URL_PROMO e/ou CHECKOUT_URL.");
    return NextResponse.redirect(new URL("/#oferta", req.url), 307);
  }

  const dest = new URL(raw);
  req.nextUrl.searchParams.forEach((value, key) => {
    if (PASS.test(key) && !dest.searchParams.has(key)) dest.searchParams.set(key, value);
  });
  const res = NextResponse.redirect(dest, 307);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
