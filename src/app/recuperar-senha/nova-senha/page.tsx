export default function NovaSenhaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lavender">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Crie uma nova senha para sua conta. Recomendamos usar uma senha forte com letras, números e símbolos.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Nova Senha
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
                Confirmar Nova Senha
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

          <div className="text-sm text-green-600 text-center hidden">
            Senha alterada com sucesso! Você será redirecionado para a página de login.
          </div>
        </div>
      </main>
    </div>
  )
}
