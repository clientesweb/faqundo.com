export function generateJsonLd(): Record<string, any>[] {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Faqundo Pérez - Viajero en Moto",
    url: "https://faqundoperez.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://faqundoperez.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faqundo Pérez",
    url: "https://faqundoperez.com",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og-image.jpg-HzYqcwNFeVHg5rtmpIr7EPvDQIwAJp.jpeg",
    sameAs: [
      "https://www.youtube.com/@faqundoperez",
      "https://www.instagram.com/faqu_perez",
      "https://www.tiktok.com/@faquperez",
      "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    ],
    jobTitle: "Viajero y Creador de Contenido",
    worksFor: {
      "@type": "Organization",
      name: "Bitácora Podcast",
    },
    description: "Viajero en moto, constructor de casa rural y narrador de historias argentinas.",
  }

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "La Patagonia en Dos Ruedas",
    author: {
      "@type": "Person",
      name: "Faqundo Pérez",
    },
    url: "https://a.co/d/2irFtsV",
    workExample: {
      "@type": "Book",
      isbn: "9781234567897",
      bookFormat: "https://schema.org/Paperback",
      potentialAction: {
        "@type": "ReadAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://a.co/d/2irFtsV",
        },
      },
    },
  }

  const podcastJsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Bitácora Podcast",
    description:
      "Historias únicas, vidas diferentes. Explorando experiencias que nos muestran el mundo desde otras perspectivas.",
    url: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    webFeed: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
    author: {
      "@type": "Person",
      name: "Faqundo Pérez",
    },
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bitacora.png-cnNJPBH7ecL3cGdBNlSYvH734KMbQY.jpeg",
  }

  return [websiteJsonLd, personJsonLd, bookJsonLd, podcastJsonLd]
}

export default function JsonLd() {
  return (
    <>
      {generateJsonLd().map((jsonLd, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
    </>
  )
}

