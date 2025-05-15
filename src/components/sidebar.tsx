"use client"

import { Link } from 'react-router-dom'
import { Home, Dumbbell, History, User, Award, HelpCircle, X } from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-blue-600 text-white z-30 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <div className="p-4 flex justify-between items-center border-b border-blue-500">
          <h1 className="text-xl font-bold">UniGym</h1>
          <button onClick={() => setOpen(false)} className="p-1 rounded-md hover:bg-blue-500 md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/exercicio" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <Dumbbell className="h-5 w-5 mr-3" />
                Exercícios
              </Link>
            </li>
            <li>
              <Link to="/historico" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <History className="h-5 w-5 mr-3" />
                Histórico
              </Link>
            </li>
            <li>
              <Link to="/perfil" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <User className="h-5 w-5 mr-3" />
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/conquistas" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <Award className="h-5 w-5 mr-3" />
                Conquistas
              </Link>
            </li>
            <li>
              <Link to="/faq-dicas" className="flex items-center p-2 rounded-md hover:bg-blue-500">
                <HelpCircle className="h-5 w-5 mr-3" />
                FAQ e Dicas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-500">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold">MS</span>
            </div>
            <div>
              <p className="font-medium">Maria Silva</p>
              <p className="text-sm text-blue-200">Aluno</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
