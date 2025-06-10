"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listUsers, type Usuario } from "@/services/api"

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    listUsers()
      .then((res) => {
        const profs = res.data.filter(
          (u) => (u as any).role?.toLowerCase() === "professor"
        )
        setProfessores(profs)
      })
      .catch((err) =>
        setError(err.response?.data?.message || err.message || "Erro ao carregar professores")
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-blue-600 font-medium">Carregando…</p>
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
        <Link to="/" className="mr-4 p-2 rounded-full text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-blue-600">Professores</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {professores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {professores.map((prof) => (
              <div key={prof._id} className="text-center bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border border-blue-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{prof.nome}</h3>
                {prof.email && (
                  <p className="text-blue-600 font-medium text-xs sm:text-sm mb-1">{prof.email}</p>
                )}
                {prof.telefone && (
                  <p className="text-gray-600 text-xs sm:text-sm">{prof.telefone}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-blue-600">Nenhum professor encontrado.</p>
        )}
      </main>
    </div>
  )
}

