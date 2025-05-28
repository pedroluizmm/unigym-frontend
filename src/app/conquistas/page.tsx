"use client"

import { useEffect, useState } from "react"
import {
  getMyProfile,
  getConquistas,
  getUsuarioConquistas,
  type Conquista,
  type UsuarioConquista,
} from "@/services/api"

export default function ConquistasPage() {
  const [conquistas, setConquistas] = useState<Conquista[]>([])
  const [userConqs, setUserConqs] = useState<UsuarioConquista[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true)
        const perfil = await getMyProfile()
        const userId = perfil.data._id
        const [all, mine] = await Promise.all([getConquistas(), getUsuarioConquistas(userId)])

        setConquistas(all.data)
        setUserConqs(mine.data)
      } catch (err: any) {
        console.error(err)
        setError("Erro ao carregar conquistas")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando conquistas…</p>
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

  const total = conquistas.length
  const unlocked = userConqs.length
  const percent = Math.round((unlocked / total) * 100)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <a href="/dashboard" className="mr-4 p-2 rounded-full text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <h1 className="text-xl font-bold text-blue-600">Conquistas</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Resumo</h2>
            <span className="text-blue-600 font-bold text-lg bg-blue-50 px-3 py-1 rounded-full">
              {unlocked}/{total}
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full mb-4">
            <div
              className="h-4 bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-gray-600 leading-relaxed">
            Você conquistou <span className="font-bold text-blue-600">{unlocked}</span> de{" "}
            <span className="font-bold text-blue-600">{total}</span> conquistas. Continue se exercitando para
            desbloquear mais!
          </p>
        </div>

        <div className="space-y-4">
          {conquistas.map((c) => {
            const done = userConqs.some((uc) => uc.conquista._id === c._id)
            const prog = done ? 100 : 0

            return (
              <div
                key={c._id}
                className={`bg-white rounded-xl shadow-sm p-6 border-l-4 border border-gray-200 ${done ? "border-l-blue-600" : "border-l-gray-300"
                  }`}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-xl mr-4 ${done ? "bg-blue-100" : "bg-gray-100"}`}>
                    {c.iconeUrl ? (
                      <img src={c.iconeUrl || "/placeholder.svg"} className="h-8 w-8" alt={c.nome} />
                    ) : (
                      <svg
                        className={`h-8 w-8 ${done ? "text-blue-600" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${done ? "text-blue-600" : "text-gray-900"}`}>{c.nome}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{c.descricao}</p>
                    <div className="flex items-center">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full mr-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${done ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          style={{ width: `${prog}%` }}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold px-2 py-1 rounded-full ${done ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-gray-100"
                          }`}
                      >
                        {prog}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <a
          href="/faq-dicas"
          className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-4 shadow-sm"
        >
          Ver Dicas e FAQ
        </a>
      </main>
    </div>
  )
}
