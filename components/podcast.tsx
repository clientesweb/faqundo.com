"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FontAwesomeIcon,
  faYoutube,
  faInstagram,
  faSpotify,
  faTiktok,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faExternalLinkAlt,
  faHeadphones,
} from "./icons/font-awesome-icons"

interface PodcastEpisode {
  id: string
  title: string
  description: string
  date: string
  duration: string
  spotifyUrl: string
  youtubeUrl: string
  image: string
  isShort?: boolean
}

// Función para obtener los episodios del podcast desde YouTube
async function fetchPodcastEpisodes(channelId: string, apiKey: string, maxResults = 10) {
  try {
    // Primero obtenemos el ID de la lista de reproducción de subidas del canal
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
    )

    if (!channelResponse.ok) {
      throw new Error("Error al obtener información del canal")
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

    // Luego obtenemos los videos de esa lista de reproducción
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults * 2}&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
    )

    if (!videosResponse.ok) {
      throw new Error("Error al obtener videos")
    }

    const videosData = await videosResponse.json()

    // Extraemos los IDs de los videos para obtener más detalles
    const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(",")

    // Obtenemos detalles adicionales de los videos (duración, estadísticas, etc.)
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
    )

    if (!videoDetailsResponse.ok) {
      throw new Error("Error al obtener detalles de los videos")
    }

    const videoDetailsData = await videoDetailsResponse.json()

    // Combinamos los datos y filtramos para excluir shorts
    const episodes = videosData.items
      .map((item: any) => {
        const videoId = item.snippet.resourceId.videoId
        const videoDetails = videoDetailsData.items.find((detail: any) => detail.id === videoId)

        if (!videoDetails) return null

        // Convertimos la duración ISO 8601 a segundos
        const getDurationInSeconds = (duration: string) => {
          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
          if (!match) return 0

          const hours = Number.parseInt(match[1] || "0")
          const minutes = Number.parseInt(match[2] || "0")
          const seconds = Number.parseInt(match[3] || "0")

          return hours * 3600 + minutes * 60 + seconds
        }

        const durationInSeconds = getDurationInSeconds(videoDetails.contentDetails.duration)
        const isShortByDuration = durationInSeconds <= 60
        const isShortByTitle =
          item.snippet.title.toLowerCase().includes("#shorts") ||
          item.snippet.description.toLowerCase().includes("#shorts")

        const isShort = isShortByDuration || isShortByTitle

        // Solo incluimos videos que NO son shorts
        if (isShort) return null

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          date: new Date(item.snippet.publishedAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          duration: videoDetails.contentDetails.duration || "PT0S",
          spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
          youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
          image: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          isShort: false,
        }
      })
      .filter(Boolean)
      .slice(0, maxResults)

    return episodes
  } catch (error) {
    console.error("Error en la API de YouTube:", error)
    return []
  }
}

