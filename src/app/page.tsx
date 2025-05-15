import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen bg-blue-600">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">UniGym</h1>
        <button onClick={() => navigate('/menu')} className="text-white">
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

      <main className="flex-1 flex flex-col items-center text-center px-4">
        <div className="max-w-md mx-auto mt-8 mb-12">
          <h2 className="text-white text-3xl font-bold mb-2">Bem-vindo ao UniGym</h2>
          <p className="text-white text-sm mb-6">
            Sua plataforma completa para acompanhamento de treinos e atividades físicas
          </p>

          <a
            href="/menu"
            className="inline-flex items-center justify-center bg-white text-blue-600 font-medium rounded-full px-6 py-2 shadow-lg hover:bg-blue-50 transition-colors"
          >
            Acessar Área do Aluno
          </a>
        </div>

        <div className="w-full py-6 bg-blue-700">
          <h3 className="text-white text-xl font-bold mb-1">Execução de exercícios</h3>
          <p className="text-white text-sm">Aprenda a executar exercícios com a técnica correta</p>
        </div>

        <div className="w-full py-6 bg-blue-800">
          <p className="text-white text-sm px-4">
            UniGym é seu parceiro para alcançar resultados. Acesse sua área de aluno agora e comece sua jornada fitness.
          </p>
        </div>

        <div className="w-full py-8 bg-blue-600">
          <h3 className="text-white text-2xl font-bold mb-6">Sobre Nós</h3>
          <div className="bg-blue-700 mx-4 p-6 rounded-lg mb-8">
            <p className="text-white text-sm">
              Somos um grupo de estudantes de Ciência da Computação comprometidos em desenvolver soluções tecnológicas
              para melhorar a experiência fitness. O UniGym é uma plataforma digital que visa facilitar o gerenciamento
              de atividades físicas e aprimorar a comunicação entre alunos e professores de academias.
            </p>
            <p className="text-white text-sm mt-4">
              Nosso objetivo é criar uma solução viável e acessível que possa ser implementada em academias de
              diferentes portes, proporcionando uma experiência mais personalizada e eficiente para os praticantes de
              atividades físicas.
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-4 px-4 mb-8">
          <a href="#" className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-md">
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
              className="text-blue-600 mb-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-blue-600 font-medium">Horários</span>
          </a>

          <a href="#" className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-md">
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
              className="text-blue-600 mb-2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-blue-600 font-medium">Como chegar?</span>
          </a>

          <a
            href="/verificacao-email"
            className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-md"
          >
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
              className="text-blue-600 mb-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-blue-600 font-medium">Área do Aluno</span>
          </a>
        </div>

        <div className="w-full bg-white pt-6 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossos Professores</h2>
          <div className="grid grid-cols-3 gap-4 px-4">
            {[
              { name: "João Pereira", role: "Musculação" },
              { name: "Carla Santos", role: "Treino Funcional" },
              { name: "Rafael Oliveira", role: "Cardio/Aeróbico" },
            ].map((professor) => (
              <div key={professor.name} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mb-2"></div>
                <h3 className="text-sm font-medium">{professor.name}</h3>
                <p className="text-xs text-gray-500">{professor.role}</p>
                <button className="mt-2 text-xs bg-blue-600 text-white rounded px-3 py-1">Saiba mais</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-blue-800 text-white text-xs text-center py-4">
        © 2025 UniGym | Desenvolvido por Estudantes de Ciência da Computação
      </footer>
    </div>
  )
}
