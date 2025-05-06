"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, ChevronDown, Edit2, RefreshCw, X, ChevronLeft } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"

// Importações das APIs
import { getWorkouts, getExercises, updateExercise } from "@/services/api"

interface Exercise {
  id: number
  name: string
  sets: number
  reps: number
  weight: number
  completed: boolean
  timerActive: boolean
  timerSeconds: number
}

interface WorkoutDay {
  day: string
  shortDay: string
  date: number
  isActive: boolean
  color: string
}

interface Workout {
  id: string
  name: string
}

export default function StudentArea() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false)

  // Lista de treinos vindo do backend
  const [workouts, setWorkouts] = useState<Workout[]>([])
  // Nome do treino selecionado (para exibição)
  const [selectedWorkout, setSelectedWorkout] = useState("")

  // Exercícios do treino selecionado
  const [exercises, setExercises] = useState<Exercise[]>([])

  // Verificar se o usuário está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [navigate])

  const token = localStorage.getItem("token")!

  // Carregar lista de treinos e inicializar seleção
  useEffect(() => {
    getWorkouts(token)
      .then((ws) => {
        setWorkouts(ws)
        if (ws.length > 0) {
          setSelectedWorkout(ws[0].name)
          return ws[0]
        }
      })
      .then((initial) => {
        if (initial) {
          loadExercises(initial.id)
        }
      })
      .catch(() => {
        // tratar erro de carregamento de treinos
      })
  }, [token])

  // Função para carregar exercícios de um treino específico
  const loadExercises = (workoutId: string) => {
    getExercises(token, workoutId)
      .then((dtos) => {
        // Converte cada ExerciseDTO no nosso tipo interno, adicionando timerActive e timerSeconds
        const loaded: Exercise[] = dtos.map((dto) => ({
          id: dto.id,
          name: dto.name,
          sets: dto.sets,
          reps: dto.reps,
          weight: dto.weight,
          completed: dto.completed,
          timerActive: false,
          timerSeconds: 0,
        }))
        setExercises(loaded)
      })
      .catch(() => {
        // tratar erro de carregamento de exercícios
      })
  }

  // Gerar dias do mês atual
  const generateDaysOfMonth = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const daysArray: WorkoutDay[] = []
    const dayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i)
      const dayOfWeek = date.getDay()
      const dayName = dayNames[dayOfWeek]

      let color = "bg-white"
      if (i === today.getDate()) color = "bg-blue-600"
      else if (dayOfWeek === 0 || dayOfWeek === 6) color = "bg-red-300"
      else if (i % 4 === 0) color = "bg-green-300"

      daysArray.push({
        day: dayName,
        shortDay: dayName,
        date: i,
        isActive: i === today.getDate(),
        color,
      })
    }

    return daysArray
  }

  const [days, setDays] = useState<WorkoutDay[]>(generateDaysOfMonth())

  const timerRefs = useRef<{ [key: number]: NodeJS.Timeout }>({})

  useEffect(() => {
    // Limpar timers no desmontar
    return () => {
      Object.values(timerRefs.current).forEach((t) => clearInterval(t))
    }
  }, [])

  const toggleTimer = (id: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== id) return ex

        if (ex.timerActive) {
          clearInterval(timerRefs.current[id])
          delete timerRefs.current[id]
          return { ...ex, timerActive: false }
        } else {
          const timerId = setInterval(() => {
            setExercises((prevExs) =>
              prevExs.map((e) => (e.id === id ? { ...e, timerSeconds: e.timerSeconds + 1 } : e)),
            )
          }, 1000)
          timerRefs.current[id] = timerId
          return { ...ex, timerActive: true }
        }
      }),
    )
  }

  const resetTimer = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id])
      delete timerRefs.current[id]
    }
    setExercises((prev) => prev.map((ex) => (ex.id === id ? { ...ex, timerActive: false, timerSeconds: 0 } : ex)))
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`

  const toggleExerciseCompletion = (id: number) => {
    setExercises((prev) =>
      prev.map((ex) => {
        if (ex.id !== id) return ex
        const updated = !ex.completed
        // Persistir no backend
        updateExercise(token, id, { completed: updated }).catch(() => {
          // tratar erro
        })
        return { ...ex, completed: updated }
      }),
    )
  }

  const handleWorkoutChange = (workout: Workout) => {
    setSelectedWorkout(workout.name)
    setIsWorkoutDialogOpen(false)
    loadExercises(workout.id)
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [newWeight, setNewWeight] = useState(0)

  const openEditDialog = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setNewWeight(exercise.weight)
    setIsEditDialogOpen(true)
  }

  const saveWeight = () => {
    if (editingExercise) {
      // Atualizar local e backend
      updateExercise(token, editingExercise.id, { weight: newWeight })
        .then(() => {
          setExercises((prev) => prev.map((ex) => (ex.id === editingExercise.id ? { ...ex, weight: newWeight } : ex)))
        })
        .catch(() => {
          // tratar erro
        })
    }
    setIsEditDialogOpen(false)
  }

  const goToHome = () => navigate("/")
  const goToProfile = () => navigate("/profile")
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    navigate("/login")
  }

  return (
    <main className="min-h-screen flex flex-col bg-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-700 shadow-md">
        <div className="flex items-center gap-2">
          <button onClick={goToHome} className="p-1 rounded-full hover:bg-blue-600 transition-colors">
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
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToProfile()
              }}
            >
              Perfil
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3 bg-gray-100"
            >
              Área do Aluno
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

      {/* Days Carousel */}
      <div className="bg-blue-700 p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center rounded-xl p-3 min-w-[60px] ${day.isActive
                  ? "bg-white text-blue-600 shadow-lg"
                  : day.color === "bg-white"
                    ? "bg-blue-600 text-white border border-blue-500"
                    : day.color === "bg-red-300"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                }`}
            >
              <div className="text-xs font-medium">{day.shortDay}</div>
              <div className={`text-xl font-bold ${day.isActive ? "text-blue-600" : ""}`}>{day.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Selector */}
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full bg-white text-blue-600 hover:bg-blue-50 flex items-center justify-between py-3 rounded-xl shadow-sm"
          onClick={() => setIsWorkoutDialogOpen(true)}
        >
          <span className="font-bold">{selectedWorkout}</span>
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Workout Selection Dialog */}
      <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Selecionar Treino</h3>
          <div className="flex flex-col space-y-1">
            {workouts.map((w) => (
              <Button
                key={w.id}
                variant="ghost"
                className="justify-start hover:bg-gray-100 py-3 text-left"
                onClick={() => handleWorkoutChange(w)}
              >
                {w.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Exercise List */}
      <div className="flex-1 bg-gray-50 text-gray-900 rounded-t-3xl px-4 py-6 space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={`bg-white rounded-xl shadow-sm overflow-hidden border ${exercise.completed ? "border-green-200" : "border-gray-200"
              }`}
          >
            <div className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{exercise.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-600">
                    {exercise.reps}×{exercise.sets}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                    {exercise.weight}kg
                    <button className="ml-1 text-blue-600" onClick={() => openEditDialog(exercise)}>
                      <Edit2 className="h-3 w-3 inline" />
                    </button>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${exercise.timerActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => toggleTimer(exercise.id)}
                >
                  <span className="font-mono font-medium">{formatTime(exercise.timerSeconds)}</span>
                  <button
                    className={`p-1 rounded-full ${exercise.timerActive ? "hover:bg-blue-500" : "hover:bg-gray-300"}`}
                    onClick={(e) => resetTimer(exercise.id, e)}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                </div>

                <button
                  className={`px-4 py-2 rounded-lg font-medium ${exercise.completed
                      ? "bg-green-100 text-green-600 hover:bg-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  onClick={() => toggleExerciseCompletion(exercise.id)}
                >
                  {exercise.completed ? "Concluído" : "Marcar como feito"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Weight Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Editar Peso</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                Peso (kg)
              </label>
              <input
                id="weight"
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.5"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveWeight} className="bg-blue-600 hover:bg-blue-700">
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
