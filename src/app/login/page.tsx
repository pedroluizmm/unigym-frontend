export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lavender">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                defaultValue="exemplo@gmail.com"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                defaultValue="password"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between text-sm pt-1">
              <a href="/recuperar-senha" className="text-gray-600 hover:text-blue-600">
                Esqueceu sua senha?
              </a>
              <a href="/cadastro" className="text-gray-600 hover:text-blue-600">
                Cadastre-se
              </a>
            </div>
          </div>

          <a
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
          >
            Continuar
          </a>
        </div>
      </main>
    </div>
  )
}
