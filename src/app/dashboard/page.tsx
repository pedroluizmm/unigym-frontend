"use client"

import { useState, useEffect } from "react"
import { fetchDashboardData, type Treino, type Progresso, type ProximoTreino, type Usuario } from "@/services/api"
import { Menu, Dumbbell } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [progresso, setProgresso] = useState<Progresso | null>(null)
  const [proximosTreinos, setProximosTreinos] = useState<ProximoTreino[]>([])
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true)
        const { data } = await fetchDashboardData()
        setTreinos(data.treinos)
        setProgresso(data.progresso)
        setProximosTreinos(data.proximosTreinos)
        setUsuario(data.usuario)
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={usuario || undefined} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-full text-blue-600 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-blue-600 lg:ml-0">Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Olá, {usuario?.nome?.split(" ")[0] || "Usuário"}! 👋
                </h2>
                <p className="text-sm sm:text-base text-gray-600">Pronto para mais um treino incrível?</p>
              </div>
              <div className="hidden sm:block">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Seus Treinos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {treinos.length > 0 ? (
                treinos.map((treino) => (
                  <a
                    key={treino.id}
                    href="/exercicio"
                    className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 block"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 sm:p-3 rounded-xl border border-blue-200 flex-shrink-0">
                        <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                      </div>
                      <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{treino.nome}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mt-1">
                          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                            {treino.exercicios} exercícios
                          </span>
                          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                            {treino.tempo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">Nenhum treino disponível</p>
                  <p className="text-blue-400 mt-1 text-xs sm:text-sm">Entre em contato com seu treinador</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Progresso Recente</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
              <div className="h-40 sm:h-60 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-blue-200">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">Gráfico de progresso</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Treinos</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">{progresso?.treinos || 0}</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-xs sm:text-sm text-green-600 font-medium mb-1">Calorias</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-700">{progresso?.calorias || 0}</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs sm:text-sm text-purple-600 font-medium mb-1">Tempo</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-700">{progresso?.tempo || "0h 0m"}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Próximos Treinos</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
              {proximosTreinos.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {proximosTreinos.map((t, i) => (
                    <div
                      key={i}
                      className={`border-l-4 pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-xl ${i === 0 ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
                        }`}
                    >
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{t.nome}</p>
                      <p className="text-blue-600 font-medium text-xs sm:text-sm">{t.horario}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-600 font-medium text-sm sm:text-base">Nenhum treino agendado</p>
                  <p className="text-blue-400 mt-1 text-xs sm:text-sm">Seus próximos treinos aparecerão aqui</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
