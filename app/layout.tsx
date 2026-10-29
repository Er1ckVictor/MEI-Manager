import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

// Fontes hospedadas no próprio site (sem depender de servidores externos)
const display = localFont({ src: "./fonts/BricolageGrotesque.woff2", weight: "200 800", variable: "--font-display", display: "swap" });
const body = localFont({ src: "./fonts/Figtree.woff2", weight: "300 900", variable: "--font-body", display: "swap" });

const title = "Planilha Financeira para MEI 2027 | MEI no Controle";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | MEI no Controle" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "planilha financeira MEI",
    "controle financeiro MEI",
    "planilha MEI 2027",
    "limite MEI",
    "planilha de precificação",
    "DAS MEI",
    "fluxo de caixa MEI",
    "planilha para autônomo"
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title,
    description: "Saiba quanto o seu negócio lucra, cobre o preço certo e acompanhe o limite do MEI. Planilha para Excel e Google Planilhas."
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Lucro real, preço certo e alerta do limite de R$ 81 mil. Excel e Google Planilhas."
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: site.googleVerification ? { google: site.googleVerification } : undefined,
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  themeColor: "#0B0C0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
