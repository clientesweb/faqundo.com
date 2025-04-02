"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, Star } from "lucide-react"

export default function Book() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="book" className="py-16 md:py-20 bg-compass-green text-compass-beige">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <h2 className="section-title text-compass-beige">Mi Libro</h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 md:mb-6">
              "La Patagonia en Dos Ruedas"
            </h3>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-compass-beige/90">Crónicas de un viaje en moto</p>

            <div className="flex mb-6 md:mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 md:h-6 md:w-6 text-compass-accent fill-compass-accent" />
              ))}
              <span className="ml-2 text-sm md:text-base text-compass-beige/80">4.8/5 (124 reseñas)</span>
            </div>

            <p className="text-base md:text-lg mb-4 md:mb-6 text-compass-beige/90">
              Un recorrido por mis experiencias y aprendizajes en el camino. Este libro narra las aventuras, desafíos y
              momentos inolvidables de mi viaje por la Patagonia Argentina en motocicleta.
            </p>

            <p className="text-base md:text-lg mb-6 md:mb-8 text-compass-beige/90">
              Descubre paisajes impresionantes, encuentros con personas extraordinarias y reflexiones sobre la vida en
              la carretera. Una invitación a explorar y conectar con la naturaleza y con uno mismo.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button className="bg-compass-beige text-compass-green hover:bg-compass-beige/90 group text-sm md:text-base py-2 px-4 md:py-3 md:px-6">
                <a
                  href="https://a.co/d/2irFtsV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span>Comprar Ahora</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-compass-beige text-compass-beige hover:bg-compass-beige/10 text-sm md:text-base py-2 px-4 md:py-3 md:px-6"
              >
                <BookOpen className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span>Leer extracto</span>
              </Button>
            </div>

            <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
              <div className="text-compass-beige/80 text-sm md:text-base">
                <p className="font-medium">Disponible en:</p>
                <p>Amazon, Google Books, iBooks</p>
              </div>
              <div className="text-compass-beige/80 text-sm md:text-base">
                <p className="font-medium">Publicado:</p>
                <p>Marzo 2023</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Efecto de sombra y rotación */}
              <div className="absolute -inset-4 bg-compass-beige/20 rounded-lg transform rotate-6"></div>
              <div className="absolute -inset-4 bg-compass-beige/10 rounded-lg transform -rotate-3"></div>

              {/* Imagen del libro */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portada.png-zIO3aUl6BBmoryS8OkbtgbfQdBZNcI.jpeg"
                  alt="Portada del libro La Patagonia en Dos Ruedas"
                  width={400}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Etiqueta de bestseller */}
              <div className="absolute top-4 -right-4 bg-compass-accent text-compass-green font-bold py-2 px-4 rounded-full transform rotate-12 shadow-lg">
                ¡Gran aventura!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

