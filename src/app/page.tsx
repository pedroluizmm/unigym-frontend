"use client"

import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-blue-600 text-xl sm:text-2xl font-bold">UniGym</h1>
        <button onClick={() => navigate("/menu")} className="p-2 rounded-full text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header>

      <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao UniGym</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
              Sua plataforma completa para acompanhamento de treinos e atividades físicas
            </p>

            <a
              href="/menu"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-bold rounded-xl px-6 py-4 shadow-sm"
            >
              Acessar Área do Aluno
            </a>
          </div>
        </section>

        {/* Execução de exercícios */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Execução de exercícios</h3>
            <p className="text-gray-600 text-sm sm:text-base">Aprenda a executar exercícios com a técnica correta</p>
          </div>
        </section>

        {/* Descrição */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">
            UniGym é seu parceiro para alcançar resultados. Acesse sua área de aluno agora e comece sua jornada fitness.
          </p>
        </section>

        {/* Sobre Nós */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Sobre Nós</h3>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 space-y-4">
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Somos um grupo de estudantes de Ciência da Computação comprometidos em desenvolver soluções tecnológicas
              para melhorar a experiência fitness. O UniGym é uma plataforma digital que visa facilitar o gerenciamento
              de atividades físicas e aprimorar a comunicação entre alunos e professores de academias.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Nosso objetivo é criar uma solução viável e acessível que possa ser implementada em academias de
              diferentes portes, proporcionando uma experiência mais personalizada e eficiente para os praticantes de
              atividades físicas.
            </p>
          </div>
        </section>

        {/* Links rápidos */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Acesso Rápido</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="#" className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="text-blue-600 font-bold text-sm sm:text-base">Horários</span>
            </a>

            <a href="#" className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-blue-600 font-bold text-sm sm:text-base">Como chegar?</span>
            </a>

            <a href="/verificacao-email" className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-blue-600 font-bold text-sm sm:text-base">Área do Aluno</span>
            </a>
          </div>
        </section>

        {/* Professores */}
        <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Nossos Professores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "João Pereira", role: "Musculação" },
              { name: "Carla Santos", role: "Treino Funcional" },
              { name: "Rafael Oliveira", role: "Cardio/Aeróbico" },
            ].map((professor) => (
              <div key={professor.name} className="text-center bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 border border-blue-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{professor.name}</h3>
                <p className="text-blue-600 font-medium text-xs sm:text-sm mb-3">{professor.role}</p>
                <button className="bg-blue-600 text-white rounded-xl px-4 py-2 text-xs sm:text-sm font-medium">
                  Saiba mais
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 text-gray-600 text-xs sm:text-sm text-center py-6">
        © 2025 UniGym | Desenvolvido por Estudantes de Ciência da Computação
      </footer>
    </div>
  )
}
