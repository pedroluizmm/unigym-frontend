"use client"

export default function FaqDicasPage() {
  const toggleFaq = (index: number) => {
    // Esta função seria implementada com estado em uma aplicação real
    console.log("Toggle FAQ", index)
  }

  const faqs = [
    {
      question: "Como acompanhar meu progresso?",
      answer:
        "Você pode acompanhar seu progresso na seção 'Histórico', onde encontrará gráficos de evolução, estatísticas e um registro de todas as suas atividades anteriores.",
    },
    {
      question: "Posso alterar meu plano de treino?",
      answer:
        "Sim! Entre em contato com seu treinador através do aplicativo para solicitar ajustes no seu plano de treino de acordo com seus objetivos e necessidades.",
    },
    {
      question: "Como funciona o sistema de conquistas?",
      answer:
        "O sistema de conquistas recompensa sua consistência e progresso. Conforme você completa treinos, atinge metas e mantém regularidade, novas conquistas são desbloqueadas.",
    },
    {
      question: "Posso usar o aplicativo offline?",
      answer:
        "Sim, a maioria das funcionalidades está disponível offline. Os dados serão sincronizados automaticamente quando você estiver conectado à internet novamente.",
    },
  ]

  const dicas = [
    {
      title: "Hidratação adequada",
      content:
        "Beba água antes, durante e após o treino. A hidratação adequada melhora o desempenho e ajuda na recuperação muscular.",
    },
    {
      title: "Aquecimento é essencial",
      content:
        "Dedique 5-10 minutos para aquecer antes do treino principal. Isso prepara seus músculos e articulações, reduzindo o risco de lesões.",
    },
    {
      title: "Qualidade sobre quantidade",
      content:
        "Foque na execução correta dos exercícios em vez de aumentar o peso ou repetições. A técnica adequada maximiza os resultados e previne lesões.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center">
        <a href="/conquistas" className="mr-4">
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
        <h1 className="text-xl font-bold text-gray-800">FAQ e Dicas</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left font-medium"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
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
                    className="text-gray-500 transition-transform"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="p-4 pt-0 text-gray-600 text-sm">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Dicas de Treino</h2>

          <div className="space-y-4">
            {dicas.map((dica, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
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
                      className="text-blue-600"
                    >
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{dica.title}</h3>
                    <p className="text-sm text-gray-600">{dica.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 mt-6 hover:bg-blue-700 transition-colors"
          >
            Voltar ao Dashboard
          </a>
        </div>
      </main>
    </div>
  )
}
