"use client"

import { useState, useEffect } from "react"
import { Menu, X, Clock, BookOpen, Check, AlertCircle, ChevronLeft } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"
import "./SchedulePage.css"

import {
  getScheduleSlots,
  getScheduleGrid,
  getUserReservations,
  reserveSlot as apiReserveSlot,
  cancelReservation as apiCancelReservation,
} from "@/services/api"

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
  occupancy: number[] 
}

type PeriodType = "morning" | "afternoon" | "evening"

export default function SchedulePage() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview")
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("morning")
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ row: string; col: number } | null>(null)

  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    morning: [],
    afternoon: [],
    evening: [],
  })
  const [scheduleGridData, setScheduleGridData] = useState<Record<PeriodType, ScheduleGridRow[]>>({
    morning: [],
    afternoon: [],
    evening: [],
  })
  const [userReservations, setUserReservations] = useState<{ [key: string]: boolean }>({})

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  const token = localStorage.getItem("token")!


  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    getScheduleSlots(token)
      .then(setScheduleData)
      .catch(() => {
        /* tratar erro */
      })
    getScheduleGrid(token)
      .then(setScheduleGridData)
      .catch(() => {
        /* tratar erro */
      })
    getUserReservations(token)
      .then(setUserReservations)
      .catch(() => {
        /* tratar erro */
      })
  }, [navigate, token])

  const handleSlotClick = (rowId: string, colIndex: number) => {
    const slotKey = `${selectedPeriod}-${rowId}-${colIndex}`

    if (userReservations[slotKey]) {
      apiCancelReservation(token, selectedPeriod, rowId, colIndex)
        .then(() => {
          setUserReservations((prev) => {
            const next = { ...prev }
            delete next[slotKey]
            return next
          })
        })
        .catch(() => {
        })
      return
    }

    setSelectedSlot({ row: rowId, col: colIndex })
    setIsReservationDialogOpen(true)
  }

  const confirmReservation = () => {
    if (!selectedSlot) return
    const { row, col } = selectedSlot
    apiReserveSlot(token, selectedPeriod, row, col)
      .then(() => {
        const slotKey = `${selectedPeriod}-${row}-${col}`
        setUserReservations((prev) => ({ ...prev, [slotKey]: true }))
        setIsReservationDialogOpen(false)
        setSelectedSlot(null)
      })
      .catch(() => {
      })
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

  const goToHome = () => navigate("/")
  const goToProfile = () => navigate("/profile")
  const goToStudentArea = () => navigate("/student-area")

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
              Serviços
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
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3 bg-gray-100"
            >
              Horários
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="p-6">
        <h1 className="text-3xl font-bold mb-6">Horários</h1>
        <div className="flex border-b border-blue-400">
          <button
            className={`flex items-center px-4 py-3 ${activeTab === "overview" ? "text-white border-b-2 border-white" : "text-blue-200"}`}
            onClick={() => setActiveTab("overview")}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Visão geral
          </button>
          <button
            className={`flex items-center px-4 py-3 ${activeTab === "details" ? "text-white border-b-2 border-white" : "text-blue-200"}`}
            onClick={() => setActiveTab("details")}
          >
            <Clock className="h-5 w-5 mr-2" />
            Horários
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 bg-gray-50 text-gray-900 rounded-t-3xl px-4 py-6">
        {activeTab === "overview" ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Grade de horários</h2>
              <div className="mt-2 md:mt-0">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
                  className="bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="morning">Manhã</option>
                  <option value="afternoon">Tarde</option>
                  <option value="evening">Noite</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-gray-800">{getPeriodLabel(selectedPeriod)}</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border-b-2 border-gray-200 text-left"></th>
                      {days.map((day, i) => (
                        <th key={i} className="p-2 border-b-2 border-gray-200 text-center font-medium">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleGridData[selectedPeriod]?.map((row) => (
                      <tr key={row.id}>
                        <td className="p-2 border-b border-gray-200 font-medium">{row.id}</td>
                        {row.days.map((hasClass, dayIndex) => (
                          <td key={dayIndex} className="p-2 border-b border-gray-200 text-center">
                            {hasClass && (
                              <button
                                className={`relative w-12 h-12 rounded-full flex items-center justify-center ${userReservations[`${selectedPeriod}-${row.id}-${dayIndex}`]
                                    ? "border-2 border-blue-600"
                                    : ""
                                  }`}
                                onClick={() => handleSlotClick(row.id, dayIndex)}
                              >
                                <div
                                  className={`w-10 h-10 rounded-full ${getOccupancyColor(row.occupancy[dayIndex])} flex items-center justify-center`}
                                >
                                  {userReservations[`${selectedPeriod}-${row.id}-${dayIndex}`] && (
                                    <Check className="h-5 w-5 text-white absolute" />
                                  )}
                                  <span className="text-xs text-white font-medium">{row.occupancy[dayIndex]}%</span>
                                </div>
                              </button>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">Ocupação:</div>
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
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 mr-2"></div>
                    <span className="text-sm">Sua reserva</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Clique em um horário para reservar seu treino e evitar lotação
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Horários da academia</h2>

            {(["morning", "afternoon", "evening"] as PeriodType[]).map((period) => (
              <div key={period} className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-4">
                <h3 className="text-lg font-medium mb-3 text-gray-800">{getPeriodLabel(period)}</h3>
                <div className="space-y-2">
                  {scheduleData[period]?.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} flex justify-between items-center`}
                    >
                      <div className="font-medium text-gray-800">{slot.id}</div>
                      <div className="text-gray-600">
                        {slot.start} às {slot.end}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reservation Dialog */}
      <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="p-2">
            <h3 className="text-xl font-bold mb-4">Confirmar reserva</h3>
            {selectedSlot && (
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Deseja reservar o horário{" "}
                  <span className="font-medium">
                    {scheduleData[selectedPeriod].find((s) => s.id === selectedSlot.row)?.start} às{" "}
                    {scheduleData[selectedPeriod].find((s) => s.id === selectedSlot.row)?.end}
                  </span>{" "}
                  de <span className="font-medium">{days[selectedSlot.col]}</span>?
                </p>
                <div className="mt-3 flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <p className="text-sm text-yellow-700">
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
              <Button onClick={confirmReservation} className="bg-blue-600 hover:bg-blue-700">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
