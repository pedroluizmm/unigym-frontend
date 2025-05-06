"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Edit2, User, Award, ChevronLeft } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"
import "./ProfilePage.css"

// importação das funções de API
import { getProfile, updateProfile, getAchievements } from "@/services/api"

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  total?: number
}

interface UserProfile {
  name: string
  age: number
  email: string
  phone: string
  weight: number
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const token = localStorage.getItem("token")!

  // estados de dados
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({})
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [error, setError] = useState<string | null>(null)

  // Verificar se o usuário está logado e carregar dados
  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    getProfile(token)
      .then((profile) => {
        setUserProfile(profile)
        setEditForm(profile)
      })
      .catch(() => {
        navigate("/login")
      })
    getAchievements(token)
      .then(setAchievements)
      .catch(() => {
        /* falha silenciosa */
      })
  }, [navigate, token])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "age" || name === "weight" ? Number(value) : value,
    }))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userProfile) return
    setError(null)
    try {
      const updated = await updateProfile(token, editForm as UserProfile)
      setUserProfile(updated)
      setEditForm(updated)
      setIsEditDialogOpen(false)
    } catch (err: any) {
      setError(err.message || "Erro ao salvar perfil")
    }
  }

  const goToHome = () => navigate("/")
  const goToStudentArea = () => navigate("/student-area")
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    navigate("/login")
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-600">
        <p className="text-center text-white text-lg">Carregando...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-700 shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={goToStudentArea} className="p-1 rounded-full hover:bg-blue-600 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">UniGym</h1>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Menu"
          className="p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToHome()
              }}
            >
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Professores
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3 bg-gray-100"
            >
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToStudentArea()
              }}
            >
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                navigate("/schedule")
              }}
            >
              Horários
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3 text-red-500"
              onClick={() => {
                setIsMenuOpen(false)
                handleLogout()
              }}
            >
              Sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Section */}
      <section className="bg-blue-600 px-6 pt-8 pb-6">
        <div className="flex items-center justify-center relative mb-4">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white">
            <User className="h-12 w-12 text-white" />
          </div>
          <button
            className="absolute bottom-0 right-1/3 bg-white text-blue-600 p-2 rounded-full shadow-lg"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
          <p className="text-blue-100">{userProfile.age} anos</p>
        </div>
      </section>

      <div className="flex-1 bg-gray-50 text-gray-900 rounded-t-3xl px-4 py-6">
        {/* Achievements Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Conquistas</h3>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl shadow-sm border ${achievement.unlocked ? "bg-white border-blue-200" : "bg-gray-100 border-gray-200"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-500"
                      }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.unlocked ? "text-gray-800" : "text-gray-500"}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? "text-gray-600" : "text-gray-400"}`}>
                      {achievement.description}
                    </p>
                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.total}
                          </span>
                          <span className="text-xs text-gray-500">
                            {Math.round((achievement.progress / achievement.total!) * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Editar Perfil</h3>
          {error && <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-md">{error}</div>}
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editForm.name || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-gray-700">
                Idade
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={editForm.age || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userProfile.email}
                disabled
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Celular
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editForm.phone || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Peso (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={editForm.weight || ""}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                step="0.1"
                required
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
                Salvar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
