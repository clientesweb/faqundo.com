import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Facu Pérez - Viajero, Constructor y Contador de Historias",
    short_name: "Facu Pérez",
    description: "Recorriendo Argentina en moto y compartiendo experiencias únicas.",
    start_url: "/",
    display: "standalone",
    background_color: "#d8d0b8",
    theme_color: "#2c3a2f",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    orientation: "portrait",
    lang: "es-AR",
    categories: ["travel", "lifestyle", "entertainment"],
    screenshots: [
      {
        src: "/screenshots/mobile-home.jpg",
        sizes: "750x1334",
        type: "image/jpeg",
        platform: "narrow",
        label: "Página de inicio en móvil",
      },
      {
        src: "/screenshots/desktop-home.jpg",
        sizes: "1280x800",
        type: "image/jpeg",
        platform: "wide",
        label: "Página de inicio en escritorio",
      },
    ],
    shortcuts: [
      {
        name: "Videos",
        url: "/#videos",
        description: "Ver mis últimos videos",
      },
      {
        name: "Podcast",
        url: "/#podcast",
        description: "Escuchar mi podcast",
      },
    ],
    related_applications: [
      {
        platform: "web",
        url: "https://faqundoperez.com",
      },
    ],
    prefer_related_applications: false,
  }
}

