"use client"

import { useEffect, useState } from "react"
import { getHistorico, type Historico } from "@/services/api"

export default function HistoricoPage() {
  const [data, setData] = useState<Historico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ; (async () => {
      try {
        setLoading(true)
        const res = await getHistorico()
        setData(res.data.sort((a, b) => new Date(b.dataRealizacao).getTime() - new Date(a.dataRealizacao).getTime()))
      } catch (err: any) {
        console.error(err)
        setError("Falha ao carregar histórico")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando histórico…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  const recentes = data.slice(0, 3)

  const totalTreinos = data.length
  const totalExercicios = data.reduce((sum, h) => sum + (h.treino.exercicios || 0), 0)
  const totalCalorias = data.reduce((sum, h) => sum + (h.treino.calorias || 0), 0)
  const tempoDisplay = `${Math.floor(totalCalorias / 60)}h`  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <a href="/dashboard" className="mr-4 p-2 rounded-full text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <h1 className="text-xl font-bold text-blue-600">Histórico</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Progresso</h2>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4 border border-blue-200">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-blue-400 mx-auto mb-2"
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
              <p className="text-blue-600 font-medium">Gráfico de progresso</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Atividades Recentes</h2>
          <div className="space-y-4">
            {recentes.length > 0 ? (
              recentes.map((h) => {
                const date = new Date(h.dataRealizacao)
                const diff = Date.now() - date.getTime()
                let label = "Há pouco"
                if (diff > 86400000 && diff < 172800000) label = "Ontem"
                else if (diff >= 172800000) label = `${Math.floor(diff / 86400000)} dias atrás`

                return (
                  <div key={h._id} className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-r-xl">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-gray-900">{h.treino.nome}</h3>
                      <span className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-blue-600 font-medium bg-white px-2 py-1 rounded-full">
                        {h.treino.exercicios} exercícios
                      </span>
                      <span className="text-blue-600 font-medium bg-white px-2 py-1 rounded-full">
                        {h.treino.tempo}
                      </span>
                      <span className="text-blue-600 font-medium bg-white px-2 py-1 rounded-full">
                        {h.treino.calorias} kcal
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <p className="text-blue-600 font-medium">Nenhuma atividade recente</p>
                <p className="text-blue-400 mt-1">Comece um treino para ver seu histórico aqui</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Estatísticas</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-600 font-medium mb-1">Total de Treinos</p>
              <p className="text-2xl font-bold text-blue-700">{totalTreinos}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-sm text-green-600 font-medium mb-1">Calorias Queimadas</p>
              <p className="text-2xl font-bold text-green-700">{totalCalorias}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <p className="text-sm text-purple-600 font-medium mb-1">Tempo Total</p>
              <p className="text-2xl font-bold text-purple-700">{tempoDisplay}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-sm text-orange-600 font-medium mb-1">Exercícios</p>
              <p className="text-2xl font-bold text-orange-700">{totalExercicios}</p>
            </div>
          </div>

          <a
            href="/perfil"
            className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-4 shadow-sm"
          >
            Ver Perfil Completo
          </a>
        </div>
      </main>
    </div>
  )
}
