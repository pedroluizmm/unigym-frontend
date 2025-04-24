"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel"

function App() {
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
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300">
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
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Serviços
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Contato
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Carousel Section */}
      <section className="w-full bg-pink-200 p-4 relative">
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
      <section className="p-4 text-center bg-white">
        <p className="text-sm">
          Descrição do site falando sobre as funcionalidades e uma mensagem que incentive o uso imediato
        </p>
      </section>

      {/* Card Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-2">
        <Button
          variant="outline"
          className="h-24 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-md border border-gray-300 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
        >
          <span className="font-medium">Horários</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-md border border-gray-300 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
        >
          <span className="font-medium">Como chegar?</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 bg-gray-100 hover:bg-gray-200 flex items-center justify-center rounded-md border border-gray-300 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
        >
          <span className="font-medium">Área do Aluno</span>
        </Button>
      </section>
    </main>
  )
}

export default App
