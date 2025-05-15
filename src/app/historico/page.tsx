export default function HistoricoPage() {
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
        <h1 className="text-xl font-bold text-gray-800">Histórico</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Progresso</h2>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center mb-4">
            <p className="text-gray-500">Gráfico de progresso</p>
          </div>

          <div className="flex justify-between items-center">
            <button className="p-2 rounded-full hover:bg-gray-100">
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center">
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
                className="text-blue-600 mr-2"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span className="font-medium">Maio 2025</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-3 py-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Treino A - Peito e Tríceps</h3>
                <span className="text-sm text-gray-500">Hoje</span>
              </div>
              <p className="text-sm text-gray-600">8 exercícios • 45 min • 320 kcal</p>
            </div>

            <div className="border-l-4 border-green-500 pl-3 py-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Treino C - Pernas</h3>
                <span className="text-sm text-gray-500">Ontem</span>
              </div>
              <p className="text-sm text-gray-600">6 exercícios • 50 min • 450 kcal</p>
            </div>

            <div className="border-l-4 border-purple-500 pl-3 py-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Treino B - Costas e Bíceps</h3>
                <span className="text-sm text-gray-500">3 dias atrás</span>
              </div>
              <p className="text-sm text-gray-600">7 exercícios • 40 min • 380 kcal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Estatísticas</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Total de Treinos</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Calorias Queimadas</p>
              <p className="text-2xl font-bold text-green-600">9.840</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Tempo Total</p>
              <p className="text-2xl font-bold text-purple-600">18h</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Exercícios</p>
              <p className="text-2xl font-bold text-orange-600">168</p>
            </div>
          </div>

          <a
            href="/perfil"
            className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 mt-6 hover:bg-blue-700 transition-colors"
          >
            Ver Perfil Completo
          </a>
        </div>
      </main>
    </div>
  )
}
