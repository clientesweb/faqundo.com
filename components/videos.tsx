"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ExternalLink,
  Play,
  Clock,
  Eye,
  ThumbsUp,
  Loader2,
  YoutubeIcon,
  Film,
  HomeIcon as HouseIcon,
  Users,
  Sparkles,
  Calendar,
  YoutubeIcon as YoutubeIconLucide,
  Bike,
  Wrench,
} from "lucide-react"

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
  playlistId?: string
}

// Actualizar los nombres de las categorías de videos para que coincidan mejor con las playlists
const videoCategories = [
  { id: "all", name: "Todos", icon: <Sparkles className="h-5 w-5" /> },
  {
    id: "PLqo040G7sAp4SqwAI_5_3VcwEuk8xiMM5",
    name: "Patagonia",
    playlistUrl: "https://youtube.com/playlist?list=PLqo040G7sAp4SqwAI_5_3VcwEuk8xiMM5&si=BGQd7yuwpe-I_pbi",
    icon: <Bike className="h-5 w-5" />,
  },
  {
    id: "PLqo040G7sAp5_HtCb6sDIpK-1bHb8q8RE",
    name: "Gente con Pasión",
    playlistUrl: "https://youtube.com/playlist?list=PLqo040G7sAp5_HtCb6sDIpK-1bHb8q8RE&si=nrqaD6HT4EoXz5Tj",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "PLqo040G7sAp7uhQLbCuusvLIO8IPQUBHl",
    name: "Casa Rural",
    playlistUrl: "https://youtube.com/playlist?list=PLqo040G7sAp7uhQLbCuusvLIO8IPQUBHl&si=Uq-GsxD2aiEQTF74",
    icon: <HouseIcon className="h-5 w-5" />,
  },
  {
    id: "PLqo040G7sAp5UDgybfoertiE-9GTfQsbh",
    name: "Restauración",
    playlistUrl: "https://youtube.com/playlist?list=PLqo040G7sAp5UDgybfoertiE-9GTfQsbh&si=TPUr9eR73rGG5Z-n",
    icon: <Wrench className="h-5 w-5" />,
  },
]

// Actualizar la descripción del canal de YouTube
const channelDescription =
  "Acompáñame a explorar el mundo sobre dos ruedas, aprender de personas apasionadas, construir mi casa rural, y restaurar mi camioneta antigua, ¡suscribete y unete a mi viaje!"

