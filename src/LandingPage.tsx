"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Refs para scroll
  const aboutRef = useRef<HTMLDivElement>(null)
  const teachersRef = useRef<HTMLDivElement>(null)

  const carouselItems = [
    {
      title: "Execução de exercícios",
      description: "Aprenda a executar exercícios com a técnica correta",
    },
    {
      title: "Treinos personalizados",
      description: "Treinos adaptados para suas necessidades",
    },
    {
      title: "Acompanhamento",
      description: "Acompanhamento profissional para seu progresso",
    },
  ]

  const teachers = [
    {
      name: "João Pereira",
      specialization: "Musculação",
      experience: "8 anos de experiência",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Carla Santos",
      specialization: "Treino Funcional",
      experience: "12 anos de experiência",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Rafael Oliveira",
      specialization: "Nutrição Esportiva",
      experience: "5 anos de experiência",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const goToStudentArea = () => {
    navigate("/login")
  }

  const goToProfile = () => {
    navigate("/login")
  }

  const goToSchedule = () => {
    navigate("/schedule")
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      setIsMenuOpen(false)
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" })
      }
    }

  return (
    <main className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-sm">
        <h1 className="text-xl font-bold">UnyGym</h1>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => scrollToSection(aboutRef)}
            >
              Sobre nós
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => scrollToSection(teachersRef)}
            >
              Professores
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToProfile()
              }}
            >
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToStudentArea()
              }}
            >
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToSchedule()
              }}
            >
              Horários
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Carousel Section */}
      <section className="w-full bg-blue-900 p-4 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-4 flex flex-col items-center justify-center text-center min-h-[180px]">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
            <CarouselPrevious className="relative h-8 w-8 rounded-full border border-gray-300 bg-white shadow-sm" />
            <CarouselNext className="relative h-8 w-8 rounded-full border border-gray-300 bg-white shadow-sm" />
          </div>
        </Carousel>
      </section>

      {/* Description Section */}
      <section className="p-4 text-center bg-gray-800">
        <p className="text-sm">
          UnyGym é seu parceiro para alcançar resultados. Acesse sua área de aluno agora e comece sua jornada fitness.
        </p>
      </section>

      {/* Card Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2">
        <Button
          variant="outline"
          className="h-24 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center rounded-md border border-gray-600 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
          onClick={goToSchedule}
        >
          <span className="font-medium">Horários</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center rounded-md border border-gray-600 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
        >
          <span className="font-medium">Como chegar?</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center rounded-md border border-gray-600 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
          onClick={goToStudentArea}
        >
          <span className="font-medium">Área do Aluno</span>
        </Button>
      </section>

      {/* Teachers Section */}
      <section ref={teachersRef} className="py-12 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-center">Nossos Professores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-600 flex items-center justify-center">
                <img
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                <p className="text-blue-300 mb-1">{teacher.specialization}</p>
                <p className="text-gray-300 text-sm">{teacher.experience}</p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Solicitar série</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-12 px-4 bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 text-center">Sobre Nós</h2>
        <div className="max-w-3xl mx-auto text-gray-300">
          <p className="mb-4">
            Somos um grupo de estudantes de Ciência da Computação comprometidos em desenvolver soluções tecnológicas
            para melhorar a experiência fitness. O UnyGym é uma proposta de plataforma digital que visa facilitar o
            gerenciamento de atividades físicas e aprimorar a comunicação entre alunos e professores de academias.
          </p>
          <p className="mb-4">
            Nosso objetivo é criar uma solução viável e acessível que possa ser implementada em academias de diferentes
            portes, proporcionando uma experiência mais personalizada e eficiente para os praticantes de atividades
            físicas.
          </p>
          <p className="mb-4">
            Este projeto foi desenvolvido como parte de nossa formação acadêmica, aplicando conceitos de desenvolvimento
            web, experiência do usuário e sistemas de informação para criar uma plataforma funcional e intuitiva.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 text-gray-400 text-center">
        <p>© 2023 UnyGym | Desenvolvido por Estudantes de Ciência da Computação</p>
      </footer>
    </main>
  )
}
