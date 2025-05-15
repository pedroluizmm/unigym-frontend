"use client"

import { useState, useEffect } from "react"
import { Menu, Dumbbell, Home, History, User, Award, HelpCircle, X } from "lucide-react"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Fecha a sidebar automaticamente em telas pequenas quando o componente é montado
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    // Configura o estado inicial baseado no tamanho da tela
    handleResize()

    // Adiciona listener para redimensionamento
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex min-h-screen md:h-screen bg-gray-50">
      {/* Overlay para telas pequenas quando o sidebar está aberto */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky top-0 left-0 h-full w-64 bg-blue-600 text-white z-30 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:z-10
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">UniGym</h1>
        </div>

        {/* Links de navegação */}
        <nav className="flex-1 py-6">
          <ul className="space-y-4 px-4">
            <li>
              <a
                href="/dashboard"
                className="flex items-center py-3 px-4 rounded-md bg-blue-700 hover:bg-blue-500 transition-colors"
              >
                <Home className="h-5 w-5 mr-3" />
                <span className="text-base">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/exercicio"
                className="flex items-center py-3 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                <Dumbbell className="h-5 w-5 mr-3" />
                <span className="text-base">Exercícios</span>
              </a>
            </li>
            <li>
              <a
                href="/historico"
                className="flex items-center py-3 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                <History className="h-5 w-5 mr-3" />
                <span className="text-base">Histórico</span>
              </a>
            </li>
            <li>
              <a href="/perfil" className="flex items-center py-3 px-4 rounded-md hover:bg-blue-500 transition-colors">
                <User className="h-5 w-5 mr-3" />
                <span className="text-base">Perfil</span>
              </a>
            </li>
            <li>
              <a
                href="/conquistas"
                className="flex items-center py-3 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                <Award className="h-5 w-5 mr-3" />
                <span className="text-base">Conquistas</span>
              </a>
            </li>
            <li>
              <a
                href="/faq-dicas"
                className="flex items-center py-3 px-4 rounded-md hover:bg-blue-500 transition-colors"
              >
                <HelpCircle className="h-5 w-5 mr-3" />
                <span className="text-base">FAQ e Dicas</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Botão de fechar (apenas mobile) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-md hover:bg-blue-500 md:hidden"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Perfil do usuário */}
        <div className="p-6 border-t border-blue-500 mt-auto">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold text-lg">MS</span>
            </div>
            <div>
              <p className="font-medium text-base">Maria Silva</p>
              <p className="text-sm text-blue-200">Aluno</p>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 md:ml-0">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 md:ml-4">Dashboard</h1>
          </div>
        </header>

        <main className="p-6">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Seus Treinos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="/exercicio" className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Treino A - Peito e Tríceps</h3>
                    <p className="text-sm text-gray-500">8 exercícios • 45 min</p>
                  </div>
                </div>
              </a>

              <div className="bg-white rounded-lg shadow p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Treino B - Costas e Bíceps</h3>
                    <p className="text-sm text-gray-500">7 exercícios • 40 min</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Progresso Recente</h2>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="h-60 bg-gray-100 rounded flex items-center justify-center mb-6">
                <p className="text-gray-500">Gráfico de progresso</p>
              </div>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Treinos</p>
                  <p className="text-xl font-bold text-blue-600">12</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Calorias</p>
                  <p className="text-xl font-bold text-blue-600">4.800</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Tempo</p>
                  <p className="text-xl font-bold text-blue-600">8h 30m</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Próximos Treinos</h2>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="border-l-4 border-blue-600 pl-4 py-2 mb-4">
                <p className="font-medium">Treino C - Pernas</p>
                <p className="text-sm text-gray-500">Amanhã • 18:00</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-medium">Treino A - Peito e Tríceps</p>
                <p className="text-sm text-gray-500">Quinta-feira • 18:00</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
