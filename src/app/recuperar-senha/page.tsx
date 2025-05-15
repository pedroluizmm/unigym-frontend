export default function RecuperarSenhaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lavender">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Para recuperar sua senha, informe o e-mail cadastrado. Enviaremos um código de verificação para você
              prosseguir com a recuperação.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Informe o e-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <a
              href="/recuperar-senha/codigo"
              className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
            >
              Continuar
            </a>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Lembrou sua senha?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Voltar para o login
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
