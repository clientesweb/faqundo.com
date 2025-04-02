"use client"

import Image from "next/image"
import { Bike, HardHat, Tent, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  }

  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Sobre Mí
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8 md:mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-base md:text-lg leading-relaxed">
              ¡Hola! Soy Faqundo y recorro Argentina en moto 🏍️ compartiendo historias, construyendo mi casita rural y
              mostrando gente con pasión por lo que hace.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Mi misión es documentar la belleza de Argentina, sus paisajes, su gente y sus historias. A través de mis
              videos, quiero inspirar a otros a explorar, descubrir y apreciar la riqueza cultural y natural de nuestro
              país.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Con más de 10,000 suscriptores y 172 videos, estoy construyendo una comunidad de personas que comparten mi
              pasión por los viajes, la naturaleza y las historias auténticas.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                className="flex items-center space-x-2 md:space-x-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Bike className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                <span className="font-medium text-sm md:text-base">Viajero</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 md:space-x-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <HardHat className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                <span className="font-medium text-sm md:text-base">Constructor</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 md:space-x-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Tent className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                <span className="font-medium text-sm md:text-base">Aventurero</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 md:space-x-3"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Mic className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                <span className="font-medium text-sm md:text-base">Storyteller</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="absolute -top-4 -left-4 w-full h-full bg-secondary rounded-lg"></div>
            <Card className="relative z-10 overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/images/hero.jpeg"
                  alt="Facu Pérez con su moto Royal Enfield Himalayan"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="overflow-hidden h-full border-gradient">
              <div className="h-40 overflow-hidden relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SaveInsta.to_244204736_229894462513855_5237425262680844341_n.jpg-MrKmcgggOkRMDCir9n2Yfvurwuy09b.jpeg"
                  alt="Viajes en moto"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Viajes en Moto</h3>
                <p className="text-muted-foreground">
                  Recorro Argentina en mi Royal Enfield Himalayan, descubriendo lugares increíbles y compartiendo la
                  experiencia a través de mis videos.
                </p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span>+50 destinos</span>
                    <span>+45,000 km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="overflow-hidden h-full border-gradient">
              <div className="h-40 overflow-hidden relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-t0RHqGJVbnVkARPBjbiYEyegPjbPEI.jpeg"
                  alt="Construcción rural"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Construcción Rural</h3>
                <p className="text-muted-foreground">
                  Estoy construyendo mi propia casa rural, documentando todo el proceso y compartiendo técnicas y
                  aprendizajes.
                </p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span>Bioconstrucción</span>
                    <span>Autosustentable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 },
            }}
          >
            <Card className="overflow-hidden h-full border-gradient">
              <div className="h-40 overflow-hidden relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo%20%282%29-faM8Ljb177IkIqauKHKhXap3W48f1O.jpeg"
                  alt="Historias auténticas"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Historias Auténticas</h3>
                <p className="text-muted-foreground">
                  Conozco y entrevisto a personas con pasión por lo que hacen, mostrando sus historias y oficios
                  tradicionales.
                </p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between text-sm">
                    <span>Oficios tradicionales</span>
                    <span>Cultura local</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

