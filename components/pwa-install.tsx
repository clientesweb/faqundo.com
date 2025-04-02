"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"

export default function PWAInstall() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Detectar si la app puede ser instalada
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevenir que Chrome muestre la mini-infobar
      e.preventDefault()
      // Guardar el evento para usarlo después
      setDeferredPrompt(e)
      // Mostrar nuestro propio botón de instalación
      setShowInstallPrompt(true)
    })

    // Detectar si la app ya está instalada
    window.addEventListener("appinstalled", () => {
      // Ocultar nuestro botón de instalación
      setShowInstallPrompt(false)
      // Limpiar el prompt diferido
      setDeferredPrompt(null)
      console.log("PWA instalada con éxito")
    })

    // Verificar si la app ya está instalada
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallPrompt(false)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Mostrar el prompt de instalación
    deferredPrompt.prompt()

    // Esperar a que el usuario responda al prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`Usuario respondió al prompt de instalación: ${outcome}`)

    // Ya no necesitamos el prompt, lo limpiamos
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-card shadow-lg rounded-lg p-4 z-50 border border-border">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">Instalar aplicación</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowInstallPrompt(false)} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        Instala esta aplicación en tu dispositivo para acceder más rápido y usarla sin conexión.
      </p>
      <Button onClick={handleInstallClick} className="w-full bg-accent hover:bg-accent/90">
        <Download className="mr-2 h-4 w-4" />
        Instalar
      </Button>
    </div>
  )
}

