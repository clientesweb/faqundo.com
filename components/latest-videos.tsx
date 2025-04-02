"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play, Clock, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

// Tipo para los videos de YouTube
interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  viewCount: string
  likeCount: string
  duration: string
  description: string
}

// Categorías de videos
const videoCategories = [
  { id: "all", name: "Todos" },
  { id: "viajes", name: "Viajes" },
  { id: "construccion", name: "Construcción" },
  { id: "historias", name: "Historias" },
]

export default function LatestVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Función para formatear la duración
  const formatDuration = (duration: string) => {
    // Formato ISO 8601: PT1H2M3S
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return "00:00"

    const hours = match[1] ? match[1].padStart(2, "0") : "00"
    const minutes = match[2] ? match[2].padStart(2, "0") : "00"
    const seconds = match[3] ? match[3].padStart(2, "0") : "00"

    return hours !== "00" ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
  }

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

  // Efecto para cargar los videos
  useEffect(() => {
    // Simulación de carga de videos desde la API de YouTube
    // En un entorno real, aquí se haría la llamada a la API con la clave proporcionada
    const fetchVideos = async () => {
      setLoading(true)

      try {
        // Simulación de datos de la API
        const mockVideos: YouTubeVideo[] = [
          {
            id: "video1",
            title: "Recorriendo la Ruta 40 en moto - Los paisajes más impresionantes de Argentina",
            thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            publishedAt: "2023-12-15T15:30:00Z",
            viewCount: "15432",
            likeCount: "1200",
            duration: "PT15M30S",
            description:
              "Un viaje épico por la icónica Ruta 40 de Argentina en mi Royal Enfield Himalayan. Descubriendo paisajes increíbles y compartiendo experiencias únicas.",
          },
          {
            id: "video2",
            title: "Construyendo mi casa rural - Parte 1: Cimientos y estructura",
            thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            publishedAt: "2023-11-20T14:00:00Z",
            viewCount: "8765",
            likeCount: "950",
            duration: "PT22M15S",
            description:
              "Comienza la aventura de construir mi propia casa en el campo. En este primer episodio, trabajo en los cimientos y la estructura básica utilizando técnicas tradicionales.",
          },
          {
            id: "video3",
            title: "La historia de Don Manuel - El último herrero tradicional",
            thumbnail: "https://i.ytimg.com/vi/8UE6gzNuUJo/maxresdefault.jpg",
            publishedAt: "2023-10-05T10:15:00Z",
            viewCount: "12543",
            likeCount: "1100",
            duration: "PT18M45S",
            description:
              "Conoce a Don Manuel, uno de los últimos herreros tradicionales de Argentina. Su historia, su pasión y cómo mantiene vivo este oficio ancestral.",
          },
          {
            id: "video4",
            title: "Explorando la Patagonia en moto - Glaciares y montañas",
            thumbnail: "https://i.ytimg.com/vi/LXb3EKWsInQ/maxresdefault.jpg",
            publishedAt: "2023-09-12T09:30:00Z",
            viewCount: "18976",
            likeCount: "1500",
            duration: "PT25M10S",
            description:
              "Aventuras en los paisajes más impresionantes del sur argentino. Glaciares, montañas y encuentros con la naturaleza más salvaje.",
          },
          {
            id: "video5",
            title: "Técnicas de construcción natural - Usando materiales locales",
            thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            publishedAt: "2023-08-28T16:45:00Z",
            viewCount: "7654",
            likeCount: "820",
            duration: "PT20M30S",
            description:
              "Explorando métodos sostenibles para la construcción de viviendas utilizando materiales locales y técnicas tradicionales adaptadas al mundo moderno.",
          },
          {
            id: "video6",
            title: "Tejedoras del norte argentino - Tradición y arte",
            thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
            publishedAt: "2023-07-15T11:20:00Z",
            viewCount: "9876",
            likeCount: "890",
            duration: "PT16M45S",
            description:
              "Artesanas que mantienen vivas técnicas ancestrales de tejido, transmitiendo su conocimiento de generación en generación y creando verdaderas obras de arte.",
          },
        ]

        setVideos(mockVideos)
        setFilteredVideos(mockVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Efecto para filtrar los videos por categoría
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredVideos(videos)
      return
    }

    // En un entorno real, los videos tendrían una propiedad de categoría
    // Aquí simulamos el filtrado basado en el título
    const filtered = videos.filter((video) => {
      if (selectedCategory === "viajes") {
        return (
          video.title.toLowerCase().includes("ruta") ||
          video.title.toLowerCase().includes("explorando") ||
          video.title.toLowerCase().includes("moto")
        )
      } else if (selectedCategory === "construccion") {
        return (
          video.title.toLowerCase().includes("construyendo") ||
          video.title.toLowerCase().includes("construcción") ||
          video.title.toLowerCase().includes("casa")
        )
      } else if (selectedCategory === "historias") {
        return (
          video.title.toLowerCase().includes("historia") ||
          video.title.toLowerCase().includes("don") ||
          video.title.toLowerCase().includes("tejedoras")
        )
      }
      return true
    })

    setFilteredVideos(filtered)
  }, [selectedCategory, videos])

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
    <section id="latest-videos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Mis Últimos Videos
        </motion.h2>

        {selectedVideo ? (
          <motion.div
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="outline" onClick={() => setSelectedVideo(null)} className="mb-6">
              ← Volver a todos los videos
            </Button>

            <h3 className="text-2xl font-bold mb-4">{selectedVideo.title}</h3>

            <div className="video-container mb-6 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{formatDuration(selectedVideo.duration)}</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                <span>{formatViewCount(selectedVideo.viewCount)} vistas</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span>{formatViewCount(selectedVideo.likeCount)}</span>
              </div>
              <div>Publicado el {formatDate(selectedVideo.publishedAt)}</div>
            </div>

            <p className="text-lg mb-6">{selectedVideo.description}</p>

            <Link
              href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-secondary hover:underline"
            >
              <span>Ver en YouTube</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <Tabs defaultValue="all" className="mt-12" onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {videoCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="content-card">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Skeleton className="w-full aspect-video" />
                        <div className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredVideos.map((video) => (
                  <motion.div key={video.id} variants={itemVariants}>
                    <Card className="content-card cursor-pointer hover-card" onClick={() => setSelectedVideo(video)}>
                      <CardContent className="p-0">
                        <div className="relative hover-zoom">
                          <div className="w-full aspect-video relative overflow-hidden rounded-t-lg">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIwIiBoZWlnaHQ9IjQwNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-secondary/90 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                              <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>{formatDate(video.publishedAt)}</span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {formatViewCount(video.viewCount)}
                            </span>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-10 text-center">
              <Link href="https://www.youtube.com/@faqundoperez" target="_blank" rel="noopener noreferrer">
                <Button className="btn-primary">
                  Ver más en YouTube
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Tabs>
        )}
      </div>
    </section>
  )
}

