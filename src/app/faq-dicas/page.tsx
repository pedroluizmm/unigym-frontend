"use client"

import { useState } from "react"

export default function FaqDicasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
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
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: "Aquecimento é essencial",
      content:
        "Dedique 5-10 minutos para aquecer antes do treino principal. Isso prepara seus músculos e articulações, reduzindo o risco de lesões.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Qualidade sobre quantidade",
      content:
        "Foque na execução correta dos exercícios em vez de aumentar o peso ou repetições. A técnica adequada maximiza os resultados e previne lesões.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <a href="/conquistas" className="mr-4 p-2 rounded-full text-blue-600">
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
            className="h-6 w-6"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </a>
        <h1 className="text-xl font-bold text-blue-600">FAQ e Dicas</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Perguntas Frequentes */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Perguntas Frequentes</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 bg-gray-50"
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
                    className={`text-blue-600 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="p-4 text-gray-600 leading-relaxed bg-white border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dicas de Treino */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Dicas de Treino</h2>

          <div className="space-y-4">
            {dicas.map((dica, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4 border border-blue-200">
                    <div className="text-blue-600">{dica.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2 text-blue-700">{dica.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{dica.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-4 mt-6 shadow-sm"
          >
            Voltar ao Dashboard
          </a>
        </div>
      </main>
    </div>
  )
}