export default function Videos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<HTMLIFrameElement>(null)

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

  // Función para obtener videos de una playlist
  const fetchPlaylistVideos = async (playlistId: string, apiKey: string) => {
    try {
      // Obtener los videos de la playlist (solicitamos 5 videos máximo)
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${apiKey}`,
      )

      if (!playlistResponse.ok) {
        throw new Error(`Error al obtener videos de la playlist: ${playlistResponse.statusText}`)
      }

      const playlistData = await playlistResponse.json()

      // Extraer los IDs de los videos
      const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(",")

      // Obtener detalles adicionales de los videos
      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      )

      if (!videoDetailsResponse.ok) {
        throw new Error(`Error al obtener detalles de los videos: ${videoDetailsResponse.statusText}`)
      }

      const videoDetailsData = await videoDetailsResponse.json()

      // Combinar los datos
      const videos = playlistData.items.map((item: any) => {
        const videoId = item.snippet.resourceId.videoId
        const videoDetails = videoDetailsData.items.find((detail: any) => detail.id === videoId)

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          duration: videoDetails?.contentDetails.duration || "PT0S",
          viewCount: videoDetails?.statistics.viewCount || "0",
          likeCount: videoDetails?.statistics.likeCount || "0",
          playlistId: playlistId,
        }
      })

      // Ordenar por fecha de publicación (más recientes primero)
      videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

      return videos
    } catch (error) {
      console.error(`Error fetching videos for playlist ${playlistId}:`, error)
      throw error
    }
  }

  // Efecto para cargar los videos
  useEffect(() => {
    const fetchAllVideos = async () => {
      setLoading(true)
      setError(null)

      try {
        const apiKey = "AIzaSyDzjTvfhzF80cgHXFFYG0O_8w5b24a5ZOU" // La API key proporcionada
        const allVideos = []

        // Obtener videos de cada playlist
        for (const category of videoCategories) {
          if (category.id !== "all") {
            try {
              const playlistVideos = await fetchPlaylistVideos(category.id, apiKey)
              // Cada playlist ya viene ordenada por fecha y limitada a 5 videos
              allVideos.push(...playlistVideos)
            } catch (err) {
              console.error(`Error fetching videos for playlist ${category.id}:`, err)
              // Continuar con otras playlists si una falla
            }
          }
        }

        // Ordenar todos los videos por fecha de publicación (más recientes primero)
        allVideos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        setVideos(allVideos)
        setFilteredVideos(allVideos)
      } catch (err) {
        console.error("Error fetching videos:", err)
        setError("No se pudieron cargar los videos. Por favor, intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchAllVideos()
  }, [])

  // Efecto para filtrar los videos por categoría
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredVideos(videos)
      return
    }

    const filtered = videos.filter((video) => video.playlistId === selectedCategory)
    setFilteredVideos(filtered)
  }, [selectedCategory, videos])

  // Efecto para manejar la reproducción del video seleccionado
  useEffect(() => {
    if (selectedVideo && playerRef.current) {
      // Asegurarse de que el iframe se cargue correctamente
      playerRef.current.src = `https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`
    }
  }, [selectedVideo])

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
    <section id="videos" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Mis Videos
        </motion.h2>

        {selectedVideo ? (
          <motion.div
            className="mt-8 md:mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="outline"
              onClick={() => setSelectedVideo(null)}
              className="mb-4 md:mb-6 group hover:bg-accent/10 hover:text-accent"
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
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Volver a todos los videos
            </Button>

            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-heading">{selectedVideo.title}</h3>

            <div className="video-container mb-4 md:mb-6 rounded-lg overflow-hidden shadow-lg">
              <iframe
                ref={playerRef}
                src={`https://www.youtube.com/embed/${selectedVideo.id}?rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6 text-sm text-muted-foreground">
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

            <p className="text-base md:text-lg mb-4 md:mb-6">{selectedVideo.description}</p>

            <Link
              href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-accent hover:underline"
            >
              <span>Ver en YouTube</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="mb-8 md:mb-10">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {videoCategories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`rounded-full px-5 py-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="content-card">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Skeleton className="w-full aspect-video" />
                        <div className="p-4">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8 md:py-12 bg-muted/20 rounded-lg">
                <YoutubeIcon className="h-12 w-12 text-destructive mx-auto mb-4 opacity-70" />
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-accent hover:bg-accent/90 text-white">
                  <Loader2 className="mr-2 h-4 w-4" />
                  Reintentar
                </Button>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-8 md:py-12 bg-muted/20 rounded-lg">
                <Film className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-70" />
                <p className="text-muted-foreground mb-4">No hay videos en esta categoría.</p>
                <Button onClick={() => setSelectedCategory("all")} className="bg-accent hover:bg-accent/90 text-white">
                  Ver todas las categorías
                </Button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
              >
                {filteredVideos.map((video) => (
                  <motion.div key={video.id} variants={itemVariants}>
                    <Card
                      className="content-card cursor-pointer h-full overflow-hidden group border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedVideo(video)
                        // Mantener la posición de scroll actual
                        const currentPosition = window.scrollY
                        // Usar setTimeout para asegurar que el estado se actualice primero
                        setTimeout(() => window.scrollTo(0, currentPosition), 0)
                      }}
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <div className="w-full aspect-video relative rounded-t-lg">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIwIiBoZWlnaHQ9IjQwNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                              <Play className="h-7 w-7 text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2 font-heading">
                            {video.title}
                          </h3>
                          <div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-2">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(video.publishedAt).split(",")[0]}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {formatViewCount(video.viewCount)}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 mt-auto">{video.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-10 md:mt-12 text-center">
              <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">{channelDescription}</p>
              <Link href="https://www.youtube.com/@faqundoperez" target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white group px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <YoutubeIconLucide className="mr-2 h-5 w-5" />
                  Ver más en YouTube
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

