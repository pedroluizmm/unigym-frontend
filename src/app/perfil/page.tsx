export default function PerfilPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <a href="/dashboard" className="mr-4">
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
            className="h-6 w-6 text-gray-500"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </a>
        <h1 className="text-xl font-bold text-gray-800">Perfil</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-blue-600">MS</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">Maria Silva</h2>
              <p className="text-gray-600">maria.silva@email.com</p>
            </div>
            <button className="ml-auto p-2 rounded-full hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Idade</p>
              <p className="font-medium">28 anos</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Altura</p>
              <p className="font-medium">1,68 m</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peso</p>
              <p className="font-medium">65 kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Objetivo</p>
              <p className="font-medium">Hipertrofia</p>
            </div>
          </div>

          <a
            href="/conquistas"
            className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
          >
            Ver Conquistas
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Preferências de Treino</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dias de treino</h3>
                <p className="text-sm text-gray-600">Segunda, Quarta, Sexta</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Duração preferida</h3>
                <p className="text-sm text-gray-600">45-60 minutos</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Foco do treino</h3>
                <p className="text-sm text-gray-600">Hipertrofia, Força</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Configurações</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificações</h3>
                <p className="text-sm text-gray-600">Ativadas</p>
              </div>
              <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Tema</h3>
                <p className="text-sm text-gray-600">Claro</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Idioma</h3>
                <p className="text-sm text-gray-600">Português</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
