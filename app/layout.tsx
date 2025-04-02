import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import JsonLd from "./jsonld"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://faqundoperez.com"),
  title: {
    default: "Faqundo Pérez | Viajero en Moto, Constructor y Narrador de Historias Argentinas",
    template: "%s | Faqundo Pérez - Aventurero Argentino",
  },
  description:
    "Acompáñame en mi viaje por Argentina en mi Royal Enfield Himalayan, descubriendo paisajes impresionantes, construyendo mi casa rural sustentable y compartiendo historias auténticas de personas con pasión. Bitácora Podcast, videos de viajes y más.",
  keywords: [
    "viajes en moto Argentina",
    "Royal Enfield Himalayan",
    "construcción sustentable",
    "casa rural autosuficiente",
    "Patagonia en moto",
    "Ruta 40",
    "Bitácora Podcast",
    "historias argentinas",
    "oficios tradicionales",
    "YouTuber argentino",
    "Faqundo Pérez",
    "aventuras en moto",
    "vida rural",
    "bioconstrucción",
    "Gouin Buenos Aires",
    "viajero argentino",
  ],
  authors: [{ name: "Faqundo Pérez", url: "https://faqundoperez.com" }],
  creator: "Faqundo Pérez",
  publisher: "Faqundo Pérez",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "travel",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://faqundoperez.com",
    title: "Faqundo Pérez | Recorriendo Argentina en Moto",
    description:
      "Descubriendo paisajes, construyendo sueños y compartiendo experiencias únicas en mi Royal Enfield Himalayan por toda Argentina.",
    siteName: "Faqundo Pérez",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og-image.jpg-HzYqcwNFeVHg5rtmpIr7EPvDQIwAJp.jpeg",
        width: 1200,
        height: 630,
        alt: "Faqundo Pérez con su Royal Enfield Himalayan recorriendo Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faqundo Pérez | Recorriendo Argentina en Moto",
    description:
      "Descubriendo paisajes, construyendo sueños y compartiendo experiencias únicas en mi Royal Enfield Himalayan por toda Argentina.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og-image.jpg-HzYqcwNFeVHg5rtmpIr7EPvDQIwAJp.jpeg",
    ],
    creator: "@faqu_perez",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://faqundoperez.com",
    languages: {
      "es-AR": "https://faqundoperez.com",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2c3a2f",
      },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code", // Reemplazar con tu código real cuando lo tengas
  },
  other: {
    "msapplication-TileColor": "#2c3a2f",
    "theme-color": "#d8d0b8",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "og:locale:alternate": "en_US",
    "twitter:app:id:iphone": "",
    "twitter:app:id:ipad": "",
    "twitter:app:id:googleplay": "",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d8d0b8" },
    { media: "(prefers-color-scheme: dark)", color: "#2c3a2f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="/sw-register.js" defer></script>
        <JsonLd />
      </head>
      <body className={`${manrope.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

