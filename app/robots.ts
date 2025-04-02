import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/", "/_next/"],
    },
    sitemap: "https://faqundoperez.com/sitemap.xml",
    host: "https://faqundoperez.com",
  }
}

