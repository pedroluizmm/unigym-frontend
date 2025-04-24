"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Menu, ChevronDown, Edit2, RefreshCw, X } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"

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

export default function StudentArea() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState("Treino A")
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: 1, name: "Tríceps A", sets: 3, reps: 12, weight: 32, completed: false, timerActive: false, timerSeconds: 0 },
    { id: 2, name: "Tríceps B", sets: 3, reps: 10, weight: 35, completed: false, timerActive: false, timerSeconds: 0 },
    { id: 3, name: "Bíceps A", sets: 4, reps: 12, weight: 20, completed: false, timerActive: false, timerSeconds: 0 },
    { id: 4, name: "Bíceps B", sets: 3, reps: 15, weight: 18, completed: false, timerActive: false, timerSeconds: 0 },
    { id: 5, name: "Peitoral A", sets: 4, reps: 10, weight: 40, completed: false, timerActive: false, timerSeconds: 0 },
    { id: 6, name: "Peitoral B", sets: 3, reps: 12, weight: 35, completed: false, timerActive: false, timerSeconds: 0 },
  ])

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
      const dayOfWeek = date.getDay() // 0 = Domingo, 1 = Segunda, etc.
      const dayName = dayNames[dayOfWeek]

      // Determinar cor com base em alguma lógica
      let color = "bg-white"
      if (i === today.getDate()) {
        color = "bg-blue-500" // Dia atual em azul
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        color = "bg-red-300" // Fins de semana em vermelho
      } else if (i % 4 === 0) {
        color = "bg-green-300" // Alguns dias em verde para variar
      }

      daysArray.push({
        day: dayName,
        shortDay: dayName,
        date: i,
        isActive: i === today.getDate(),
        color: color,
      })
    }

    return daysArray
  }

  const [days, setDays] = useState<WorkoutDay[]>(generateDaysOfMonth())

  const timerRefs = useRef<{ [key: number]: NodeJS.Timeout }>({})

  useEffect(() => {
    // Limpar todos os timers quando o componente for desmontado
    return () => {
      Object.values(timerRefs.current).forEach((timer) => clearInterval(timer))
    }
  }, [])

  const toggleTimer = (id: number) => {
    // Se já existe um timer rodando, significa que está ativo → então vamos parar
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id])
      delete timerRefs.current[id]
  
      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === id ? { ...ex, timerActive: false } : ex
        )
      )
    } else {
      // Caso contrário, iniciamos um novo timer
      const timerId = setInterval(() => {
        setExercises((prev) =>
          prev.map((ex) =>
            ex.id === id
              ? { ...ex, timerSeconds: ex.timerSeconds + 1 }
              : ex
          )
        )
      }, 1000)
  
      timerRefs.current[id] = timerId
  
      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === id ? { ...ex, timerActive: true } : ex
        )
      )
    }
  }
  
  

  const resetTimer = (id: number, event: React.MouseEvent) => {
    event.stopPropagation()
  
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id])
      delete timerRefs.current[id]
    }
  
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, timerSeconds: 0, timerActive: false } : ex
      )
    )
  }
  
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleExerciseCompletion = (id: number) => {
    setExercises((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.id === id) {
          return { ...exercise, completed: !exercise.completed }
        }
        return exercise
      })
    })
  }

  const handleWorkoutChange = (workout: string) => {
    setSelectedWorkout(workout)
    setIsWorkoutDialogOpen(false)
  }

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
  const [newWeight, setNewWeight] = useState<number>(0)

  const openEditDialog = (exercise: Exercise) => {
    setEditingExercise(exercise)
    setNewWeight(exercise.weight)
    setIsEditDialogOpen(true)
  }

  const saveWeight = () => {
    if (editingExercise) {
      setExercises((prevExercises) => {
        return prevExercises.map((exercise) => {
          if (exercise.id === editingExercise.id) {
            return { ...exercise, weight: newWeight }
          }
          return exercise
        })
      })
    }
    setIsEditDialogOpen(false)
  }

  const goToHome = () => {
    navigate("/")
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-100 shadow-sm">
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
              Serviços
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Contato
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Área do Aluno
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Days Carousel */}
      <div className="days-carousel">
        <div className="days-container">
          {days.map((day, index) => (
            <div key={index} className={`day-item ${day.isActive ? "active" : ""} ${day.color}`}>
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
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => handleWorkoutChange("Treino A")}
            >
              Treino A
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => handleWorkoutChange("Treino B")}
            >
              Treino B
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => handleWorkoutChange("Treino C")}
            >
              Treino C
            </Button>
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
