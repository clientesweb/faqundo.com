"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Youtube, Instagram, AirplayIcon as Spotify, Mail, MapPin, Phone } from "lucide-react"
import { TikTokIcon } from "./icons/tiktok-icon"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <footer className="bg-compass-green/10 border-t border-compass-green/20 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-accent/30 shadow-md">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%282%29.png-kZGAXVADbenyhhlq71EyX15nIRiFS2.jpeg"
                  alt="Faqundo Pérez con su moto"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg md:text-xl">Faqundo Pérez</span>
                <span className="text-xs text-muted-foreground">Viajero & Storyteller</span>
              </div>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md">
              Viajero, constructor y contador de historias. Recorriendo Argentina en moto y compartiendo experiencias
              únicas.
            </p>

            <div className="flex space-x-4 mb-6">
              <Link
                href="https://www.youtube.com/@faqundoperez"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn youtube-icon"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/faqu_perez"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn instagram-icon"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn spotify-icon"
              >
                <Spotify className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@faquperez"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn tiktok-icon"
              >
                <TikTokIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* Banner del canal */}
            <div className="relative w-full h-24 md:h-32 rounded-lg overflow-hidden mt-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_banner.jpg-MUtANobKCUZepIqhJheUswxLbbuZzA.jpeg"
                alt="Canal de YouTube de Faqundo Pérez"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link
                  href="#videos"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  href="#podcast"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="#book"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Libro
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-accent transition-colors flex items-center"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail className="h-5 w-5 mr-2 text-accent" />
                <a href="mailto:contactofeperez@gmail.com" className="hover:text-accent transition-colors">
                  contactofeperez@gmail.com
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2 text-accent" />
                Gouin, Buenos Aires, Argentina
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="h-5 w-5 mr-2 text-accent" />
                Redes sociales
              </li>
              <li className="text-muted-foreground mt-4">
                <p className="mb-2">Suscríbete a mi canal:</p>
                <a
                  href="https://www.youtube.com/@faqundoperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
                >
                  <Youtube className="h-5 w-5 mr-2" />
                  YouTube
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-compass-green/20 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs md:text-sm text-muted-foreground">
            &copy; {currentYear} Faqundo Pérez. Todos los derechos reservados.
          </p>
          <div className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-0 flex flex-col md:flex-row items-center md:gap-2">
            <p>Diseñado con ❤️ para mi gran amigo.</p>
            <p>
              Desarrollado por{" "}
              <a
                href="https://dualitydomain.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Duality Domain
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

