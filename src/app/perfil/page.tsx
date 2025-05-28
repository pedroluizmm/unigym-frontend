"use client"

import { useEffect, useState } from "react"
import { getMyProfile, type Usuario } from "@/services/api"

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Auxiliar para gerar iniciais
  const getInitials = (name: string = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await getMyProfile()
        setUsuario(res.data)
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Erro ao carregar perfil")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-medium">Carregando perfil…</p>
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

  if (!usuario) return null

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <a href="/dashboard" className="mr-4 p-2 rounded-full text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </a>
        <h1 className="text-xl font-bold text-blue-600">Perfil</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-blue-600">{getInitials(usuario.nome)}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{usuario.nome}</h2>
              <p className="text-blue-600 font-medium">{usuario.email}</p>
            </div>
            <button className="p-2 rounded-full bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium mb-1">Idade</p>
              <p className="font-bold text-xl text-blue-700">{usuario.idade ?? "-"} anos</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium mb-1">Altura</p>
              <p className="font-bold text-xl text-blue-700">{usuario.altura ? `${usuario.altura} m` : "-"}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium mb-1">Peso</p>
              <p className="font-bold text-xl text-blue-700">{usuario.peso ? `${usuario.peso} kg` : "-"}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium mb-1">Objetivo</p>
              <p className="font-bold text-xl text-blue-700">{usuario.objetivo ?? "-"}</p>
            </div>
          </div>

          <a
            href="/conquistas"
            className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-4 shadow-sm"
          >
            Ver Conquistas
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Preferências de Treino</h2>
          <div className="space-y-4">
            {["diasTreino", "duracaoTreino", "focoTreino"].map((field) => (
              <div key={field} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">
                    {field === "diasTreino"
                      ? "Dias de treino"
                      : field === "duracaoTreino"
                        ? "Duração preferida"
                        : "Foco do treino"}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {Array.isArray((usuario as any)[field])
                      ? (usuario as any)[field].join(", ")
                      : (usuario as any)[field] ?? "-"}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
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
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Configurações</h2>
          <div className="space-y-4">
            {[
              { label: "Notificações", value: "Ativadas", toggle: true },
              { label: "Tema", value: "Claro" },
              { label: "Idioma", value: "Português" },
            ].map(({ label, value, toggle }) => (
              <div key={label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{label}</h3>
                  <p className="text-blue-600 font-medium">{value}</p>
                </div>
                {toggle ? (
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                ) : (
                  <div className="p-2 rounded-full bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
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
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
