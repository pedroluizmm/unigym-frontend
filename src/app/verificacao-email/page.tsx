"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { findUserByEmail, type Usuario } from "@/services/api"

export default function VerificacaoEmailPage() {
  const [email, setEmail] = useState("")
  const [erro, setErro] = useState("")
  const [step, setStep] = useState(1)
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(""))
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<Usuario | null>(null)
  const navigate = useNavigate()

  const handleContinue = async () => {
    setErro("")
    try {
      const { data } = await findUserByEmail(email)
      if (data.statusValidacao) {
        setUsuarioEncontrado(data)
        setStep(2)
      } else {
        setErro("E-mail encontrado, mas ainda não validado presencialmente.")
      }
    } catch {
      setErro("E-mail não encontrado ou não validado.")
    }
  }

  const handleCodigoChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return
    const novo = [...codigo]
    novo[index] = value
    setCodigo(novo)
  }

  const handleSubmitCodigo = () => {
    const cod = codigo.join("")
    if (cod.length < 6) {
      setErro("Código incompleto.")
      return
    }
    if (usuarioEncontrado) navigate("/login")
    else navigate("/cadastro")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
        <Link to="/" className="mr-4 p-2 rounded-full text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-blue-600">Verificação de E-mail</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
            {step === 1 ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Verificar E-mail</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Para acessar sua conta, precisamos verificar seu e-mail. Por favor, informe o endereço de e-mail
                    cadastrado para continuar.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Informe e-mail
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

                  <button
                    onClick={handleContinue}
                    className="w-full bg-blue-600 text-white font-bold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
                  >
                    Continuar
                  </button>

                  {erro && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-600 text-sm text-center">{erro}</p>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-6">
                  Não tem uma conta? Você será direcionado para o cadastro após verificarmos seu e-mail.
                </p>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Código de Verificação</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Enviamos um código de verificação para o seu e-mail. Por favor, informe o código para continuar.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      Informe o código
                    </label>
                    <div className="flex justify-between gap-2">
                      {codigo.map((valor, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={valor}
                          onChange={(e) => handleCodigoChange(e.target.value, i)}
                          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitCodigo}
                    className="w-full bg-blue-600 text-white font-bold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
                  >
                    Continuar
                  </button>

                  {erro && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-600 text-sm text-center">{erro}</p>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-6">
                  Não recebeu o código?{" "}
                  <button className="text-blue-600 font-medium hover:underline">Reenviar código</button>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
