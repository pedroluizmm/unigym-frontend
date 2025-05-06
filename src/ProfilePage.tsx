"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, Edit2, User, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"

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
  password: string
  phone: string
  weight: number
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [navigate])

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "João Silva",
    age: 28,
    email: localStorage.getItem("userEmail") || "joao.silva@email.com",
    password: "********",
    phone: "(11) 98765-4321",
    weight: 75,
  })

  const [editForm, setEditForm] = useState<UserProfile>({ ...userProfile })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "5 Dias Consecutivos",
      description: "Treinou por 5 dias consecutivos",
      icon: "🔥",
      unlocked: true,
    },
    {
      id: 2,
      title: "Primeiro Treino",
      description: "Completou seu primeiro treino",
      icon: "🎯",
      unlocked: true,
    },
    {
      id: 3,
      title: "Superação de Peso",
      description: "Aumentou o peso em um exercício",
      icon: "💪",
      unlocked: true,
    },
    {
      id: 4,
      title: "10 Treinos Completos",
      description: "Completou 10 treinos",
      icon: "🏆",
      unlocked: false,
      progress: 7,
      total: 10,
    },
    {
      id: 5,
      title: "30 Dias de Treino",
      description: "Treinou por 30 dias no total",
      icon: "📅",
      unlocked: false,
      progress: 18,
      total: 30,
    },
    {
      id: 6,
      title: "Mestre do Fitness",
      description: "Completou todos os tipos de treino",
      icon: "👑",
      unlocked: false,
      progress: 2,
      total: 3,
    },
  ])

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUserProfile(editForm)
    setIsEditDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm({
      ...editForm,
      [name]: name === "age" || name === "weight" ? Number(value) : value,
    })
  }

  const goToHome = () => {
    navigate("/")
  }

  const goToStudentArea = () => {
    navigate("/student-area")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    navigate("/login")
  }

  return (
    <main className="min-h-screen flex flex-col bg-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-700 shadow-md text-white">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">UniGym</h1>
        </div>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
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
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToHome()
              }}
            >
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Professores
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToStudentArea()
              }}
            >
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                navigate("/schedule")
              }}
            >
              Horários
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 text-red-500"
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
      <section className="p-6 flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center mb-4 relative">
          <User className="h-12 w-12 text-white" />
          <button
            className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{userProfile.name}</h2>
          <p className="text-blue-100">{userProfile.age} anos</p>
        </div>
      </section>

      <div className="h-2 bg-blue-700 mx-4 rounded-full my-4"></div>

      {/* Achievements Section */}
      <section className="px-4 pb-6">
        <h3 className="text-xl font-bold mb-4 text-center">Conquistas</h3>
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-blue-700 rounded-lg p-4 flex items-center gap-4 ${achievement.unlocked ? "opacity-100" : "opacity-80"
                }`}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-blue-200">{achievement.description}</p>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-2 bg-blue-800 rounded-full w-full mt-1">
                      <div
                        className="h-2 bg-blue-400 rounded-full"
                        style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-blue-200 mt-1 block">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Editar Perfil</h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-gray-700">Idade</label>
              <input
                type="number"
                id="age"
                name="age"
                value={editForm.age}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={editForm.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Celular</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editForm.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium text-gray-700">Peso (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={editForm.weight}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                min="1"
                step="0.1"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
