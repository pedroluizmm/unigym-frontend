export default function CadastroPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lavender">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Parece que você ainda não possui uma conta. Vamos criar uma para você acessar todos os recursos do UniGym.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                placeholder="Seu nome completo"
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
                placeholder="********"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirme a Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="********"
                className="w-full p-3 rounded-md border border-gray-300 bg-lavender-light focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <a
              href="/login"
              className="block w-full bg-blue-600 text-white text-center font-medium rounded-md py-3 hover:bg-blue-700 transition-colors"
            >
              Continuar
            </a>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Já possui uma conta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
