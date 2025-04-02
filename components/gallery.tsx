"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, X, ZoomIn } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

// Datos de ejemplo para la galería
const galleryImages = [
  {
    id: "g1",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Paisaje montañoso de Argentina",
    location: "Cordillera de los Andes",
    height: 400,
  },
  {
    id: "g2",
    src: "/placeholder.svg?height=300&width=600",
    alt: "Moto junto a un lago",
    location: "Patagonia Argentina",
    height: 300,
  },
  {
    id: "g3",
    src: "/placeholder.svg?height=500&width=600",
    alt: "Proceso de construcción de casa rural",
    location: "Provincia de Córdoba",
    height: 500,
  },
  {
    id: "g4",
    src: "/placeholder.svg?height=350&width=600",
    alt: "Amanecer en la ruta",
    location: "Ruta 40",
    height: 350,
  },
  {
    id: "g5",
    src: "/placeholder.svg?height=450&width=600",
    alt: "Artesano local trabajando",
    location: "Norte Argentino",
    height: 450,
  },
  {
    id: "g6",
    src: "/placeholder.svg?height=380&width=600",
    alt: "Cascada en la selva",
    location: "Misiones",
    height: 380,
  },
  {
    id: "g7",
    src: "/placeholder.svg?height=420&width=600",
    alt: "Atardecer en el campo",
    location: "Pampa Argentina",
    height: 420,
  },
  {
    id: "g8",
    src: "/placeholder.svg?height=320&width=600",
    alt: "Camino de montaña",
    location: "Mendoza",
    height: 320,
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Función para manejar las teclas de navegación
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedImage) return

      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)

      if (e.key === "ArrowRight" && currentIndex < galleryImages.length - 1) {
        setSelectedImage(galleryImages[currentIndex + 1].id)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setSelectedImage(galleryImages[currentIndex - 1].id)
      } else if (e.key === "Escape") {
        setSelectedImage(null)
      }
    },
    [selectedImage],
  )

  // Efecto para añadir el evento de teclado
  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown)
      // Bloquear el scroll cuando el modal está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      // Restaurar el scroll cuando el modal se cierra
      document.body.style.overflow = "auto"
    }
  }, [selectedImage, handleKeyDown])

  // Calcular la altura de cada elemento en la cuadrícula masonry
  useEffect(() => {
    const resizeGridItems = () => {
      const grid = document.querySelector(".masonry-grid")
      if (!grid) return

      const rowHeight = Number.parseInt(window.getComputedStyle(grid).getPropertyValue("grid-auto-rows"))
      const rowGap = Number.parseInt(window.getComputedStyle(grid).getPropertyValue("grid-row-gap"))

      const items = document.querySelectorAll(".masonry-item")
      items.forEach((item) => {
        const content = item.querySelector(".masonry-content")
        if (!content) return

        const rowSpan = Math.ceil((content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
        item.style.gridRowEnd = `span ${rowSpan}`
      })
    }

    resizeGridItems()
    window.addEventListener("resize", resizeGridItems)

    return () => {
      window.removeEventListener("resize", resizeGridItems)
    }
  }, [])

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  // Función para navegar a la imagen anterior
  const prevImage = () => {
    if (!selectedImage) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)
    if (currentIndex > 0) {
      setSelectedImage(galleryImages[currentIndex - 1].id)
    }
  }

  // Función para navegar a la imagen siguiente
  const nextImage = () => {
    if (!selectedImage) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)
    if (currentIndex < galleryImages.length - 1) {
      setSelectedImage(galleryImages[currentIndex + 1].id)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Galería
        </motion.h2>

        <motion.div
          className="masonry-grid mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="masonry-item"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div
                className="masonry-content image-overlay group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
                style={{ height: `${image.height}px` }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium">{image.location}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-white/80 text-sm line-clamp-1">{image.alt}</p>
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="https://www.instagram.com/faqu_perez" target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary">
              Ver más en Instagram
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal de imagen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Botones de navegación */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 md:-translate-x-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  disabled={galleryImages.findIndex((img) => img.id === selectedImage) === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 md:translate-x-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  disabled={galleryImages.findIndex((img) => img.id === selectedImage) === galleryImages.length - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>

              {galleryImages.find((img) => img.id === selectedImage) && (
                <>
                  <div className="relative w-full h-[70vh]">
                    <Image
                      src={galleryImages.find((img) => img.id === selectedImage)?.src || "/placeholder.svg"}
                      alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 rounded-b-lg">
                    <p className="text-white font-medium">
                      {galleryImages.find((img) => img.id === selectedImage)?.location}
                    </p>
                    <p className="text-white/80 text-sm">
                      {galleryImages.find((img) => img.id === selectedImage)?.alt}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

