"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser } from "@/services/api"

export default function CadastroPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [altura, setAltura] = useState("")
  const [naoSeiAltura, setNaoSeiAltura] = useState(false)
  const [peso, setPeso] = useState("")
  const [naoSeiPeso, setNaoSeiPeso] = useState(false)
  const [dataNascimento, setDataNascimento] = useState("")
  const [naoSeiDataNascimento, setNaoSeiDataNascimento] = useState(false)
  const [objetivo, setObjetivo] = useState("")
  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
  const [diasTreino, setDiasTreino] = useState<string[]>([])
  const [duracaoTreino, setDuracaoTreino] = useState("")
  const [focoTreino, setFocoTreino] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  const nextStep = () => {
    setErro("")
    if (step === 1) {
      if (!email || !nome || !senha || !confirmarSenha) {
        setErro("Preencha todos os campos.")
        return
      }
      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.")
        return
      }
    }
    setStep(step + 1)
  }

  const prevStep = () => {
    setErro("")
    if (step > 1) setStep(step - 1)
  }

  const toggleDia = (dia: string) => {
    setDiasTreino((prev) => (prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]))
  }

  const handleSubmit = async () => {
    setErro("")
    try {
      await createUser({
        nome,
        email,
        senha,
        statusValidacao: true,
        altura: naoSeiAltura ? undefined : Number.parseFloat(altura) || undefined,
        peso: naoSeiPeso ? undefined : Number.parseFloat(peso) || undefined,
        dataNascimento: naoSeiDataNascimento ? undefined : dataNascimento || undefined,
        objetivo: objetivo || undefined,
        diasTreino: diasTreino.length ? diasTreino : undefined,
        duracaoTreino: duracaoTreino || undefined,
        focoTreino: focoTreino || undefined,
      })
      navigate("/login")
    } catch {
      setErro("Erro ao cadastrar. Verifique se o e-mail já não está em uso.")
    }
  }

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber === 1) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )
    } else if (stepNumber === 2) {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      )
    } else {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  }

  const getStepTitle = () => {
    if (step === 1) return "Informações Básicas"
    if (step === 2) return "Características Físicas"
    return "Preferências de Treino"
  }

  const getStepDescription = () => {
    if (step === 1) return "Vamos começar com suas informações essenciais"
    if (step === 2) return "Nos conte um pouco sobre suas características físicas"
    return "Defina suas preferências para personalizar seus treinos"
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <Link to="/" className="mr-4 p-2 rounded-full text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-blue-600">Cadastro Completo</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${stepNumber <= step
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  <span className="text-sm font-bold">{stepNumber}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">Passo {step} de 3</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                <div className="text-blue-600">{getStepIcon(step)}</div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{getStepTitle()}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{getStepDescription()}</p>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    placeholder="********"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="altura" className="block text-sm font-medium text-gray-700">
                      Altura (m)
                    </label>
                    <label className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={naoSeiAltura}
                        onChange={() => setNaoSeiAltura(!naoSeiAltura)}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Não sei
                    </label>
                  </div>
                  {!naoSeiAltura && (
                    <input
                      type="number"
                      step="0.01"
                      id="altura"
                      placeholder="1.75"
                      value={altura}
                      onChange={(e) => setAltura(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  )}
                  {naoSeiAltura && (
                    <div className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm sm:text-base">
                      Você pode preencher esta informação depois
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                      Peso (kg)
                    </label>
                    <label className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={naoSeiPeso}
                        onChange={() => setNaoSeiPeso(!naoSeiPeso)}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Não sei
                    </label>
                  </div>
                  {!naoSeiPeso && (
                    <input
                      type="number"
                      step="0.1"
                      id="peso"
                      placeholder="70.5"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  )}
                  {naoSeiPeso && (
                    <div className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm sm:text-base">
                      Você pode preencher esta informação depois
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                      Data de Nascimento
                    </label>
                  </div>
                  {!naoSeiDataNascimento && (
                    <input
                      type="date"
                      id="dataNascimento"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  )}
                  {naoSeiDataNascimento && (
                    <div className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm sm:text-base">
                      Você pode preencher esta informação depois
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivo (opcional)
                  </label>
                  <input
                    type="text"
                    id="objetivo"
                    placeholder="Hipertrofia, Força, Emagrecimento..."
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-3">Dias de Treino (opcional)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {diasSemana.map((dia) => (
                      <button
                        key={dia}
                        type="button"
                        onClick={() => toggleDia(dia)}
                        className={`p-3 rounded-xl text-sm font-medium border transition-colors ${diasTreino.includes(dia)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        {dia}
                      </button>
                    ))}
                  </div>
                  {diasTreino.length > 0 && (
                    <p className="text-xs text-blue-600 mt-2">
                      {diasTreino.length} {diasTreino.length === 1 ? "dia selecionado" : "dias selecionados"}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="duracaoTreino" className="block text-sm font-medium text-gray-700 mb-2">
                    Duração do Treino (opcional)
                  </label>
                  <input
                    type="text"
                    id="duracaoTreino"
                    placeholder="45-60 minutos"
                    value={duracaoTreino}
                    onChange={(e) => setDuracaoTreino(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="focoTreino" className="block text-sm font-medium text-gray-700 mb-2">
                    Foco do Treino (opcional)
                  </label>
                  <input
                    type="text"
                    id="focoTreino"
                    placeholder="Força, Resistência, Flexibilidade..."
                    value={focoTreino}
                    onChange={(e) => setFocoTreino(e.target.value)}
                    className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
            )}

            {erro && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm text-center">{erro}</p>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 sm:py-4 text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Voltar
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-4 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base ${step === 1 ? "w-full" : "flex-1"
                    }`}
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Concluir Cadastro
                </button>
              )}
            </div>

            {step === 3 && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Você pode pular os campos opcionais e preenchê-los depois no seu perfil
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
