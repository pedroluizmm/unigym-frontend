export default function ConquistasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <a href="/perfil" className="mr-4">
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
        <h1 className="text-xl font-bold text-gray-800">Conquistas</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Resumo</h2>
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
                className="text-blue-600 mr-1"
              >
                <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11" />
                <circle cx="12" cy="8" r="7" />
              </svg>
              <span className="font-medium">12/30</span>
            </div>
          </div>

          <div className="h-4 bg-gray-200 rounded-full mb-4">
            <div className="h-4 bg-blue-600 rounded-full" style={{ width: "40%" }}></div>
          </div>

          <p className="text-sm text-gray-600">
            Você conquistou 12 de 30 conquistas disponíveis. Continue se exercitando para desbloquear mais!
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-600">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
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
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="M8 18v-1" />
                  <path d="M16 18v-3" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Iniciante Dedicado</h3>
                <p className="text-sm text-gray-600 mb-2">Complete 10 treinos</p>
                <div className="flex items-center">
                  <div className="h-2 bg-blue-600 rounded-full w-full mr-2"></div>
                  <span className="text-xs font-medium text-blue-600">10/10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
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
                  className="text-green-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="16" />
                  <line x1="8" x2="16" y1="12" y2="12" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Consistência é Tudo</h3>
                <p className="text-sm text-gray-600 mb-2">Treine 5 semanas consecutivas</p>
                <div className="flex items-center">
                  <div className="h-2 bg-green-500 rounded-full w-3/5 mr-2"></div>
                  <span className="text-xs font-medium text-green-600">3/5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
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
                  className="text-purple-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Maratonista</h3>
                <p className="text-sm text-gray-600 mb-2">Acumule 10 horas de treino</p>
                <div className="flex items-center">
                  <div className="h-2 bg-purple-500 rounded-full w-4/5 mr-2"></div>
                  <span className="text-xs font-medium text-purple-600">8/10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-400">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-4">
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
                  className="text-gray-600"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M6 8h-1a4 4 0 0 0 0 8h1" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M16 18v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Mestre dos Pesos</h3>
                <p className="text-sm text-gray-600 mb-2">Aumente sua carga em 50% em qualquer exercício</p>
                <div className="flex items-center">
                  <div className="h-2 bg-gray-400 rounded-full w-1/4 mr-2"></div>
                  <span className="text-xs font-medium text-gray-600">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          href="/faq-dicas"
          className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 mt-6 hover:bg-blue-700 transition-colors"
        >
          Ver Dicas e FAQ
        </a>
      </main>
    </div>
  )
}
