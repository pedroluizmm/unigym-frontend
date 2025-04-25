"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Menu, X } from "lucide-react"
import { Dialog, DialogContent } from "./components/ui/dialog"
import "./LoginPage.css"

type LoginStep = "login" | "register" | "forgotPassword" | "verifyCode"

// Usuário pré-definido para demonstração
const DEMO_USER = {
  email: "demo@unygym.com",
  password: "senha123",
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<LoginStep>("login")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Estados para os formulários
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  // Estado para mensagens de erro
  const [error, setError] = useState<string | null>(null)

  // Verificar se o usuário já está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      navigate("/student-area")
    }
  }, [navigate])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido")
      return
    }

    // Verificar credenciais com o usuário de demonstração
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      // Salvar estado de login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      navigate("/student-area")
    } else {
      setError("E-mail ou senha incorretos")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido")
      return
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    // Simulação de registro bem-sucedido
    // Em uma aplicação real, você faria uma chamada à API aqui
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)
    navigate("/student-area")
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!email) {
      setError("Por favor, informe seu e-mail")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido")
      return
    }

    // Simulação de envio de código de verificação
    setStep("verifyCode")
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!verificationCode) {
      setError("Por favor, informe o código de verificação")
      return
    }

    // Simulação de verificação bem-sucedida
    // Em uma aplicação real, você faria uma chamada à API aqui
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userEmail", email)
    navigate("/student-area")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    setStep("login")
  }

  const goToHome = () => {
    navigate("/")
  }

  const goToSchedule = () => {
    navigate("/schedule")
  }

  useEffect(() => {
    const loginContainer = document.querySelector(".login-container")
    if (loginContainer) {
      loginContainer.className = "flex-1 flex items-center justify-center bg-gray-900 p-4"
    }
  }, [])

  return (
    <div className="login-page">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-sm text-white">
        <h1 className="text-xl font-bold">UnyGym</h1>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu" className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu Dialog */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-white text-black">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
              onClick={() => {
                setIsMenuOpen(false)
                goToHome()
              }}
            >
              Início
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Sobre nós
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Professores
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Perfil
            </Button>
            <Button variant="ghost" className="justify-start hover:bg-gray-100 transition-all duration-200">
              Área do Aluno
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:bg-gray-100 transition-all duration-200"
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

      <div className="login-container">
        <div className="login-card">
          {step === "login" && (
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forgot-password">
                <button type="button" onClick={() => setStep("forgotPassword")} className="text-button">
                  Esqueci a senha
                </button>
              </div>

              {error && <div className="error-message">{error}</div>}

              <Button type="submit" className="submit-button bg-blue-600 hover:bg-blue-700">
                Continuar
              </Button>

              <div className="register-prompt">
                Não tem uma conta?{" "}
                <button type="button" onClick={() => setStep("register")} className="text-button">
                  Cadastre-se
                </button>
              </div>

              <div className="demo-info">
                <p>
                  <strong>Demonstração:</strong> Use o e-mail <code>demo@unygym.com</code> e senha <code>senha123</code>
                </p>
              </div>
            </form>
          )}

          {step === "register" && (
            <form onSubmit={handleRegister} className="login-form">
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="password-hint">A senha deve ter pelo menos 8 caracteres</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <Button type="submit" className="submit-button bg-blue-600 hover:bg-blue-700">
                Continuar
              </Button>

              <div className="register-prompt">
                Já tem uma conta?{" "}
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Faça login
                </button>
              </div>
            </form>
          )}

          {step === "forgotPassword" && (
            <form onSubmit={handleForgotPassword} className="login-form">
              <div className="reset-password-info">
                <p>Informe seu e-mail para receber um código de verificação e redefinir sua senha</p>
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <Button type="submit" className="submit-button bg-blue-600 hover:bg-blue-700">
                Continuar
              </Button>

              <div className="register-prompt">
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Voltar ao login
                </button>
              </div>
            </form>
          )}

          {step === "verifyCode" && (
            <form onSubmit={handleVerifyCode} className="login-form">
              <div className="reset-password-info">
                <p>Informe o código de verificação enviado para o seu e-mail</p>
              </div>

              <div className="form-group">
                <label htmlFor="verificationCode">Código</label>
                <input
                  type="text"
                  id="verificationCode"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <Button type="submit" className="submit-button bg-blue-600 hover:bg-blue-700">
                Continuar
              </Button>

              <div className="register-prompt">
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Voltar ao login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
