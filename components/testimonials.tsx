"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Datos de ejemplo para los testimonios
const testimonialData = [
  {
    id: "t1",
    name: "Laura Martínez",
    location: "Buenos Aires",
    text: "Los videos de Facu me inspiraron a emprender mi propio viaje por Argentina. Su forma de contar historias es única y te hace sentir parte de la aventura.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t2",
    name: "Carlos Rodríguez",
    location: "Córdoba",
    text: "Gracias a los tutoriales de construcción de Facu, pude aplicar varias técnicas en mi propia casa. Explica todo de manera clara y sencilla, incluso para principiantes.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t3",
    name: "Martina López",
    location: "Mendoza",
    text: "Me encanta cómo Facu muestra la Argentina auténtica, esos lugares y personas que normalmente no aparecen en las guías turísticas. Sus videos son una ventana a nuestro país.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t4",
    name: "Diego Fernández",
    location: "Bariloche",
    text: "Como motociclista, los consejos de Facu para viajar por rutas difíciles me han sido muy útiles. Su contenido es práctico y basado en experiencia real.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "t5",
    name: "Valentina Gómez",
    location: "Salta",
    text: "Descubrí el canal de Facu buscando información sobre construcción sustentable y me quedé por sus historias de viaje. Es inspirador ver a alguien viviendo sus sueños.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Función para navegar al testimonio anterior
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1))
    resetAutoplay()
  }

  // Función para navegar al testimonio siguiente
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1))
    resetAutoplay()
  }

  // Función para reiniciar el autoplay
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1))
      }, 5000)
    }
  }

  // Efecto para el autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1))
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  // Pausar el autoplay cuando el mouse está sobre el carrusel
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  // Reanudar el autoplay cuando el mouse sale del carrusel
  const handleMouseLeave = () => {
    resetAutoplay()
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Lo Que Dicen Mis Seguidores
        </motion.h2>

        <div
          className="relative mt-12 max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 md:-left-6">
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={prevTestimonial}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 md:-right-6">
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={nextTestimonial}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialData.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="border-gradient">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-secondary mb-6">
                          <Quote className="h-12 w-12" />
                        </div>
                        <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                        <div className="flex items-center">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div className="text-left">
                            <h3 className="font-bold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-secondary" : "bg-secondary/30"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  resetAutoplay()
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