// Añadir función para obtener shorts del canal de podcast
async function fetchPodcastShorts(channelId: string, apiKey: string, maxResults = 10) {
  try {
    // Primero obtenemos el ID de la lista de reproducción de subidas del canal
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
    )

    if (!channelResponse.ok) {
      throw new Error("Error al obtener información del canal")
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

    // Luego obtenemos los videos de esa lista de reproducción
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults * 3}&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
    )

    if (!videosResponse.ok) {
      throw new Error("Error al obtener videos")
    }

    const videosData = await videosResponse.json()

    // Extraemos los IDs de los videos para obtener más detalles
    const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(",")

    // Obtenemos detalles adicionales de los videos (duración, estadísticas, etc.)
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
    )

    if (!videoDetailsResponse.ok) {
      throw new Error("Error al obtener detalles de los videos")
    }

    const videoDetailsData = await videoDetailsResponse.json()

    // Filtramos los shorts (videos verticales cortos)
    const shorts = videosData.items
      .map((item: any) => {
        const videoId = item.snippet.resourceId.videoId
        const videoDetails = videoDetailsData.items.find((detail: any) => detail.id === videoId)

        if (!videoDetails) return null

        // Convertimos la duración ISO 8601 a segundos
        const getDurationInSeconds = (duration: string) => {
          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
          if (!match) return 0

          const hours = Number.parseInt(match[1] || "0")
          const minutes = Number.parseInt(match[2] || "0")
          const seconds = Number.parseInt(match[3] || "0")

          return hours * 3600 + minutes * 60 + seconds
        }

        const durationInSeconds = getDurationInSeconds(videoDetails.contentDetails.duration)
        const isShortByDuration = durationInSeconds <= 60 // Shorts suelen durar menos de 1 minuto
        const isShortByTitle =
          item.snippet.title.toLowerCase().includes("#shorts") ||
          item.snippet.description.toLowerCase().includes("#shorts")

        // Solo incluimos videos que SON shorts
        if (!(isShortByDuration || isShortByTitle)) return null

        return {
          id: videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          date: new Date(item.snippet.publishedAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          duration: videoDetails.contentDetails.duration || "PT0S",
          spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
          youtubeUrl: `https://www.youtube.com/shorts/${videoId}`,
          image: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
          isShort: true,
        }
      })
      .filter(Boolean)
      .slice(0, maxResults)

    return shorts
  } catch (error) {
    console.error("Error al obtener shorts:", error)
    return []
  }
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "ep1",
    title: "Viajando por la Patagonia: Experiencias y Consejos",
    description:
      "En este episodio comparto mis experiencias recorriendo la Patagonia en moto, los desafíos que enfrenté y consejos para quienes quieran emprender esta aventura.",
    date: "15 de marzo, 2023",
    duration: "45:30",
    spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    youtubeUrl: "https://youtube.com/@bitacora_podcast?si=1zu7vgPPFwL_w2T5",
    image: "/placeholder.svg?height=400&width=400",
    isShort: false,
  },
  {
    id: "ep2",
    title: "Construcción Sustentable: Entrevista con María González",
    description:
      "Conversamos con María González, arquitecta especializada en construcción sustentable, sobre técnicas y materiales para construir respetando el medio ambiente.",
    date: "2 de abril, 2023",
    duration: "52:15",
    spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    youtubeUrl: "https://youtube.com/@bitacora_podcast?si=1zu7vgPPFwL_w2T5",
    image: "/placeholder.svg?height=400&width=400",
    isShort: false,
  },
  {
    id: "ep3",
    title: "Oficios Tradicionales: El Arte de la Herrería",
    description:
      "Exploramos el mundo de la herrería tradicional junto a Don Manuel, uno de los últimos herreros artesanales de Argentina, quien nos cuenta su historia y pasión por este oficio.",
    date: "18 de abril, 2023",
    duration: "38:45",
    spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    youtubeUrl: "https://youtube.com/@bitacora_podcast?si=1zu7vgPPFwL_w2T5",
    image: "/placeholder.svg?height=400&width=400",
    isShort: false,
  },
  {
    id: "ep4",
    title: "Vida Rural vs. Vida Urbana: Pros y Contras",
    description:
      "Analizamos las ventajas y desventajas de la vida en el campo frente a la vida en la ciudad, basándonos en mi experiencia personal y la de varios invitados.",
    date: "5 de mayo, 2023",
    duration: "49:20",
    spotifyUrl: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    youtubeUrl: "https://youtube.com/@bitacora_podcast?si=1zu7vgPPFwL_w2T5",
    image: "/placeholder.svg?height=400&width=400",
    isShort: false,
  },
]

