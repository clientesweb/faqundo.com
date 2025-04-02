"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar } from "lucide-react"

// Datos de ejemplo para la línea de tiempo
const timelineEvents = [
  {
    id: "event1",
    title: "Inicio del viaje",
    date: "Enero 2022",
    description:
      "Comencé mi viaje por Argentina en mi Royal Enfield Himalayan, con el objetivo de recorrer todo el país y documentar mis experiencias.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "event2",
    title: "Patagonia Argentina",
    date: "Marzo 2022",
    description:
      "Recorrí la mítica Ruta 40 en su tramo patagónico, enfrentando vientos fuertes y paisajes impresionantes que cambiaron mi perspectiva.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "event3",
    title: "Compra del terreno",
    date: "Junio 2022",
    description:
      "Adquirí un pequeño terreno en las afueras de Córdoba para comenzar a construir mi casa rural con técnicas sustentables.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "event4",
    title: "Noroeste Argentino",
    date: "Septiembre 2022",
    description:
      "Exploré las provincias del norte, conociendo artesanos locales y documentando oficios tradicionales que están desapareciendo.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "event5",
    title: "Inicio de la construcción",
    date: "Enero 2023",
    description:
      "Comencé la construcción de mi casa rural, aplicando técnicas de bioconstrucción y aprovechando materiales locales.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Timeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="timeline" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Mi Recorrido
        </motion.h2>

        <motion.div
          className="timeline mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {timelineEvents.map((event) => (
            <motion.div key={event.id} className="timeline-item" variants={itemVariants}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-secondary mr-2" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                </div>
                <div className="md:w-3/4">
                  <div className="bg-card rounded-lg overflow-hidden shadow-md">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

