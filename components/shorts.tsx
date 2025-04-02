"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

// Tipo para los shorts de YouTube
interface YouTubeShort {
  id: string
  title: string
  thumbnail: string
  viewCount: string
}

export default function Shorts() {
  const [shorts, setShorts] = useState<YouTubeShort[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Función para formatear el número de vistas
  const formatViewCount = (count: string) => {
    const num = Number.parseInt(count)
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Función para desplazar el carrusel
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth * 0.8

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  // Función para verificar si se deben mostrar las flechas
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef

      // Mostrar flecha izquierda si no estamos al inicio
      setShowLeftArrow(current.scrollLeft > 0)

      // Mostrar flecha derecha si no estamos al final
      setShowRightArrow(current.scrollLeft < current.scrollWidth - current.clientWidth - 10)
    }
  }

  // Efecto para cargar los shorts
  useEffect(() => {
    // Simulación de carga de shorts desde la API de YouTube
    const fetchShorts = async () => {
      setLoading(true)

      try {
        // Simulación de datos de la API
        const mockShorts: YouTubeShort[] = [
          {
            id: "short1",
            title: "Amanecer en la Ruta 40 🌅",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            viewCount: "45678",
          },
          {
            id: "short2",
            title: "Cruzando un río con la moto 💦",
            thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            viewCount: "32456",
          },
          {
            id: "short3",
            title: "Técnica para encender fuego sin fósforos 🔥",
            thumbnail: "https://i.ytimg.com/vi/8UE6gzNuUJo/maxresdefault.jpg",
            viewCount: "28765",
          },
          {
            id: "short4",
            title: "Encuentro con guanacos en la Patagonia 🦙",
            thumbnail: "https://i.ytimg.com/vi/LXb3EKWsInQ/maxresdefault.jpg",
            viewCount: "19876",
          },
          {
            id: "short5",
            title: "Truco para arreglar una pinchadura 🔧",
            thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            viewCount: "23456",
          },
          {
            id: "short6",
            title: "La mejor vista de las montañas ⛰️",
            thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
            viewCount: "34567",
          },
          {
            id: "short7",
            title: "Cocinando en la naturaleza 🍳",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            viewCount: "29876",
          },
          {
            id: "short8",
            title: "Tormenta en la montaña ⚡",
            thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            viewCount: "18765",
          },
        ]

        setShorts(mockShorts)
      } catch (error) {
        console.error("Error fetching shorts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchShorts()
  }, [])

  // Efecto para verificar la posición del scroll
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollPosition)
      // Verificar inicialmente
      checkScrollPosition()

      return () => {
        container.removeEventListener("scroll", checkScrollPosition)
      }
    }
  }, [shorts])

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
    <section id="shorts" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Mis Shorts
        </motion.h2>

        <div className="relative mt-12">
          {showLeftArrow && (
            <motion.div
              className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 md:-left-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={() => scroll("left")}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>
          )}

          {showRightArrow && (
            <motion.div
              className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 md:-right-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-lg"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          )}

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4 px-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex-shrink-0 w-[225px]">
                  <Skeleton className="w-full aspect-[9/16] rounded-lg" />
                  <Skeleton className="h-5 w-3/4 mt-2" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="scroll-container px-2 hide-scrollbar"
              ref={scrollContainerRef}
            >
              {shorts.map((short) => (
                <motion.div key={short.id} variants={itemVariants} className="scroll-item w-[225px] flex-shrink-0 mx-2">
                  <Link href={`https://www.youtube.com/shorts/${short.id}`} target="_blank" rel="noopener noreferrer">
                    <Card className="overflow-hidden hover-card">
                      <CardContent className="p-0">
                        <div className="relative hover-zoom">
                          <div className="w-full aspect-[9/16] relative">
                            <Image
                              src={short.thumbnail || "/placeholder.svg"}
                              alt={short.title}
                              fill
                              sizes="225px"
                              className="object-cover transition-transform duration-500"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI1IiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                            />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                            <span>{formatViewCount(short.viewCount)}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm line-clamp-2">{short.title}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="https://www.youtube.com/@faqundoperez/shorts" target="_blank" rel="noopener noreferrer">
            <Button className="btn-primary">
              Ver más Shorts
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