export default function Podcast() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null)
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [shorts, setShorts] = useState<PodcastEpisode[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Estado para controlar la reproducción de video
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

  // Actualizar el useEffect para cargar tanto episodios como shorts
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      try {
        const apiKey = "AIzaSyDzjTvfhzF80cgHXFFYG0O_8w5b24a5ZOU"
        const channelId = "UCG3dyzVNXgbYD4bCR61kMWA"

        // Cargar episodios regulares
        const fetchedEpisodes = await fetchPodcastEpisodes(channelId, apiKey, 8)

        // Cargar shorts
        const fetchedShorts = await fetchPodcastShorts(channelId, apiKey, 8)

        if (fetchedEpisodes.length > 0) {
          setEpisodes(fetchedEpisodes)
        } else {
          // Usar datos de ejemplo si no se pueden cargar los episodios reales
          setEpisodes(podcastEpisodes)
        }

        if (fetchedShorts.length > 0) {
          setShorts(fetchedShorts)
        } else {
          // Usar los mismos datos de ejemplo para shorts si no se pueden cargar
          setShorts(podcastEpisodes)
        }
      } catch (error) {
        console.error("Error al cargar contenido:", error)
        setEpisodes(podcastEpisodes)
        setShorts(podcastEpisodes)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

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

  // Función para controlar la reproducción del video
  const togglePlay = () => {
    if (videoRef.current) {
      const iframe = videoRef.current
      const message = isPlaying
        ? '{"event":"command","func":"pauseVideo","args":""}'
        : '{"event":"command","func":"playVideo","args":""}'
      iframe.contentWindow?.postMessage(message, "*")
      setIsPlaying(!isPlaying)
    }
  }

  // Función para controlar el mute del video
  const toggleMute = () => {
    if (videoRef.current) {
      const iframe = videoRef.current
      const message = isMuted
        ? '{"event":"command","func":"unMute","args":""}'
        : '{"event":"command","func":"mute","args":""}'
      iframe.contentWindow?.postMessage(message, "*")
      setIsMuted(!isMuted)
    }
  }

  // Cerrar el video seleccionado
  const closeVideo = () => {
    setSelectedEpisode(null)
    setIsPlaying(false)
  }

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
    <section id="podcast" className="py-16 md:py-20 compass-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div>
            <motion.h2
              className="section-title text-compass-green"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              ref={ref}
            >
              Bitácora Podcast
            </motion.h2>
            <motion.p
              className="section-subtitle text-compass-green/80 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              De chico me enseñaron que la sabiduría se obtiene relacionándonos con personas diferentes a nosotros. En
              bitácora podcast, te invitamos a conocer esas historias, explorando experiencias únicas que nos muestran
              el mundo desde otras perspectivas.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4 mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faSpotify} className="h-5 w-5" />
                <span>Escuchar en Spotify</span>
              </Button>
            </Link>
            <Link href="https://youtube.com/@Bitacora_Podcast" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
                <span>Ver en YouTube</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Banner del podcast */}
        <motion.div
          className="w-full mb-12 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/channels4_banner%20%281%29.jpg-CJznEcMSWPPpgatiWNM1z7U1NnrARi.jpeg"
            alt="Bitácora Podcast - Historias únicas, vidas diferentes"
            width={1200}
            height={300}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {selectedEpisode ? (
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                onClick={closeVideo}
                className="border-compass-green text-compass-green hover:bg-compass-green/10"
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Volver
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMute}
                  className="border-compass-green text-compass-green hover:bg-compass-green/10"
                >
                  <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                  className="border-compass-green text-compass-green hover:bg-compass-green/10"
                >
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-4 text-compass-green">{selectedEpisode.title}</h3>

            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg mb-4">
              <iframe
                ref={videoRef}
                src={`https://www.youtube.com/embed/${selectedEpisode.id}?enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                title={selectedEpisode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-compass-green/70 mb-4">
              <span>{selectedEpisode.date}</span>
              <span>•</span>
              <span>{formatDuration(selectedEpisode.duration)}</span>
            </div>

            <p className="text-compass-green/80 mb-6">{selectedEpisode.description}</p>

            <div className="flex gap-3">
              <Link href={selectedEpisode.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                  <FontAwesomeIcon icon={faYoutube} className="mr-2 h-4 w-4" />
                  Ver en YouTube
                </Button>
              </Link>
              <Link href={selectedEpisode.spotifyUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white">
                  <FontAwesomeIcon icon={faSpotify} className="mr-2 h-4 w-4" />
                  Escuchar en Spotify
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 items-start">
            <motion.div
              className="lg:col-span-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="sticky top-24">
                <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden mb-8 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bitacora.png-cnNJPBH7ecL3cGdBNlSYvH734KMbQY.jpeg"
                    alt="Bitácora Podcast Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-heading font-bold text-compass-green mb-4">Sobre el Podcast</h3>
                  <p className="text-compass-green/80 mb-4">
                    Acompáñame en este viaje auditivo donde compartimos con invitados especiales sus experiencias y
                    conocimientos sobre viajes, construcción, vida rural y mucho más.
                  </p>
                  <p className="text-compass-green/80 mb-6">Nuevos episodios cada dos semanas. ¡No te los pierdas!</p>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2 text-compass-green/80">
                      <FontAwesomeIcon icon={faHeadphones} className="h-5 w-5 text-compass-green" />
                      <span>Episodios: 24</span>
                    </div>
                    <div className="flex items-center space-x-2 text-compass-green/80">
                      <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-compass-green" />
                      <span>Duración promedio: 45 min</span>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <Link href="https://youtube.com/@Bitacora_Podcast" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="h-6 w-6 text-compass-green hover:text-compass-green/70 transition-colors"
                      />
                    </Link>
                    <Link href="https://www.instagram.com/bitacora_podcast_" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="h-6 w-6 text-compass-green hover:text-compass-green/70 transition-colors"
                      />
                    </Link>
                    <Link
                      href="https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faSpotify}
                        className="h-6 w-6 text-compass-green hover:text-compass-green/70 transition-colors"
                      />
                    </Link>
                    <Link href="https://www.tiktok.com/@bitacora_podcast" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon
                        icon={faTiktok}
                        className="h-6 w-6 text-compass-green hover:text-compass-green/70 transition-colors"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 order-1 lg:order-2"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Tabs defaultValue="latest" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30 p-1.5 rounded-xl">
                  <TabsTrigger
                    value="latest"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-accent py-2.5"
                  >
                    Últimos Episodios
                  </TabsTrigger>
                  <TabsTrigger
                    value="shorts"
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-accent py-2.5"
                  >
                    Shorts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="latest" className="space-y-6">
                  {episodes.map((episode) => (
                    <motion.div key={episode.id} variants={itemVariants}>
                      <Card
                        className="overflow-hidden hover-card border-compass-green/20 h-full cursor-pointer"
                        onClick={() => setSelectedEpisode(episode)}
                      >
                        <CardContent className="p-0 h-full">
                          <div className="grid grid-cols-1 md:grid-cols-4 h-full">
                            <div className="md:col-span-1 relative h-32 md:h-full">
                              <Image
                                src={episode.image || "/placeholder.svg"}
                                alt={episode.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 rounded-full bg-compass-green/90 flex items-center justify-center">
                                  <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-white ml-1" />
                                </div>
                              </div>
                            </div>
                            <div className="md:col-span-3 p-4 md:p-6 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg md:text-xl font-bold text-compass-green">{episode.title}</h3>
                                <span className="text-xs md:text-sm text-compass-green/60 ml-2 whitespace-nowrap">
                                  {formatDuration(episode.duration)}
                                </span>
                              </div>
                              <p className="text-compass-green/80 mb-4 line-clamp-2 text-sm md:text-base">
                                {episode.description}
                              </p>
                              <div className="flex flex-wrap items-center justify-between mt-auto">
                                <span className="text-xs md:text-sm text-compass-green/60">{episode.date}</span>
                                <div className="flex space-x-2 md:space-x-3 mt-2 sm:mt-0">
                                  <Link href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1 border-compass-green/40 text-compass-green hover:bg-compass-green/10 text-xs md:text-sm py-1 h-8"
                                    >
                                      <FontAwesomeIcon icon={faSpotify} className="h-3 w-3 md:h-4 md:w-4" />
                                      <span className="hidden sm:inline">Spotify</span>
                                    </Button>
                                  </Link>
                                  <Link href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex items-center gap-1 border-compass-green/40 text-compass-green hover:bg-compass-green/10 text-xs md:text-sm py-1 h-8"
                                    >
                                      <FontAwesomeIcon icon={faYoutube} className="h-3 w-3 md:h-4 md:w-4" />
                                      <span className="hidden sm:inline">YouTube</span>
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                {/* Actualizar el TabsContent para shorts para usar el estado de shorts */}
                <TabsContent value="shorts" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {shorts.map((episode) => (
                      <motion.div key={`short-${episode.id}`} variants={itemVariants}>
                        <Card
                          className="overflow-hidden hover-card border-compass-green/20 h-full cursor-pointer"
                          onClick={() => setSelectedEpisode(episode)}
                        >
                          <CardContent className="p-0">
                            <div className="relative aspect-[9/16] w-full">
                              <Image
                                src={episode.image || "/placeholder.svg"}
                                alt={episode.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-compass-green/90 flex items-center justify-center">
                                  <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-white ml-1" />
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                Short
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className="text-sm font-medium line-clamp-1">{episode.title}</h3>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-compass-green/60">{episode.date.split(",")[0]}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <Link href="https://youtube.com/@Bitacora_Podcast" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-compass-green text-compass-beige hover:bg-compass-green/90">
                    Ver todos los episodios
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

