export default function ExercicioPage() {
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
        <h1 className="text-xl font-bold text-gray-800">Supino Reto</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-56 bg-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white bg-blue-600 rounded-full p-2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Supino Reto com Barra</h2>
            <p className="text-gray-600 mb-4">
              Exercício composto que trabalha principalmente o peitoral maior, com ênfase na parte média. Também envolve
              os deltoides anteriores e tríceps.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Séries</p>
                <p className="font-bold text-blue-600">4</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Repetições</p>
                <p className="font-bold text-blue-600">12</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Descanso</p>
                <p className="font-bold text-blue-600">60s</p>
              </div>
            </div>

            <h3 className="font-medium mb-2">Execução Correta:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Deite-se no banco com os pés apoiados no chão</li>
              <li>Segure a barra com as mãos um pouco mais afastadas que a largura dos ombros</li>
              <li>Desça a barra controladamente até tocar levemente o peito</li>
              <li>Empurre a barra para cima até que os braços estejam estendidos</li>
            </ul>

            <a
              href="/historico"
              className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
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
                className="mr-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Marcar como Concluído
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-3">Dicas do Treinador:</h3>
          <p className="text-gray-600">
            Mantenha os ombros para trás e o peito elevado durante todo o movimento. Não arquee excessivamente as
            costas. Foque na contração do peitoral no topo do movimento.
          </p>
        </div>
      </main>
    </div>
  )
}
