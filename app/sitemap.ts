import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/img/menu.webp`, `${site.url}/img/painel.webp`, `${site.url}/img/precificacao.webp`]
    },
    { url: `${site.url}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 }
  ];
}
