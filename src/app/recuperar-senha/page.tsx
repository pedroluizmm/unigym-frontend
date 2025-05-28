"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { requestPasswordReset, verifyResetCode, resetPassword } from "@/services/api"

export default function RecuperarSenhaPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<0 | 1 | 2>(0)

  const [email, setEmail] = useState("")
  const [erroEmail, setErroEmail] = useState("")
  const [loadingEmail, setLoadingEmail] = useState(false)

  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(""))
  const [erroCodigo, setErroCodigo] = useState("")

  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erroSenha, setErroSenha] = useState("")
  const [marcando, setMarcando] = useState(false)

  const handleEmailContinue = async () => {
    setErroEmail("")
    setLoadingEmail(true)
    try {
      await requestPasswordReset(email)
      localStorage.setItem("resetEmail", email)
      setStep(1)
    } catch (err: any) {
      setErroEmail(err.response?.data?.message || "Falha ao enviar o código")
    } finally {
      setLoadingEmail(false)
    }
  }

  const handleCodigoChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return
    const novo = [...codigo]
    novo[idx] = value
    setCodigo(novo)
  }

  const handleCodigoContinue = async () => {
    setErroCodigo("")
    const joined = codigo.join("")
    if (joined.length < 6) {
      setErroCodigo("Código incompleto.")
      return
    }
    const storedEmail = localStorage.getItem("resetEmail")
    if (!storedEmail) {
      setErroCodigo("E-mail não encontrado. Retorne e informe o e-mail novamente.")
      return
    }
    try {
      await verifyResetCode(storedEmail, joined)
      setStep(2)
    } catch (err: any) {
      setErroCodigo(err.response?.data?.message || "Falha ao verificar código.")
    }
  }

  const handleNovaSenhaContinue = async () => {
    setErroSenha("")
    if (!senha || !confirmarSenha) {
      setErroSenha("Preencha ambos os campos.")
      return
    }
    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.")
      return
    }
    const storedEmail = localStorage.getItem("resetEmail")
    if (!storedEmail) {
      setErroSenha("E-mail não encontrado. Retorne e informe o e-mail novamente.")
      return
    }
    setMarcando(true)
    try {
      await resetPassword(storedEmail, senha)
      localStorage.removeItem("resetEmail")
      navigate("/login")
    } catch (err: any) {
      setErroSenha(err.response?.data?.message || "Falha ao redefinir senha.")
    } finally {
      setMarcando(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {step === 0 && (
        <>
          <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
            <Link to="/" className="mr-4 p-2 rounded-full text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">Recuperar Senha</h1>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Recuperar Senha</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Para recuperar sua senha, informe o e-mail cadastrado. Enviaremos um código de verificação para você
                    prosseguir com a recuperação.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Informe o e-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="exemplo@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <button
                    onClick={handleEmailContinue}
                    disabled={loadingEmail}
                    className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base disabled:opacity-50"
                  >
                    {loadingEmail ? "Enviando…" : "Continuar"}
                  </button>

                  {erroEmail && <p className="text-red-600 text-sm text-center">{erroEmail}</p>}
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-6">
                  Lembrou sua senha?{' '}
                  <Link to="/login" className="text-blue-600 font-medium hover:underline">
                    Voltar para o login
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </>
      )}

      {step === 1 && (
        <>
          <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
            <Link to="/recuperar-senha" className="mr-4 p-2 rounded-full text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">Código de Recuperação</h1>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Código de Verificação</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Enviamos um código de verificação para o seu e-mail. Por favor, informe o código para continuar com a
                    recuperação de senha.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      Informe o código
                    </label>
                    <div className="flex justify-between gap-2">
                      {codigo.map((valor, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={valor}
                          onChange={e => handleCodigoChange(e.target.value, idx)}
                          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                    {erroCodigo && <p className="text-red-600 text-sm text-center mt-2">{erroCodigo}</p>}
                  </div>

                  <button
                    onClick={handleCodigoContinue}
                    className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base"
                  >
                    Continuar
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 text-center mt-6">
                  Não recebeu o código?{' '}
                  <button className="text-blue-600 font-medium hover:underline">Reenviar código</button>
                </p>
              </div>
            </div>
          </main>
        </>
      )}

      {step === 2 && (
        <>
          <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center sticky top-0 z-10">
            <Link to="/recuperar-senha/codigo" className="mr-4 p-2 rounded-full text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">Nova Senha</h1>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Criar Nova Senha</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Crie uma nova senha para sua conta. Recomendamos usar uma senha forte com letras, números e símbolos.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="********"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      value={confirmarSenha}
                      onChange={e => setConfirmarSenha(e.target.value)}
                      className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  {erroSenha && <p className="text-red-600 text-sm text-center">{erroSenha}</p>}

                  <button
                    onClick={handleNovaSenhaContinue}
                    disabled={marcando}
                    className="block w-full bg-blue-600 text-white text-center font-bold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base disabled:opacity-50"
                  >
                    {marcando ? "Redefinindo…" : "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  )
}
