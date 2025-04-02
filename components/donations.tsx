"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Plataformas de donación
const donationPlatforms = [
  {
    id: "mercadopago",
    name: "Mercado Pago",
    description: "Apóyame a través de Mercado Pago",
    logo: "/images/mercadopago-logo.svg",
    color: "bg-[#009ee3]",
    link: "https://link.mercadopago.com.ar/faqundoperez",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Contribuye a mis proyectos con PayPal",
    logo: "/images/paypal-logo.png",
    color: "bg-[#0070ba]",
    link: "https://paypal.me/FacundoPerez947",
  },
  {
    id: "cafecito",
    name: "Cafecito",
    description: "Invítame a un cafecito",
    logo: "/images/cafecito-logo.png",
    color: "bg-[#9b4f4f]",
    link: "https://cafecito.app/faqundoperez",
  },
]

// Opciones de donación
const donationOptions = [
  { amount: 5, description: "Un café ☕" },
  { amount: 10, description: "Combustible para la moto ⛽" },
  { amount: 20, description: "Materiales para la casa 🏡" },
  { amount: 50, description: "Equipo para videos 🎥" },
]

// Datos bancarios
const bankData = {
  alias: "facundoemma.mp",
  cvu: "0000003100041359482677",
  accountHolder: "Facundo Emmamuel Perez",
  bank: "Mercado Pago",
  cuit: "20400080942",
}

export default function Donations() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  // Función para copiar al portapapeles
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
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
    <section id="donations" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Apoya Mi Trabajo
        </motion.h2>

        <motion.p
          className="section-subtitle text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Si disfrutas de mi contenido y quieres apoyar mis proyectos, puedes hacer una donación. Cada aporte me ayuda a
          seguir creando y compartiendo experiencias únicas.
        </motion.p>

        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Tabs defaultValue="platforms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="platforms">Plataformas</TabsTrigger>
              <TabsTrigger value="bank">Datos Bancarios</TabsTrigger>
            </TabsList>

            <TabsContent value="platforms" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {donationPlatforms.map((platform) => (
                  <motion.div key={platform.id} variants={itemVariants}>
                    <Card className="overflow-hidden hover-card h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className={`${platform.color} p-4 text-white text-center`}>
                          <div className="w-16 h-16 mx-auto bg-white rounded-full p-2 mb-2 flex items-center justify-center">
                            <Image
                              src={platform.logo || "/placeholder.svg"}
                              alt={platform.name}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <h3 className="font-bold text-lg">{platform.name}</h3>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <p className="text-center mb-4 text-muted-foreground">{platform.description}</p>
                          <div className="mt-auto">
                            <Link href={platform.link} target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-accent hover:bg-accent/90">
                                <Heart className="mr-2 h-4 w-4" /> Donar
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-center">¿Cuánto quieres donar?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {donationOptions.map((option) => (
                        <Button
                          key={option.amount}
                          variant={selectedAmount === option.amount ? "default" : "outline"}
                          className={`h-auto py-4 flex flex-col items-center ${
                            selectedAmount === option.amount ? "bg-accent text-accent-foreground" : ""
                          }`}
                          onClick={() => setSelectedAmount(option.amount)}
                        >
                          <div className="text-2xl font-bold mb-1">${option.amount}</div>
                          <div className="text-xs text-center">
                            <span>{option.description}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        Selecciona una cantidad y luego haz clic en la plataforma de tu preferencia
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {donationPlatforms.map((platform) => (
                          <Link
                            key={platform.id}
                            href={`${platform.link}${selectedAmount ? `?amount=${selectedAmount}` : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="outline" className="flex items-center gap-2" disabled={!selectedAmount}>
                              <Image
                                src={platform.logo || "/placeholder.svg"}
                                alt={platform.name}
                                width={20}
                                height={20}
                                className="object-contain"
                              />
                              <span>{platform.name}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="bank">
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-center">Transferencia Bancaria</h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Alias</p>
                          <p className="font-medium">{bankData.alias}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(bankData.alias, "alias")}>
                          {copied === "alias" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">CVU</p>
                          <p className="font-medium">{bankData.cvu}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(bankData.cvu, "cvu")}>
                          {copied === "cvu" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Titular</p>
                        <p className="font-medium">{bankData.accountHolder}</p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Banco</p>
                        <p className="font-medium">{bankData.bank}</p>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">CUIT/CUIL</p>
                        <p className="font-medium">{bankData.cuit}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 border border-accent/30 rounded-lg bg-accent/5">
                      <p className="text-sm text-center">
                        Después de realizar tu donación, puedes enviarme un mensaje para agradecerte personalmente.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

