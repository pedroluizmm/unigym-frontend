"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getTreinoExercicio, updateTreino, type TreinoExercicio } from "@/services/api"

export default function ExercicioPage() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()

  const [item, setItem] = useState<TreinoExercicio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [marking, setMarking] = useState(false)

  useEffect(() => {
    if (!id) return
    getTreinoExercicio(id)
      .then((res) => setItem(res.data))
      .catch((err) => setError(err.message || "Erro ao carregar exercício"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando exercício…</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-red-200">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )

  if (!item) return null

  const { exercicio, series, repeticoes, tempoIntervalo, treino } = item

  const handleMarcarConcluido = async () => {
    if (!treino || marking) return
    setMarking(true)
    try {
      await updateTreino(treino._id, { statusTreino: "concluído" })
      nav("/treino")
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.message || "Falha ao marcar concluído")
    } finally {
      setMarking(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <Link to="/treino" className="mr-4 p-2 rounded-full text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-blue-600">{exercicio.nome}</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="h-64 bg-gray-100 flex items-center justify-center">
            {exercicio.imagemUrl ? (
              <img
                src={exercicio.imagemUrl || "/placeholder.svg"}
                alt={exercicio.nome}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white bg-blue-600 rounded-full p-4"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            )}
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-blue-600">{exercicio.nome}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{exercicio.descricao}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-medium mb-1">Séries</p>
                <p className="font-bold text-2xl text-blue-700">{series}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-medium mb-1">Repetições</p>
                <p className="font-bold text-2xl text-blue-700">{repeticoes}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-600 font-medium mb-1">Descanso</p>
                <p className="font-bold text-2xl text-blue-700">{tempoIntervalo || "–"}</p>
              </div>
            </div>

            <button
              onClick={handleMarcarConcluido}
              disabled={marking}
              className="w-full bg-blue-600 text-white text-center font-bold rounded-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center justify-center"
            >
              {marking ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Marcando…
                </div>
              ) : (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Marcar como Concluído
                </div>
              )}
            </button>
          </div>
        </div>

        {exercicio.grupoMuscular && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
              <h3 className="font-bold text-gray-900">Grupo Muscular</h3>
            </div>
            <p className="text-blue-600 font-medium text-lg bg-blue-50 px-4 py-2 rounded-lg inline-block">
              {exercicio.grupoMuscular}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
