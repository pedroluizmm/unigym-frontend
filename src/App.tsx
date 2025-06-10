import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './app/page'
import MenuPage from './app/menu/page'
import VerificacaoEmailPage from './app/verificacao-email/page'
import CadastroPage from './app/cadastro/page'
import LoginPage from './app/login/page'
import RecuperarSenhaPage from './app/recuperar-senha/page'
import DashboardPage from './app/dashboard/page'
import ExerciciosPage from './app/treino/page'
import ExercicioPage from './app/treino/exercicio/page'
import HistoricoPage from './app/historico/page'
import PerfilPage from './app/perfil/page'
import ConquistasPage from './app/conquistas/page'
import FaqDicasPage from './app/faq-dicas/page'
<<<<<<< HEAD
import ProfessorPage from './app/professor/page'
=======
import ProfessoresPage from './app/professores/page'
>>>>>>> 76b7e46d24d64ad1a91f1c6f44709d6174f89516

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/verificacao-email" element={<VerificacaoEmailPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/treino" element={<ExerciciosPage />} />
        <Route path="/treino/exercicio/:id" element={<ExercicioPage />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/conquistas" element={<ConquistasPage />} />
        <Route path="/professores" element={<ProfessoresPage />} />
        <Route path="/faq-dicas" element={<FaqDicasPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
