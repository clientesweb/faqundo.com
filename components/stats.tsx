"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { UsersRound, PlaySquare, ThumbsUp, MapPin } from "lucide-react"

// Datos de ejemplo para las estadísticas
const statsData = [
  {
    id: "stat1",
    title: "Suscriptores",
    value: 10000,
    icon: UsersRound,
    color: "text-secondary",
  },
  {
    id: "stat2",
    title: "Videos",
    value: 172,
    icon: PlaySquare,
    color: "text-secondary",
  },
  {
    id: "stat3",
    title: "Likes",
    value: 250000,
    icon: ThumbsUp,
    color: "text-secondary",
  },
  {
    id: "stat4",
    title: "Lugares Visitados",
    value: 85,
    icon: MapPin,
    color: "text-secondary",
  },
]

export default function Stats() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({})
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Efecto para animar los contadores
  useEffect(() => {
    if (!inView) return

    const duration = 2000 // 2 segundos
    const frameDuration = 1000 / 60 // 60 fps
    const totalFrames = Math.round(duration / frameDuration)

    const counters = statsData.reduce(
      (acc, stat) => {
        acc[stat.id] = 0
        return acc
      },
      {} as { [key: string]: number },
    )

    setCounts(counters)

    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames

      if (progress >= 1) {
        clearInterval(timer)

        const finalCounts = statsData.reduce(
          (acc, stat) => {
            acc[stat.id] = stat.value
            return acc
          },
          {} as { [key: string]: number },
        )

        setCounts(finalCounts)
        return
      }

      // Función de easing para hacer la animación más natural
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      const newCounts = statsData.reduce(
        (acc, stat) => {
          acc[stat.id] = Math.floor(easedProgress * stat.value)
          return acc
        },
        {} as { [key: string]: number },
      )

      setCounts(newCounts)
    }, frameDuration)

    return () => clearInterval(timer)
  }, [inView])

  // Función para formatear los números
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Estadísticas
        </motion.h2>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-gradient h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`${stat.color} mb-4`}>
                    <stat.icon className="h-12 w-12" />
                  </div>
                  <h3 className="counter mb-2">{formatNumber(counts[stat.id] || 0)}</h3>
                  <p className="text-lg font-medium">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

