"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Edit2, User } from "lucide-react"
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
    getAchievements(token).then(setAchievements).catch(() => {
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
    return <p className="text-center text-white">Carregando...</p>
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-sm text-white">
        <h1 className="text-xl font-bold">UnyGym</h1>
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
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200" onClick={() => { setIsMenuOpen(false); goToHome(); }}>
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
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200" onClick={() => { setIsMenuOpen(false); goToStudentArea(); }}>
              Área do Aluno
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200" onClick={() => { setIsMenuOpen(false); navigate("/schedule"); }}>
              Horários
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 text-red-500" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
              Sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Section */}
      <section className="profile-section">
        <div className="profile-header">
          <div className="profile-photo">
            <User className="h-16 w-16" />
          </div>
          <button className="edit-profile-button" onClick={() => setIsEditDialogOpen(true)}>
            <Edit2 className="h-5 w-5" />
          </button>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{userProfile.name}</h2>
          <p className="profile-age">{userProfile.age} anos</p>
        </div>
      </section>

      <div className="profile-divider"></div>

      {/* Achievements Section */}
      <section className="achievements-section">
        <h3 className="achievements-title">Conquistas</h3>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`achievement-card ${achievement.unlocked ? "unlocked" : "locked"}`}>
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h4 className="achievement-title">{achievement.title}</h4>
                <p className="achievement-description">{achievement.description}</p>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="achievement-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
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
          <h3 className="text-lg font-medium mb-4">Editar Perfil</h3>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editForm.name || ""}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Idade</label>
              <input
                type="number"
                id="age"
                name="age"
                value={editForm.age || ""}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userProfile.email}
                disabled
                className="form-input bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Celular</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={editForm.phone || ""}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Peso (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={editForm.weight || ""}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                step="0.1"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
