/**
 * Configuração central do site.
 * Os valores vêm das variáveis de ambiente (Vercel > Settings > Environment Variables).
 * Os textos entre colchetes aparecem quando a variável ainda não foi preenchida.
 */
const env = (key: string, fallback: string) => {
  const v = process.env[key];
  return v && v.trim() !== "" ? v.trim() : fallback;
};

export const site = {
  name: "MEI no Controle",
  product: "MEI no Controle: Planilha Financeira 2027",
  url: env("NEXT_PUBLIC_SITE_URL", "https://www.seudominio.com.br").replace(/\/$/, ""),
  precoDe: env("NEXT_PUBLIC_PRECO_DE", "67"),
  precoPor: env("NEXT_PUBLIC_PRECO_POR", "47"),
  fimOferta: env("NEXT_PUBLIC_FIM_OFERTA", "2026-11-30T23:59:59-03:00"),
  empresa: env("NEXT_PUBLIC_EMPRESA", "[Seu nome ou razão social]"),
  cnpj: env("NEXT_PUBLIC_CNPJ", "[Seu CNPJ]"),
  email: env("NEXT_PUBLIC_EMAIL_SUPORTE", "suporte@seudominio.com.br"),
  plataforma: env("NEXT_PUBLIC_PLATAFORMA_PAGAMENTO", "plataforma de pagamento"),
  gaId: env("NEXT_PUBLIC_GA_ID", ""),
  pixelId: env("NEXT_PUBLIC_META_PIXEL_ID", ""),
  googleVerification: env("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", ""),
  description:
    "Planilha financeira para MEI no Excel e Google Planilhas. Controle o lucro, calcule o preço certo, acompanhe contas e DAS e receba alerta do limite de R$ 81 mil."
};

/** Preço como número para dados estruturados (ex.: "47" -> "47.00"). */
export const priceNumber = (p: string) => {
  const n = Number(p.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
};

/** A promoção está valendo neste momento? (horário do servidor, comparado em UTC) */
export const promoAtiva = (now: number = Date.now()) => {
  const end = Date.parse(site.fimOferta);
  return Number.isFinite(end) && now < end;
};

/** Preço vigente: promocional durante a oferta, normal depois dela. */
export const precoAtual = (now: number = Date.now()) => (promoAtiva(now) ? site.precoPor : site.precoDe);
