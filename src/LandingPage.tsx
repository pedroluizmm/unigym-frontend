"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Menu, X, ChevronRight, MapPin, Users, Calendar } from 'lucide-react'
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
    <main className="min-h-screen flex flex-col bg-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-700 shadow-md">
        <h1 className="text-xl font-bold">UniGym</h1>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className="p-2 rounded-full hover:bg-blue-600 transition-colors">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3 bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => scrollToSection(aboutRef)}
            >
              Sobre nós
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => scrollToSection(teachersRef)}
            >
              Professores
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToProfile()
              }}
            >
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToStudentArea()
              }}
            >
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
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

      {/* Hero Section */}
      <section className="w-full bg-blue-600 p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao UniGym</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl">
          Sua plataforma completa para acompanhamento de treinos e atividades físicas
        </p>
        <Button
          className="bg-white text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-full shadow-lg"
          onClick={goToStudentArea}
        >
          Acessar Área do Aluno
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Carousel Section */}
      <section className="w-full bg-blue-700 p-6 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
                  <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                  <p className="text-blue-100 text-lg">{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
            <CarouselPrevious className="relative h-10 w-10 rounded-full border border-blue-400 bg-blue-600 text-white hover:bg-blue-500" />
            <CarouselNext className="relative h-10 w-10 rounded-full border border-blue-400 bg-blue-600 text-white hover:bg-blue-500" />
          </div>
        </Carousel>
      </section>

      {/* Description Section */}
      <section className="p-6 text-center bg-blue-800">
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          UniGym é seu parceiro para alcançar resultados. Acesse sua área de aluno agora e comece sua jornada fitness.
        </p>
      </section>
      {/* About Us Section */}
      <section ref={aboutRef} className="py-16 px-6 bg-blue-600">
        <h2 className="text-3xl font-bold mb-10 text-center">Sobre Nós</h2>
        <div className="max-w-3xl mx-auto text-blue-100 bg-blue-700 p-8 rounded-2xl shadow-lg">
          <p className="mb-4 text-lg">
            Somos um grupo de estudantes de Ciência da Computação comprometidos em desenvolver soluções tecnológicas
            para melhorar a experiência fitness. O UniGym é uma proposta de plataforma digital que visa facilitar o
            gerenciamento de atividades físicas e aprimorar a comunicação entre alunos e professores de academias.
          </p>
          <p className="mb-4 text-lg">
            Nosso objetivo é criar uma solução viável e acessível que possa ser implementada em academias de diferentes
            portes, proporcionando uma experiência mais personalizada e eficiente para os praticantes de atividades
            físicas.
          </p>
          <p className="mb-4 text-lg">
            Este projeto foi desenvolvido como parte de nossa formação acadêmica, aplicando conceitos de desenvolvimento
            web, experiência do usuário e sistemas de informação para criar uma plataforma funcional e intuitiva.
          </p>
        </div>
      </section>

      {/* Card Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mt-4">
        <Button
          variant="outline"
          className="h-32 bg-white hover:bg-blue-50 text-blue-600 flex flex-col items-center justify-center rounded-xl border-none shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl"
          onClick={goToSchedule}
        >
          <Calendar className="h-8 w-8 mb-2" />
          <span className="font-bold text-lg">Horários</span>
        </Button>

        <Button
          variant="outline"
          className="h-32 bg-white hover:bg-blue-50 text-blue-600 flex flex-col items-center justify-center rounded-xl border-none shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl"
        >
          <MapPin className="h-8 w-8 mb-2" />
          <span className="font-bold text-lg">Como chegar?</span>
        </Button>

        <Button
          variant="outline"
          className="h-32 bg-white hover:bg-blue-50 text-blue-600 flex flex-col items-center justify-center rounded-xl border-none shadow-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-xl"
          onClick={goToStudentArea}
        >
          <Users className="h-8 w-8 mb-2" />
          <span className="font-bold text-lg">Área do Aluno</span>
        </Button>
      </section>

      {/* Teachers Section */}
      <section ref={teachersRef} className="py-16 px-6 bg-gray-50 text-gray-900">
        <h2 className="text-3xl font-bold mb-10 text-center">Nossos Professores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105">
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                <img
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{teacher.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{teacher.specialization}</p>
                <p className="text-gray-600 text-sm mb-6">{teacher.experience}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Solicitar série
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Footer */}
      <footer className="py-8 px-4 bg-blue-800 text-blue-200 text-center">
        <p>© 2023 UniGym | Desenvolvido por Estudantes de Ciência da Computação</p>
      </footer>
    </main>
  )
}
