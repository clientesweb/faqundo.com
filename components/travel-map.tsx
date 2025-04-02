"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin } from "lucide-react"

// Datos de ejemplo para el mapa
const travelLocations = [
  {
    id: "loc1",
    name: "El Chaltén",
    description: "La capital del trekking en Argentina",
    coordinates: { x: 25, y: 85 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc2",
    name: "Bariloche",
    description: "Lagos y montañas impresionantes",
    coordinates: { x: 30, y: 75 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc3",
    name: "Mendoza",
    description: "Tierra del vino y la montaña",
    coordinates: { x: 35, y: 60 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc4",
    name: "Salta",
    description: "Paisajes del norte argentino",
    coordinates: { x: 45, y: 30 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc5",
    name: "Iguazú",
    description: "Las cataratas más impresionantes",
    coordinates: { x: 65, y: 25 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc6",
    name: "Buenos Aires",
    description: "La vibrante capital argentina",
    coordinates: { x: 55, y: 55 },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "loc7",
    name: "Ushuaia",
    description: "El fin del mundo",
    coordinates: { x: 30, y: 95 },
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function TravelMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 12 } },
  }

  return (
    <section id="travel-map" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Mapa de Viajes
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div
              className="relative map-container bg-muted rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/placeholder.svg?height=500&width=800"
                alt="Mapa de Argentina"
                className="w-full h-full object-cover"
              />

              <motion.div
                className="absolute inset-0"
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {travelLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    className={`absolute cursor-pointer transition-all duration-300 ${
                      selectedLocation === location.id ? "z-20" : "z-10"
                    }`}
                    style={{
                      left: `${location.coordinates.x}%`,
                      top: `${location.coordinates.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    variants={itemVariants}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div
                      className={`map-marker ${
                        selectedLocation === location.id
                          ? "bg-secondary text-secondary-foreground scale-125"
                          : "bg-secondary/70 text-secondary-foreground"
                      }`}
                    >
                      <MapPin className="h-6 w-6" />
                    </div>
                    {selectedLocation === location.id && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-card shadow-lg rounded-lg p-2 text-center">
                        <p className="font-medium text-sm">{location.name}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Lugares Visitados</h3>

                  {selectedLocation ? (
                    <div>
                      {travelLocations.find((loc) => loc.id === selectedLocation) && (
                        <>
                          <img
                            src={
                              travelLocations.find((loc) => loc.id === selectedLocation)?.image || "/placeholder.svg"
                            }
                            alt={travelLocations.find((loc) => loc.id === selectedLocation)?.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                          />
                          <h4 className="text-lg font-bold">
                            {travelLocations.find((loc) => loc.id === selectedLocation)?.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {travelLocations.find((loc) => loc.id === selectedLocation)?.description}
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        He recorrido gran parte de Argentina en mi moto, descubriendo lugares increíbles y compartiendo
                        experiencias únicas.
                      </p>
                      <p className="text-muted-foreground">
                        Selecciona un punto en el mapa para ver más detalles sobre ese lugar.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 space-y-2">
                    <h4 className="font-medium">Lugares destacados:</h4>
                    <ul className="space-y-1">
                      {travelLocations.slice(0, 5).map((location) => (
                        <li
                          key={location.id}
                          className={`cursor-pointer hover:text-secondary transition-colors ${
                            selectedLocation === location.id ? "text-secondary font-medium" : ""
                          }`}
                          onClick={() => setSelectedLocation(location.id)}
                        >
                          {location.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

