// Función para obtener los últimos videos de un canal de YouTube
export async function getLatestVideos(channelId: string, apiKey: string, maxResults = 10) {
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
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
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

    // Combinamos los datos
    const videos = videosData.items.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId
      const videoDetails = videoDetailsData.items.find((detail: any) => detail.id === videoId)

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        duration: videoDetails?.contentDetails.duration || "PT0S",
        viewCount: videoDetails?.statistics.viewCount || "0",
        likeCount: videoDetails?.statistics.likeCount || "0",
      }
    })

    return videos
  } catch (error) {
    console.error("Error en la API de YouTube:", error)
    return []
  }
}

// Función para obtener los shorts de un canal de YouTube
export async function getShorts(channelId: string, apiKey: string, maxResults = 10) {
  try {
    // Obtenemos los últimos videos del canal
    const videos = await getLatestVideos(channelId, apiKey, 50) // Obtenemos más videos para filtrar

    // Filtramos los shorts (videos verticales cortos)
    // Los shorts suelen tener #shorts en el título o descripción, o una duración corta
    const shorts = videos
      .filter((video: any) => {
        const isShortByTitle =
          video.title.toLowerCase().includes("#shorts") || video.description.toLowerCase().includes("#shorts")

        // Convertimos la duración ISO 8601 a segundos
        const getDurationInSeconds = (duration: string) => {
          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
          if (!match) return 0

          const hours = Number.parseInt(match[1] || "0")
          const minutes = Number.parseInt(match[2] || "0")
          const seconds = Number.parseInt(match[3] || "0")

          return hours * 3600 + minutes * 60 + seconds
        }

        const durationInSeconds = getDurationInSeconds(video.duration)
        const isShortByDuration = durationInSeconds <= 60 // Shorts suelen durar menos de 1 minuto

        return isShortByTitle || isShortByDuration
      })
      .slice(0, maxResults)

    return shorts
  } catch (error) {
    console.error("Error al obtener shorts:", error)
    return []
  }
}

// Función para obtener estadísticas del canal
export async function getChannelStats(channelId: string, apiKey: string) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
    )

    if (!response.ok) {
      throw new Error("Error al obtener estadísticas del canal")
    }

    const data = await response.json()
    const channelStats = data.items[0].statistics
    const channelInfo = data.items[0].snippet

    return {
      title: channelInfo.title,
      description: channelInfo.description,
      customUrl: channelInfo.customUrl,
      thumbnails: channelInfo.thumbnails,
      subscriberCount: channelStats.subscriberCount,
      videoCount: channelStats.videoCount,
      viewCount: channelStats.viewCount,
    }
  } catch (error) {
    console.error("Error al obtener estadísticas del canal:", error)
    return null
  }
}

