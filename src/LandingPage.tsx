"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
        <h1 className="text-xl font-bold">UnyGym</h1>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start">
              Início
            </Button>
            <Button variant="ghost" className="justify-start">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start">
              Serviços
            </Button>
            <Button variant="ghost" className="justify-start">
              Contato
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Carousel Section */}
      <section className="w-full bg-pink-200 p-4">
        <Carousel>
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="p-4 flex flex-col items-center justify-center text-center min-h-[150px]">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </section>

      {/* Description Section */}
      <section className="p-4 text-center bg-white">
        <p className="text-sm">
          Descrição do site falando sobre as funcionalidades e uma mensagem que incentive o uso imediato
        </p>
      </section>

      {/* Card Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2">
        <Button variant="outline" className="h-24 bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
          <span className="font-medium">Horários</span>
        </Button>

        <Button variant="outline" className="h-24 bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
          <span className="font-medium">Como chegar?</span>
        </Button>

        <Button variant="outline" className="h-24 bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
          <span className="font-medium">Área do Aluno</span>
        </Button>
      </section>
    </main>
  )
}
