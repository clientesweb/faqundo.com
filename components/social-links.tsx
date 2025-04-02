"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FontAwesomeIcon, faYoutube, faInstagram, faSpotify, faTiktok, faEnvelope } from "./icons/font-awesome-icons"

interface SocialLinksProps {
  className?: string
  iconColor?: string
}

export default function SocialLinks({ className = "", iconColor = "currentColor" }: SocialLinksProps) {
  const socialLinks = [
    {
      href: "https://www.tiktok.com/@faquperez",
      icon: faTiktok,
      label: "TikTok",
      delay: 0,
    },
    {
      href: "https://www.instagram.com/faqu_perez",
      icon: faInstagram,
      label: "Instagram",
      delay: 0.1,
    },
    {
      href: "https://www.youtube.com/@faqundoperez",
      icon: faYoutube,
      label: "YouTube",
      delay: 0.2,
    },
    {
      href: "https://open.spotify.com/show/5wN4BV8WeAtgH8rcy0hePR",
      icon: faSpotify,
      label: "Spotify",
      delay: 0.3,
    },
    {
      href: "mailto:contactofeperez@gmail.com",
      icon: faEnvelope,
      label: "Email",
      delay: 0.4,
    },
  ]

  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      {socialLinks.map((social) => (
        <motion.div
          key={social.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: social.delay }}
          whileHover={{ scale: 1.2, rotate: 5 }}
        >
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
              social.label === "YouTube"
                ? "hover:bg-red-600/20"
                : social.label === "Instagram"
                  ? "hover:bg-pink-600/20"
                  : social.label === "Spotify"
                    ? "hover:bg-green-600/20"
                    : social.label === "TikTok"
                      ? "hover:bg-gray-800/20"
                      : "hover:bg-accent/20"
            }`}
          >
            <FontAwesomeIcon icon={social.icon} className="h-6 w-6 md:h-7 md:w-7" style={{ color: iconColor }} />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

