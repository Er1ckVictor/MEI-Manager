import { NextResponse, type NextRequest } from "next/server";
import { promoAtiva } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Parâmetros de campanha repassados ao checkout. */
const PASS = /^(utm_[a-z_]+|src|sck|xcod|fbclid|gclid|ttclid)$/i;
const valid = (u?: string) => (u && /^https:\/\//i.test(u.trim()) ? u.trim() : "");

/**
 * GET /comprar
 * Até o fim da oferta (NEXT_PUBLIC_FIM_OFERTA) leva para CHECKOUT_URL_PROMO.
 * Depois, leva para CHECKOUT_URL. Se um dos dois não estiver preenchido, usa o outro.
 * Os parâmetros de campanha (UTM) são repassados ao checkout.
 */
export function GET(req: NextRequest) {
  const promo = valid(process.env.CHECKOUT_URL_PROMO);
  const normal = valid(process.env.CHECKOUT_URL);
  const raw = promoAtiva() ? promo || normal : normal || promo;

  if (!raw) return NextResponse.redirect(new URL("/#oferta", req.url), 307);

  const dest = new URL(raw);
  req.nextUrl.searchParams.forEach((value, key) => {
    if (PASS.test(key) && !dest.searchParams.has(key)) dest.searchParams.set(key, value);
  });
  const res = NextResponse.redirect(dest, 307);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
