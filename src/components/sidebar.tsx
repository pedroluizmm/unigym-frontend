"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Dumbbell,
  History,
  User as UserIcon,
  Award,
  HelpCircle,
  LogOut,
  X,
  Pencil,
} from "lucide-react";
import { getMyProfile, type Usuario } from "@/services/api";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  // Você pode continuar recebendo `user` por props, mas será apenas fallback
  user?: { nome: string; role?: string };
}

export function Sidebar({ open, setOpen, user }: SidebarProps) {
  const navigate = useNavigate();

  // Estado para o usuário logado
  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario | null>(null);
  const [loadingPerfil, setLoadingPerfil] = useState<boolean>(true);
  const [errorPerfil, setErrorPerfil] = useState<string | null>(null);

  // Busca o perfil quando o componente monta
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        setLoadingPerfil(true);
        const res = await getMyProfile();
        setUsuarioPerfil(res.data);
      } catch (err: any) {
        console.error(err);
        setErrorPerfil(err.response?.data?.message || err.message || "Erro ao carregar perfil");
      } finally {
        setLoadingPerfil(false);
      }
    };
    fetchPerfil();
  }, []);

  // Se quiser, trate loading e erro aqui (por simplicidade, seguimos mesmo sem dados)
  const displayName = usuarioPerfil?.nome ?? user?.nome ?? "Usuário";
  const displayRole = (usuarioPerfil as any)?.role ?? user?.role ?? "Aluno";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/treino", icon: Dumbbell, label: "Treinos" },
    { to: "/historico", icon: History, label: "Histórico" },
    { to: "/perfil", icon: UserIcon, label: "Perfil" },
    { to: "/conquistas", icon: Award, label: "Conquistas" },
    { to: "/faq-dicas", icon: HelpCircle, label: "FAQ e Dicas" },
    { to: "/professor", icon: Pencil, label: "Professor/Admin" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen w-64 sm:w-72 lg:w-64
          bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out shadow-lg flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Cabeçalho */}
        <div className="p-4 sm:p-6 flex justify-between items-center border-b border-gray-200 bg-blue-600">
          <h1 className="text-lg sm:text-xl font-bold text-white">UniGym</h1>
          <button onClick={() => setOpen(false)} className="p-1 rounded-md text-white lg:hidden">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 sm:p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center p-2 sm:p-3 rounded-xl text-gray-700 font-medium border border-transparent hover:bg-gray-50 transition-colors"
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50 border border-blue-100 mr-2 sm:mr-3 flex-shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <span className="text-sm sm:text-base">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-gray-200 bg-gray-50">
          <div className="p-3 sm:p-4">
            <div className="flex items-center p-2 sm:p-3 rounded-xl bg-white border border-gray-200 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 border border-blue-200">
                <span className="text-blue-600 font-bold text-sm sm:text-base">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{displayName}</p>
                <p className="text-xs sm:text-sm text-blue-600 font-medium">{displayRole}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 sm:p-3 rounded-xl text-gray-700 font-medium border border-transparent hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-red-50 border border-red-100 mr-2 sm:mr-3 flex-shrink-0">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
              </div>
              <span className="text-sm sm:text-base">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
