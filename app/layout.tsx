import type React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

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
    default: "Faqundo | Viajero, Constructor y Contador de Historias",
    template: "%s | Faqundo",
  },
  description:
    "Recorriendo Argentina en moto, construyendo mi casa rural y compartiendo experiencias únicas. Viajero, constructor y contador de historias.",
  keywords: [
    "viajes en moto",
    "argentina",
    "youtube",
    "construcción rural",
    "aventuras",
    "historias",
    "bitácora podcast",
    "facu perez",
    "royal enfield",
    "patagonia",
    "viajero",
    "storyteller",
  ],
  authors: [{ name: "Faqundo" }],
  creator: "Faqundo",
  publisher: "Faqundo",
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
    title: "Faqundo | Viajero, Constructor y Contador de Historias",
    description: "Recorriendo Argentina en moto y compartiendo experiencias únicas.",
    siteName: "Faqundo",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Faqundo - Viajero en moto por Argentina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faqundo | Viajero, Constructor y Contador de Historias",
    description: "Recorriendo Argentina en moto y compartiendo experiencias únicas.",
    images: ["/images/og-image.jpg"],
    creator: "@facu_perez",
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
    generator: 'v0.dev'
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



import './globals.css'