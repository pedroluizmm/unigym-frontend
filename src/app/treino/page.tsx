"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getTreinos, getTreinoExercicios, type TreinoModel, type TreinoExercicio } from "@/services/api"

export default function TreinosPage() {
  const [treinos, setTreinos] = useState<TreinoModel[]>([])
  const [grupos, setGrupos] = useState<string[]>([])
  const [selectedGrupo, setSelectedGrupo] = useState<string>("Todos")
  const [selectedTreino, setSelectedTreino] = useState<TreinoModel | null>(null)
  const [exs, setExs] = useState<TreinoExercicio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingExs, setLoadingExs] = useState(false)
  const [errorExs, setErrorExs] = useState<string | null>(null)

  useEffect(() => {
    getTreinos()
      .then((res) => {
        setTreinos(res.data)
        const uniq = Array.from(new Set(res.data.map((t) => t.grupamentoMuscular)))
        setGrupos(["Todos", ...uniq])
      })
      .catch((err) => setError(err.message || "Erro ao buscar treinos"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!selectedTreino) return
    setLoadingExs(true)
    getTreinoExercicios(selectedTreino._id)
      .then((res) => setExs(res.data))
      .catch((err) => setErrorExs(err.message || "Erro ao buscar exercícios"))
      .finally(() => setLoadingExs(false))
  }, [selectedTreino])

  const treinosFiltrados =
    selectedGrupo === "Todos" ? treinos : treinos.filter((t) => t.grupamentoMuscular === selectedGrupo)

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando treinos…</p>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        {selectedTreino ? (
          <button
            onClick={() => setSelectedTreino(null)}
            className="mr-4 p-2 rounded-full text-blue-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <Link to="/dashboard" className="mr-4 p-2 rounded-full text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )}
        <h1 className="text-xl font-bold text-blue-600">
          {selectedTreino ? `Exercícios: ${selectedTreino.grupamentoMuscular}` : "Treinos"}
        </h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {!selectedTreino && (
          <>
            {/* Filtros */}
            <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
              {grupos.map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedGrupo(grp)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm
                    ${grp === selectedGrupo
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border border-blue-200"
                    }`}
                >
                  {grp}
                </button>
              ))}
            </div>

            {/* Lista de sessões */}
            <div className="space-y-4">
              {treinosFiltrados.map((t) => (
                <div
                  key={t._id}
                  onClick={() => setSelectedTreino(t)}
                  className="cursor-pointer bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {t.grupamentoMuscular}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                          {formatDate(t.data)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full font-medium ${t.statusTreino === "concluído"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {t.statusTreino === "concluído" ? "concluído" : "pendente"}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 p-3 rounded-full bg-blue-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
              {treinosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.077 2.33l-.853-.853A9.967 9.967 0 0112 13c3.273 0 6.267 1.572 8.077 4.23l-.853.853A7.962 7.962 0 0112 15z"
                      />
                    </svg>
                  </div>
                  <p className="text-blue-600 font-medium text-lg">Nenhum treino neste grupo</p>
                  <p className="text-blue-400 mt-2">Tente selecionar outro grupo muscular</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Lista de exercícios */}
        {selectedTreino && (
          <div className="space-y-4">
            {loadingExs && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-blue-600 font-medium">Carregando exercícios…</p>
                </div>
              </div>
            )}
            {errorExs && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
                <p className="text-red-600 font-medium">{errorExs}</p>
              </div>
            )}
            {!loadingExs &&
              !errorExs &&
              exs.map((ex) => (
                <Link
                  key={ex._id}
                  to={`/treino/exercicio/${ex._id}`}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 block"
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{ex.exercicio.nome}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                          {ex.series} séries
                        </span>
                        <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                          {ex.repeticoes} reps
                        </span>
                        <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                          {ex.tempoIntervalo ?? "–"} descanso
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 p-3 rounded-full bg-blue-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            {!loadingExs && exs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.881-6.077 2.33l-.853-.853A9.967 9.967 0 0112 13c3.273 0 6.267 1.572 8.077 4.23l-.853.853A7.962 7.962 0 0112 15z"
                    />
                  </svg>
                </div>
                <p className="text-blue-600 font-medium text-lg">Nenhum exercício nesta sessão</p>
                <p className="text-blue-400 mt-2">Esta sessão ainda não possui exercícios cadastrados</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
