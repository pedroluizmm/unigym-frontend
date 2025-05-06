"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Menu, X, ArrowLeft, Mail, Lock, User, KeyRound } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import "./LoginPage.css"

import {
  login as loginApi,
  register as registerApi,
  forgotPassword as forgotPasswordApi,
  verifyCode as verifyCodeApi,
} from "./services/api"

type LoginStep = "login" | "register" | "forgotPassword" | "verifyCode"

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<LoginStep>("login")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/student-area")
    }
  }, [navigate])

  const validateEmail = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      return setError("Por favor, preencha todos os campos")
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido")
    }
    try {
      const { token } = await loginApi(email, password)
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      navigate("/student-area")
    } catch (err: any) {
      setError(err.message)
    }
  }

  // --- REGISTER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email || !password || !confirmPassword) {
      return setError("Por favor, preencha todos os campos")
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido")
    }
    if (password.length < 8) {
      return setError("A senha deve ter pelo menos 8 caracteres")
    }
    if (password !== confirmPassword) {
      return setError("As senhas não coincidem")
    }
    try {
      const { token } = await registerApi(email, password, name.trim())
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      navigate("/student-area")
    } catch (err: any) {
      setError(err.message)
    }
  }

  // --- ESQUECI A SENHA ---
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) {
      return setError("Por favor, informe seu e-mail")
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido")
    }
    try {
      await forgotPasswordApi(email)
      setStep("verifyCode")
    } catch (err: any) {
      setError(err.message)
    }
  }

  // --- VERIFICAR CÓDIGO ---
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!verificationCode) {
      return setError("Por favor, informe o código de verificação")
    }
    try {
      const { token } = await verifyCodeApi(email, verificationCode)
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      navigate("/student-area")
    } catch (err: any) {
      setError(err.message)
    }
  }

  const goToHome = () => navigate("/")
  const goToSchedule = () => navigate("/schedule")

  // forçar container full-screen
  useEffect(() => {
    const c = document.querySelector(".login-container")
    if (c) c.className = "flex-1 flex items-center justify-center bg-gray-50 p-4"
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-blue-600">
      <nav className="flex justify-between items-center p-4 bg-blue-700 shadow-md text-white">
        <div className="flex items-center gap-2">
          <button onClick={goToHome} className="p-1 rounded-full hover:bg-blue-600 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">UniGym</h1>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Menu"
          className="p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md bg-white text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToHome()
              }}
            >
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Professores
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Perfil
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200 py-3">
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200 py-3"
              onClick={() => {
                setIsMenuOpen(false)
                goToSchedule()
              }}
            >
              Horários
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-xl overflow-hidden">
          {step === "login" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Entrar</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setStep("forgotPassword")}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Esqueci a senha
                  </button>
                </div>
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Continuar
                </Button>
                <p className="text-center text-gray-600 text-sm">
                  Não tem uma conta?{" "}
                  <button type="button" onClick={() => setStep("register")} className="text-blue-600 hover:underline">
                    Cadastre-se
                  </button>
                </p>
              </form>
            </div>
          )}

          {step === "register" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Criar conta</h2>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Continuar
                </Button>
                <p className="text-center text-gray-600 text-sm">
                  Já tem uma conta?{" "}
                  <button type="button" onClick={() => setStep("login")} className="text-blue-600 hover:underline">
                    Faça login
                  </button>
                </p>
              </form>
            </div>
          )}

          {step === "forgotPassword" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Recuperar senha</h2>
              <p className="text-gray-600 mb-6 text-center">Informe seu e-mail para receber um código de verificação</p>
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Continuar
                </Button>
                <p className="text-center text-gray-600 text-sm">
                  <button type="button" onClick={() => setStep("login")} className="text-blue-600 hover:underline">
                    Voltar ao login
                  </button>
                </p>
              </form>
            </div>
          )}

          {step === "verifyCode" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Verificar código</h2>
              <p className="text-gray-600 mb-6 text-center">Informe o código enviado para seu e-mail</p>
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="verificationCode"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <KeyRound className="h-4 w-4" />
                    Código
                  </label>
                  <input
                    id="verificationCode"
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
                    maxLength={6}
                  />
                </div>
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                  Continuar
                </Button>
                <p className="text-center text-gray-600 text-sm">
                  <button type="button" onClick={() => setStep("login")} className="text-blue-600 hover:underline">
                    Voltar ao login
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
