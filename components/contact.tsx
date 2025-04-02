"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AtSign, MapPinned, SendHorizonal, PhoneCall } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Crear el cuerpo del email con los datos del formulario
    const subject = encodeURIComponent(formData.subject)
    const body = encodeURIComponent(`
Nombre: ${formData.name}

Email: ${formData.email}

Mensaje: ${formData.message}
  `)

    // Abrir el cliente de correo del usuario con los datos predefinidos
    window.location.href = `mailto:contactofeperez@gmail.com?subject=${subject}&body=${body}`

    // Mostrar toast de confirmación
    toast({
      title: "¡Redirigiendo a tu cliente de correo!",
      description: "Se abrirá tu cliente de correo para enviar el mensaje.",
      duration: 5000,
    })

    // Limpiar el formulario
    setFormData({ name: "", email: "", subject: "", message: "" })
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
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Contacto
        </motion.h2>

        <motion.div
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 font-heading">¡Hablemos!</h3>
            <p className="text-base md:text-lg mb-6 md:mb-8">
              ¿Tienes alguna pregunta, propuesta de colaboración o simplemente quieres saludar? ¡No dudes en
              contactarme! Estoy siempre abierto a nuevas ideas y proyectos.
            </p>

            <div className="space-y-6">
              <motion.div className="flex items-start space-x-4" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <AtSign className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <a
                    href="mailto:contactofeperez@gmail.com"
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    contactofeperez@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <MapPinned className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-bold">Ubicación</h4>
                  <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-4" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <PhoneCall className="h-6 w-6 text-secondary mt-1" />
                <div>
                  <h4 className="font-bold">Redes Sociales</h4>
                  <p className="text-muted-foreground">
                    Sígueme en mis redes sociales para estar al día con mis aventuras.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-gradient">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre"
                        className="transition-all duration-300 focus:border-accent focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className="transition-all duration-300 focus:border-secondary focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Asunto
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Asunto del mensaje"
                        className="transition-all duration-300 focus:border-secondary focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Escribe tu mensaje aquí..."
                        rows={5}
                        className="transition-all duration-300 focus:border-secondary focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full btn-primary btn-animated" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Enviar Mensaje
                          <SendHorizonal className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

