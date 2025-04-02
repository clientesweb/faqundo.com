import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Videos from "@/components/videos"
import Podcast from "@/components/podcast"
import Book from "@/components/book"
import Contact from "@/components/contact"
import Donations from "@/components/donations"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Youtube, ExternalLink } from "lucide-react"
import PWAInstall from "@/components/pwa-install"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />

        {/* Banner del canal */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="relative w-full h-40 md:h-60 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_banner.jpg-MUtANobKCUZepIqhJheUswxLbbuZzA.jpeg"
                alt="Canal de YouTube de Facu Pérez"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="p-6 md:p-10">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 md:mb-4">Mi Canal de YouTube</h2>
                  <p className="text-white/80 mb-4 max-w-md">Viajes, construcción y experiencias únicas en Argentina</p>
                  <Link href="https://www.youtube.com/@faqundoperez" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Youtube className="mr-2 h-5 w-5" />
                      Suscríbete
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Videos />
        <Podcast />
        <Book />
        <Donations />
        <Contact />
      </main>
      <Footer />
      <PWAInstall />
    </div>
  )
}

