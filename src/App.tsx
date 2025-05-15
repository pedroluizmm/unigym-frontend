// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import das páginas conforme sua estrutura em src/app
import LandingPage from './app/page'
import MenuPage from './app/menu/page'
import VerificacaoEmailPage from './app/verificacao-email/page'
import CadastroPage from './app/cadastro/page'
import LoginPage from './app/login/page'
import DashboardPage from './app/dashboard/page'
import ExercicioPage from './app/exercicio/page'
import HistoricoPage from './app/historico/page'
import PerfilPage from './app/perfil/page'
import ConquistasPage from './app/conquistas/page'
import FaqDicasPage from './app/faq-dicas/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/verificacao-email" element={<VerificacaoEmailPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exercicio" element={<ExercicioPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/conquistas" element={<ConquistasPage />} />
        <Route path="/faq-dicas" element={<FaqDicasPage />} />
      </Routes>
    </BrowserRouter>
  )
}
