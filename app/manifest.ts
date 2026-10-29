import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MEI no Controle",
    short_name: "MEI no Controle",
    description: "Planilha financeira para MEI 2027",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C0F",
    theme_color: "#0B0C0F",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
