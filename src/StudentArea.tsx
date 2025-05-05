"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, ChevronDown, Edit2, RefreshCw, X } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"

// Importações das APIs
import {
  getWorkouts,
  getExercises,
  updateExercise,
} from "@/services/api"

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
        const loaded: Exercise[] = dtos.map(dto => ({
          id: dto.id,
          name: dto.name,
          sets: dto.sets,
          reps: dto.reps,
          weight: dto.weight,
          completed: dto.completed,
          timerActive: false,
          timerSeconds: 0,
        }));
        setExercises(loaded);
      })
      .catch(() => {
        // tratar erro de carregamento de exercícios
      });
  };


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
      if (i === today.getDate()) color = "bg-blue-500"
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
              prevExs.map((e) =>
                e.id === id ? { ...e, timerSeconds: e.timerSeconds + 1 } : e
              )
            )
          }, 1000)
          timerRefs.current[id] = timerId
          return { ...ex, timerActive: true }
        }
      })
    )
  }

  const resetTimer = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id])
      delete timerRefs.current[id]
    }
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, timerActive: false, timerSeconds: 0 } : ex
      )
    )
  }

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`

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
      })
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
          setExercises((prev) =>
            prev.map((ex) =>
              ex.id === editingExercise.id ? { ...ex, weight: newWeight } : ex
            )
          )
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
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start hover:bg-gray-100" onClick={() => { setIsMenuOpen(false); goToHome() }}>
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100">
              Professores
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100" onClick={() => { setIsMenuOpen(false); goToProfile() }}>
              Perfil
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100">
              Área do Aluno
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 text-red-500" onClick={() => { setIsMenuOpen(false); handleLogout() }}>
              Sair
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Days Carousel */}
      <div className="days-carousel">
        <div className="days-container">
          {days.map((day, idx) => (
            <div key={idx} className={`day-item ${day.isActive ? "active" : ""} ${day.color}`}>
              <div className="day-name">{day.shortDay}</div>
              <div className="day-number">{day.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Selector */}
      <div className="p-4">
        <Button
          variant="outline"
          className="w-full bg-gray-300 hover:bg-gray-400 flex items-center justify-between py-3 rounded-md"
          onClick={() => setIsWorkoutDialogOpen(true)}
        >
          <span>{selectedWorkout}</span>
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Workout Selection Dialog */}
      <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <div className="flex flex-col space-y-2">
            {workouts.map((w) => (
              <Button
                key={w.id}
                variant="ghost"
                className="justify-start hover:bg-gray-100"
                onClick={() => handleWorkoutChange(w)}
              >
                {w.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Exercise List */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-card">
            <div className="exercise-info">
              <div className="exercise-name">{exercise.name}</div>
              <div className="exercise-details">
                {exercise.reps}×{exercise.sets} {exercise.weight}kg
                <button className="edit-button" onClick={() => openEditDialog(exercise)}>
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="exercise-actions-column">
              <div className={`timer ${exercise.timerActive ? "active" : ""}`} onClick={() => toggleTimer(exercise.id)}>
                <span>{formatTime(exercise.timerSeconds)}</span>
                <button className="reset-button" onClick={(e) => resetTimer(exercise.id, e)}>
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <button
                className={`done-button ${exercise.completed ? "completed" : ""}`}
                onClick={() => toggleExerciseCompletion(exercise.id)}
              >
                {exercise.completed ? "Concluído" : "Feito"}
              </button>
            </div>
            <div className="exercise-image"></div>
          </div>
        ))}
      </div>

      {/* Edit Weight Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white">
          <h3 className="text-lg font-medium mb-4">Editar Peso</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="weight">Peso (kg)</label>
              <input
                id="weight"
                type="number"
                value={newWeight}
                onChange={(e) => setNewWeight(Number(e.target.value))}
                className="border rounded-md p-2"
                min="0"
                step="0.5"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={saveWeight}>Salvar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
