"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Menu, X } from "lucide-react";
import { Dialog, DialogContent } from "./components/ui/dialog";
import "./LoginPage.css";

import {
  login as loginApi,
  register as registerApi,
  forgotPassword as forgotPasswordApi,
  verifyCode as verifyCodeApi,
} from "./services/api";

type LoginStep = "login" | "register" | "forgotPassword" | "verifyCode";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/student-area");
    }
  }, [navigate]);

  const validateEmail = (em: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      return setError("Por favor, preencha todos os campos");
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido");
    }
    try {
      const { token } = await loginApi(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/student-area");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // --- REGISTER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email || !password || !confirmPassword) {
      return setError("Por favor, preencha todos os campos");
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido");
    }
    if (password.length < 8) {
      return setError("A senha deve ter pelo menos 8 caracteres");
    }
    if (password !== confirmPassword) {
      return setError("As senhas não coincidem");
    }
    try {
      const { token } = await registerApi(email, password, name.trim());
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/student-area");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // --- ESQUECI A SENHA ---
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      return setError("Por favor, informe seu e-mail");
    }
    if (!validateEmail(email)) {
      return setError("Por favor, insira um e-mail válido");
    }
    try {
      await forgotPasswordApi(email);
      setStep("verifyCode");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // --- VERIFICAR CÓDIGO ---
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!verificationCode) {
      return setError("Por favor, informe o código de verificação");
    }
    try {
      const { token } = await verifyCodeApi(email, verificationCode);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/student-area");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const goToHome = () => navigate("/");
  const goToSchedule = () => navigate("/schedule");

  // forçar container full-screen
  useEffect(() => {
    const c = document.querySelector(".login-container");
    if (c) c.className = "flex-1 flex items-center justify-center bg-gray-900 p-4";
  }, []);

  return (
    <div className="login-page">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">UnyGym</h1>
        <button onClick={() => setIsMenuOpen(true)} aria-label="Menu">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-md bg-white text-black">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" onClick={() => { setIsMenuOpen(false); goToHome(); }}>
              Início
            </Button>
            <Button variant="ghost">Sobre nós</Button>
            <Button variant="ghost">Professores</Button>
            <Button variant="ghost">Perfil</Button>
            <Button variant="ghost">Área do Aluno</Button>
            <Button variant="ghost" onClick={() => { setIsMenuOpen(false); goToSchedule(); }}>
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
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="forgot-password">
                <button type="button" onClick={() => setStep("forgotPassword")} className="text-button">
                  Esqueci a senha
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
              <Button type="submit" className="submit-button">
                Continuar
              </Button>
              <p className="register-prompt">
                Não tem uma conta?{" "}
                <button type="button" onClick={() => setStep("register")} className="text-button">
                  Cadastre-se
                </button>
              </p>
            </form>
          )}

          {step === "register" && (
            <form onSubmit={handleRegister} className="login-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <small className="password-hint">A senha deve ter pelo menos 8 caracteres</small>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <Button type="submit" className="submit-button">
                Continuar
              </Button>
              <p className="register-prompt">
                Já tem uma conta?{" "}
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Faça login
                </button>
              </p>
            </form>
          )}

          {step === "forgotPassword" && (
            <form onSubmit={handleForgotPassword} className="login-form">
              <p className="reset-password-info">
                Informe seu e-mail para receber um código de verificação
              </p>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <Button type="submit" className="submit-button">
                Continuar
              </Button>
              <p className="register-prompt">
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Voltar ao login
                </button>
              </p>
            </form>
          )}

          {step === "verifyCode" && (
            <form onSubmit={handleVerifyCode} className="login-form">
              <p className="reset-password-info">
                Informe o código enviado para seu e-mail
              </p>
              <div className="form-group">
                <label htmlFor="verificationCode">Código</label>
                <input
                  id="verificationCode"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <Button type="submit" className="submit-button">
                Continuar
              </Button>
              <p className="register-prompt">
                <button type="button" onClick={() => setStep("login")} className="text-button">
                  Voltar ao login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
