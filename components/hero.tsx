"use client"

import Link from "next/link"
import { ArrowDown, ChevronRight, Youtube, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import SocialLinks from "./social-links"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { useEffect, useState } from "react"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  // Efecto de parallax al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con efecto parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/images/hero.jpeg")`,
        }}
      />

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-compass-dark/70 via-compass-dark/50 to-compass-dark/80"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
            <TypeAnimation
              sequence={[
                "Recorriendo Argentina en Moto",
                2000,
                "Construyendo mi Casa Rural",
                2000,
                "Compartiendo Historias Únicas",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Number.POSITIVE_INFINITY}
              className="bg-clip-text text-transparent bg-gradient-to-r from-white to-compass-beige"
            />
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Descubriendo paisajes, construyendo sueños y compartiendo experiencias únicas.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="#videos">
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto group text-sm md:text-base py-2.5 px-5 md:py-3 md:px-6 shadow-lg rounded-lg">
              <Youtube className="mr-2 h-5 w-5" />
              <span className="relative z-10">Ver Videos</span>
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#podcast">
            <Button className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white w-full sm:w-auto group text-sm md:text-base py-2.5 px-5 md:py-3 md:px-6 shadow-lg rounded-lg">
              <Headphones className="mr-2 h-5 w-5" />
              <span className="relative z-10">Escuchar Podcast</span>
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <SocialLinks className="justify-center" iconColor="white" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Link
          href="#about"
          aria-label="Scroll Down"
          className="block p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <ArrowDown className="h-8 w-8 text-white" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

