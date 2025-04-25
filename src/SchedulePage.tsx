"use client"

import { useState } from "react"
import { Menu, X, Clock, BookOpen, Check, AlertCircle } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"
import "./SchedulePage.css"

interface TimeSlot {
  id: string
  start: string
  end: string
}

interface ScheduleData {
  morning: TimeSlot[]
  afternoon: TimeSlot[]
  evening: TimeSlot[]
}

interface ScheduleGridRow {
  id: string
  days: boolean[]
  occupancy: number[] // 0-100 representando a % de ocupação
}

type PeriodType = "morning" | "afternoon" | "evening"

export default function SchedulePage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview")
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("morning")
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ row: string; col: number } | null>(null)
  const [userReservations, setUserReservations] = useState<{ [key: string]: boolean }>({})

  // Dados dos horários
  const scheduleData: ScheduleData = {
    morning: [
      { id: "A", start: "07:30", end: "08:20" },
      { id: "B", start: "08:20", end: "09:10" },
      { id: "C", start: "09:30", end: "10:20" },
      { id: "D", start: "10:20", end: "11:10" },
      { id: "E", start: "11:20", end: "12:10" },
      { id: "F", start: "12:10", end: "13:00" },
    ],
    afternoon: [
      { id: "A", start: "13:30", end: "14:20" },
      { id: "B", start: "14:20", end: "15:10" },
      { id: "C", start: "15:30", end: "16:20" },
      { id: "D", start: "16:20", end: "17:10" },
      { id: "E", start: "17:20", end: "18:10" },
      { id: "F", start: "18:10", end: "19:00" },
    ],
    evening: [
      { id: "A", start: "19:00", end: "19:50" },
      { id: "B", start: "19:50", end: "20:40" },
      { id: "C", start: "21:00", end: "21:50" },
      { id: "D", start: "21:50", end: "22:40" },
    ],
  }

  // Dados da grade de horários
  const scheduleGridData = {
    morning: [
      { id: "A", days: [true, false, true, false, false, false], occupancy: [45, 0, 30, 0, 0, 0] },
      { id: "B", days: [true, false, true, false, false, false], occupancy: [60, 0, 25, 0, 0, 0] },
      { id: "C", days: [true, true, true, true, false, false], occupancy: [75, 40, 50, 35, 0, 0] },
      { id: "D", days: [true, true, true, true, false, false], occupancy: [90, 65, 70, 55, 0, 0] },
      { id: "E", days: [true, true, true, true, false, false], occupancy: [50, 45, 60, 40, 0, 0] },
      { id: "F", days: [true, true, true, true, false, false], occupancy: [30, 25, 40, 20, 0, 0] },
    ],
    afternoon: [
      { id: "A", days: [true, true, true, true, true, false], occupancy: [55, 40, 60, 45, 30, 0] },
      { id: "B", days: [true, true, true, true, true, false], occupancy: [70, 65, 75, 60, 40, 0] },
      { id: "C", days: [true, true, true, true, true, false], occupancy: [85, 70, 90, 75, 50, 0] },
      { id: "D", days: [true, true, true, true, true, false], occupancy: [95, 80, 85, 70, 45, 0] },
      { id: "E", days: [true, true, true, true, true, false], occupancy: [65, 55, 70, 50, 35, 0] },
      { id: "F", days: [true, true, true, true, true, false], occupancy: [40, 35, 45, 30, 20, 0] },
    ],
    evening: [
      { id: "A", days: [true, true, true, true, true, true], occupancy: [80, 75, 85, 70, 90, 60] },
      { id: "B", days: [true, true, true, true, true, true], occupancy: [95, 90, 100, 85, 95, 70] },
      { id: "C", days: [true, true, true, true, true, true], occupancy: [70, 65, 75, 60, 80, 50] },
      { id: "D", days: [true, true, true, true, true, true], occupancy: [50, 45, 55, 40, 60, 30] },
    ],
  }

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

  const handleSlotClick = (rowId: string, colIndex: number) => {
    const slotKey = `${selectedPeriod}-${rowId}-${colIndex}`

    // Se já está reservado pelo usuário, cancela a reserva
    if (userReservations[slotKey]) {
      const updatedReservations = { ...userReservations }
      delete updatedReservations[slotKey]
      setUserReservations(updatedReservations)
      return
    }

    setSelectedSlot({ row: rowId, col: colIndex })
    setIsReservationDialogOpen(true)
  }

  const confirmReservation = () => {
    if (selectedSlot) {
      const slotKey = `${selectedPeriod}-${selectedSlot.row}-${selectedSlot.col}`
      setUserReservations({
        ...userReservations,
        [slotKey]: true,
      })
      setIsReservationDialogOpen(false)
      setSelectedSlot(null)
    }
  }

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 40) return "bg-green-500"
    if (occupancy < 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getOccupancyText = (occupancy: number) => {
    if (occupancy < 40) return "Baixa"
    if (occupancy < 70) return "Média"
    return "Alta"
  }

  const goToHome = () => {
    navigate("/")
  }

  const goToProfile = () => {
    navigate("/profile")
  }

  const goToStudentArea = () => {
    navigate("/student-area")
  }

  const getPeriodLabel = (period: PeriodType) => {
    switch (period) {
      case "morning":
        return "Manhã"
      case "afternoon":
        return "Tarde"
      case "evening":
        return "Noite"
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-sm">
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
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToProfile()
              }}
            >
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="p-4">
        <h1 className="text-3xl font-bold mb-6">Horários</h1>
        <div className="flex border-b border-blue-500">
          <button
            className={`flex items-center px-4 py-2 ${
              activeTab === "overview" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Visão geral
          </button>
          <button
            className={`flex items-center px-4 py-2 ${
              activeTab === "details" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <Clock className="h-5 w-5 mr-2" />
            Horários
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === "overview" ? (
          <div className="schedule-overview">
            <div className="schedule-card">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-xl font-bold">Grade de horários</h2>
                <div className="period-selector mt-2 md:mt-0">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
                    className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
                  >
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="evening">Noite</option>
                  </select>
                </div>
              </div>

              <div className="period-section">
                <h3 className="text-lg mb-2">{getPeriodLabel(selectedPeriod)}</h3>
                <div className="schedule-grid">
                  <div className="schedule-row header">
                    <div className="schedule-cell"></div>
                    {days.map((day, index) => (
                      <div key={index} className="schedule-cell day-header">
                        {day}
                      </div>
                    ))}
                  </div>
                  {scheduleGridData[selectedPeriod].map((row) => (
                    <div key={row.id} className="schedule-row">
                      <div className="schedule-cell period-id">{row.id}</div>
                      {row.days.map((hasClass, dayIndex) => (
                        <div key={dayIndex} className="schedule-cell">
                          {hasClass && (
                            <div
                              className={`schedule-slot ${getOccupancyColor(row.occupancy[dayIndex])} ${
                                userReservations[`${selectedPeriod}-${row.id}-${dayIndex}`] ? "reserved" : ""
                              }`}
                              onClick={() => handleSlotClick(row.id, dayIndex)}
                            >
                              {userReservations[`${selectedPeriod}-${row.id}-${dayIndex}`] && (
                                <Check className="h-4 w-4 text-white absolute" />
                              )}
                              <span className="occupancy-text">{row.occupancy[dayIndex]}%</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="legend mt-4">
                <div className="legend-title text-sm text-gray-400 mb-2">Ocupação:</div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Baixa</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Média</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Alta</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 mr-2"></div>
                    <span className="text-sm">Sua reserva</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                Clique em um horário para reservar seu treino e evitar lotação
              </p>
            </div>
          </div>
        ) : (
          <div className="schedule-details">
            <h2 className="text-xl font-bold mb-4">Horários da academia</h2>

            {/* Manhã */}
            <div className="time-period">
              <h3 className="text-lg mb-2">Manhã</h3>
              <div className="time-slots">
                {scheduleData.morning.map((slot, index) => (
                  <div key={index} className={`time-slot ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                    <div className="slot-id">{slot.id}</div>
                    <div className="slot-time">
                      {slot.start} às {slot.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarde */}
            <div className="time-period">
              <h3 className="text-lg mb-2">Tarde</h3>
              <div className="time-slots">
                {scheduleData.afternoon.map((slot, index) => (
                  <div key={index} className={`time-slot ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                    <div className="slot-id">{slot.id}</div>
                    <div className="slot-time">
                      {slot.start} às {slot.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Noite */}
            <div className="time-period">
              <h3 className="text-lg mb-2">Noite</h3>
              <div className="time-slots">
                {scheduleData.evening.map((slot, index) => (
                  <div key={index} className={`time-slot ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}`}>
                    <div className="slot-id">{slot.id}</div>
                    <div className="slot-time">
                      {slot.start} às {slot.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reservation Dialog */}
      <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="p-2">
            <h3 className="text-lg font-medium mb-2">Confirmar reserva</h3>
            {selectedSlot && (
              <div className="mb-4">
                <p>
                  Deseja reservar o horário {scheduleData[selectedPeriod].find((s) => s.id === selectedSlot.row)?.start}{" "}
                  às {scheduleData[selectedPeriod].find((s) => s.id === selectedSlot.row)?.end} de{" "}
                  {days[selectedSlot.col]}?
                </p>
                <div className="mt-2 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <p className="text-sm">
                    Ocupação prevista:{" "}
                    <span className="font-medium">
                      {
                        scheduleGridData[selectedPeriod].find((r) => r.id === selectedSlot.row)?.occupancy[
                          selectedSlot.col
                        ]
                      }
                      % (
                      {getOccupancyText(
                        scheduleGridData[selectedPeriod].find((r) => r.id === selectedSlot.row)?.occupancy[
                          selectedSlot.col
                        ] || 0,
                      )}
                      )
                    </span>
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReservationDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={confirmReservation}>Confirmar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
