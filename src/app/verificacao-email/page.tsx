"use client"

import { useState } from "react"

export default function VerificacaoEmailPage() {
  const [step, setStep] = useState(1)

  const handleContinue = () => {
    setStep(2)
  }

  return (
    <div className="flex flex-col min-h-screen bg-lavender">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {step === 1 ? (
            <>
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Para acessar sua conta, precisamos verificar seu e-mail. Por favor, informe o endereço de e-mail
                  cadastrado para continuar.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Informe e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
                >
                  Continuar
                </button>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Não tem uma conta? Você será direcionado para o cadastro após verificarmos seu e-mail.
              </p>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Enviamos um código de verificação para o seu e-mail. Por favor, informe o código para continuar.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    Informe o código
                  </label>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ))}
                  </div>
                </div>

                <a
                  href="/cadastro"
                  className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
                >
                  Continuar
                </a>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Não recebeu o código? <button className="text-blue-600 hover:underline">Reenviar código</button>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
