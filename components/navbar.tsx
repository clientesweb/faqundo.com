"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "./theme-toggle"
import { FontAwesomeIcon, faYoutube, faInstagram, faSpotify, faTiktok } from "./icons/font-awesome-icons"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Detectar qué sección está activa
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight && sectionId) {
          setActiveSection(`#${sectionId}`)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Actualizar el array de enlaces de navegación
  const navLinks = [
    { href: "#about", label: "Sobre Mí" },
    { href: "#videos", label: "Videos" },
    { href: "#podcast", label: "Podcast" },
    { href: "#book", label: "Libro" },
    { href: "#contact", label: "Contacto" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div initial="hidden" animate="visible" variants={logoVariants}>
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-accent/30 shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%282%29.png-kZGAXVADbenyhhlq71EyX15nIRiFS2.jpeg"
                alt="Faqundo con su moto"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold text-lg md:text-xl tracking-tight leading-none ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow-md"
                }`}
              >
                Faqundo
              </span>
              <span className={`text-xs ${isScrolled ? "text-muted-foreground" : "text-white/80 drop-shadow-sm"}`}>
                Viajero & Aventurero
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden lg:flex items-center space-x-1"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                className={`nav-link flex items-center px-3 py-2 rounded-md transition-colors ${
                  activeSection === link.href || pathname === link.href
                    ? "text-accent font-medium"
                    : isScrolled
                      ? "text-foreground hover:text-accent hover:bg-accent/10"
                      : "text-white hover:text-accent hover:bg-white/10"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection(link.href)
                  const element = document.querySelector(link.href)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants} className="ml-2">
            <ThemeToggle />
          </motion.div>
        </motion.nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center lg:hidden space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className={`relative z-20 ${isScrolled ? "text-foreground" : "text-white"}`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            style={{ top: 0, height: "100vh" }}
          >
            <motion.div
              className="flex flex-col space-y-4 items-center w-full px-4 py-8 max-h-screen"
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <div className="w-full max-w-md mx-auto">
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants} className="w-full mb-2">
                    <Link
                      href={link.href}
                      className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                        activeSection === link.href
                          ? "bg-accent/20 text-accent"
                          : "hover:bg-accent/10 hover:text-accent"
                      }`}
                      onClick={() => {
                        setIsOpen(false)
                        setActiveSection(link.href)
                        // Pequeño retraso para asegurar que el menú se cierre antes de desplazarse
                        setTimeout(() => {
                          const element = document.querySelector(link.href)
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" })
                          }
                        }, 100)
                      }}
                    >
                      <span className="text-base md:text-lg font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="w-full flex justify-center space-x-6 pt-4 border-t border-border/30 mt-4"
              >
                <Link
                  href="https://www.youtube.com/@faqundoperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn youtube-icon"
                >
                  <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.instagram.com/faqu_perez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn instagram-icon"
                >
                  <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
                </Link>
                <Link
                  href="https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn spotify-icon"
                >
                  <FontAwesomeIcon icon={faSpotify} className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.tiktok.com/@faquperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn tiktok-icon"
                >
                  <FontAwesomeIcon icon={faTiktok} className="h-6 w-6" />
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center text-xs text-muted-foreground mt-6">
                <p>© {new Date().getFullYear()} Faqundo Pérez</p>
                <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => setIsOpen(false)}>
                  Cerrar menú
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

