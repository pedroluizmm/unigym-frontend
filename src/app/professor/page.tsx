// src/app/professor/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  getMyProfile,
  listUsers,
  getTreinos,
  getConquistas,
  getUsuarioConquistas,
  getHistorico,
  getTreinoExercicios,
  updateUser,
  updateTreino, // para chamadas que não têm helper específico
  type Usuario,
  type TreinoModel,
  type Conquista,
  type UsuarioConquista,
  type Historico,
  type TreinoExercicio
} from "@/services/api";
import api from "@/services/api"
import { Menu, Home, Users, Dumbbell, Award, Clock, List, PenSquare } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

/**
 * ProfessorPage.tsx
 *
 * Permite ao professor:
 * - Ver lista de usuários, editar/excluir/criar usuários
 * - Ver lista de treinos, editar status de treino, criar novos treinos
 * - Ver lista de conquistas, criar novas conquistas, atribuir conquistas a usuários
 * - Ver histórico de treinos de todos os usuários
 * - Ver lista de exercícios por treino, criar novos exercícios, vincular exercícios a treinos (TreinoExercicio)
 *
 * Para operações de criação (user, treino, exercicio, conquista, treinoExercicio),
 * usamos `api.post(...)` diretamente, pois não há helpers específicos definidos em api.ts.
 */

export default function ProfessorPage() {
  // Controle da sidebar e perfil do próprio professor
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [perfil, setPerfil] = useState<Usuario | null>(null);

  // ---- Usuários ----
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [userForm, setUserForm] = useState<Partial<Usuario>>({});
  const [userEditId, setUserEditId] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  // ---- Treinos ----
  const [treinos, setTreinos] = useState<TreinoModel[]>([]);
  const [treinoForm, setTreinoForm] = useState<Partial<{
    usuario: string;
    data: string;
    grupamentoMuscular: string;
    statusTreino: "pendente" | "concluído";
  }>>({});
  const [treinoEditId, setTreinoEditId] = useState<string | null>(null);
  const [loadingTreinos, setLoadingTreinos] = useState<boolean>(true);
  const [errorTreinos, setErrorTreinos] = useState<string | null>(null);

  // ---- Conquistas ----
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [conquistaForm, setConquistaForm] = useState<Partial<Conquista>>({});
  const [loadingConqs, setLoadingConqs] = useState<boolean>(true);
  const [errorConqs, setErrorConqs] = useState<string | null>(null);

  // ---- Usuário-Conquistas (atribuir conquistas a usuários) ----
  const [usuarioConqs, setUsuarioConqs] = useState<UsuarioConquista[]>([]);
  const [assignConqForm, setAssignConqForm] = useState<{
    usuarioId: string;
    conquistaId: string;
  }>({ usuarioId: "", conquistaId: "" });
  const [loadingAssignConqs, setLoadingAssignConqs] = useState<boolean>(false);
  const [errorAssignConqs, setErrorAssignConqs] = useState<string | null>(null);

  // ---- Histórico ----
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const [loadingHist, setLoadingHist] = useState<boolean>(true);
  const [errorHist, setErrorHist] = useState<string | null>(null);

  // ---- Exercícios por Treino (TreinoExercicio) ----
  const [treinoExs, setTreinoExs] = useState<TreinoExercicio[]>([]);
  const [exForm, setExForm] = useState<Partial<{
    treino: string;
    exercicio: string;
    series: number;
    repeticoes: number;
    cargaRecomendada?: number;
    tempoIntervalo?: string;
  }>>({});
  const [loadingExs, setLoadingExs] = useState<boolean>(true);
  const [errorExs, setErrorExs] = useState<string | null>(null);

  // ---- CARREGAMENTO INICIAL ----
  useEffect(() => {
    // Ajusta sidebar ao tamanho da janela
    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Carrega perfil do professor
    getMyProfile()
      .then((res) => setPerfil(res.data))
      .catch((err) => console.error("Erro ao carregar perfil:", err));

    // Carrega todas as seções em paralelo
    Promise.all([
      loadUsers(),
      loadTreinos(),
      loadConquistas(),
      loadHistorico(),
      loadTreinoExercicios(),
    ]).finally(() => {
      window.removeEventListener("resize", handleResize);
    });
  }, []);

  // ---- FUNÇÕES DE CARREGAMENTO ----
  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await listUsers();
      setUsuarios(res.data);
      setErrorUsers(null);
    } catch (err: any) {
      console.error(err);
      setErrorUsers(err.message || "Falha ao buscar usuários");
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadTreinos = async () => {
    setLoadingTreinos(true);
    try {
      const res = await getTreinos();
      setTreinos(res.data);
      setErrorTreinos(null);
    } catch (err: any) {
      console.error(err);
      setErrorTreinos(err.message || "Falha ao buscar treinos");
    } finally {
      setLoadingTreinos(false);
    }
  };

  const loadConquistas = async () => {
    setLoadingConqs(true);
    try {
      const res = await getConquistas();
      setConquistas(res.data);
      setErrorConqs(null);
    } catch (err: any) {
      console.error(err);
      setErrorConqs(err.message || "Falha ao buscar conquistas");
    } finally {
      setLoadingConqs(false);
    }
  };

  const loadHistorico = async () => {
    setLoadingHist(true);
    try {
      const res = await getHistorico();
      setHistoricos(res.data);
      setErrorHist(null);
    } catch (err: any) {
      console.error(err);
      setErrorHist(err.message || "Falha ao buscar histórico");
    } finally {
      setLoadingHist(false);
    }
  };

  const loadTreinoExercicios = async () => {
    setLoadingExs(true);
    try {
      // Busca todos os TreinoExercicio (não há helper específico, então usamos '/treinoExercicio' sem query)
      const res = await api.get<TreinoExercicio[]>("/treinoExercicio");
      setTreinoExs(res.data);
      setErrorExs(null);
    } catch (err: any) {
      console.error(err);
      setErrorExs(err.message || "Falha ao buscar TreinoExercicio");
    } finally {
      setLoadingExs(false);
    }
  };

  // ---- HANDLERS: USUÁRIO ----
  const handleUserFormChange = (field: keyof Usuario, value: any) => {
    setUserForm({ ...userForm, [field]: value });
  };


  const handleCreateUser = async () => {
    try {
      // Aqui é onde entraria a chamada à API para criar
      const res = await api.post("/usuarios", userForm);
      // Atualize localmente a lista de usuários (por ex. refetch ou concat)
      // resetForm, fechar modal, mostrar alerta etc.
    } catch (err: any) {
      console.error("Falha ao criar usuário:", err.response?.data?.message || err.message);
      alert("Erro ao criar usuário: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEditUser = (user: Usuario) => {
    setUserEditId(user._id);
    setUserForm({ ...user });
  };

  const handleUpdateUser = async () => {
    if (!userEditId) return;
    try {
      // Aqui é onde entraria a chamada à API para atualizar
      const res = await updateUser(userEditId, userForm);
      // Atualize localmente a lista de usuários (por ex. refetch ou substituir o item)
      // resetForm, fechar modal, notificar sucesso, etc.
    } catch (err: any) {
      console.error("Falha ao atualizar usuário:", err.response?.data?.message || err.message);
      alert("Erro ao atualizar usuário: " + (err.response?.data?.message || err.message));
    }
  };

  const handleCancelEditUser = () => {
    setUserEditId(null);
    setUserForm({});
  };

  // ---- HANDLERS: TREINO ----
  const handleTreinoFormChange = (field: keyof Omit<TreinoModel, "_id">, value: any) => {
    setTreinoForm({ ...treinoForm, [field]: value });
  };

  const handleCreateTreino = async () => {
    try {
      await api.post<TreinoModel>("/treinos", treinoForm);
      setTreinoForm({});
      await loadTreinos();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao criar treino");
    }
  };

  const handleEditTreino = (t: TreinoModel) => {
    setTreinoEditId(t._id);
    setTreinoForm({
      usuario: t.usuario,
      data: t.data,
      grupamentoMuscular: t.grupamentoMuscular,
      statusTreino: t.statusTreino,
    });
  };

  const handleUpdateTreino = async () => {
    if (!treinoEditId) return;
    try {
      await api.put<TreinoModel>(`/treinos/${treinoEditId}`, treinoForm);
      setTreinoEditId(null);
      setTreinoForm({});
      await loadTreinos();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao atualizar treino");
    }
  };

  const handleCancelEditTreino = () => {
    setTreinoEditId(null);
    setTreinoForm({});
  };

  // ---- HANDLERS: CONQUISTA ----
  const handleConquistaFormChange = (field: keyof Conquista, value: any) => {
    setConquistaForm({ ...conquistaForm, [field]: value });
  };

  const handleCreateConquista = async () => {
    try {
      await api.post<Conquista>("/conquistas", conquistaForm);
      setConquistaForm({});
      await loadConquistas();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao criar conquista");
    }
  };

  // ---- HANDLERS: ATRIBUIR CONQUISTA A USUÁRIO ----
  const handleAssignConqChange = (field: keyof typeof assignConqForm, value: any) => {
    setAssignConqForm({ ...assignConqForm, [field]: value });
  };

  const handleAssignConquista = async () => {
    const { usuarioId, conquistaId } = assignConqForm;
    if (!usuarioId || !conquistaId) {
      alert("Selecione usuário e conquista");
      return;
    }
    setLoadingAssignConqs(true);
    try {
      await api.post<UsuarioConquista>("/usuario-conquistas", {
        usuario: usuarioId,
        conquista: conquistaId,
      });
      setAssignConqForm({ usuarioId: "", conquistaId: "" });
      setErrorAssignConqs(null);
      // Recarrega lista após atribuir
      await loadUsuariosConquistas();
    } catch (err: any) {
      console.error(err);
      setErrorAssignConqs(err.message || "Erro ao atribuir conquista");
    } finally {
      setLoadingAssignConqs(false);
    }
  };

  // ---- CARREGA USUÁRIO-CONQUISTAS DE TODOS USUÁRIOS (pode filtrar por usuário, mas aqui traz tudo) ----
  const loadUsuariosConquistas = async () => {
    try {
      // Para cada usuário, buscar suas conquistas e agregar
      const agrupar: UsuarioConquista[] = [];
      for (const u of usuarios) {
        const res = await getUsuarioConquistas(u._id);
        res.data.forEach((uc) => agrupar.push(uc));
      }
      setUsuarioConqs(agrupar);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!loadingUsers && usuarios.length > 0) {
      loadUsuariosConquistas();
    }
  }, [loadingUsers]);

  // ---- HANDLERS: TREINO-EXERCICIO (Criar vinculação Exercício↔Treino) ----
  const handleExFormChange = (field: keyof typeof exForm, value: any) => {
    setExForm({ ...exForm, [field]: value });
  };

  const handleCreateTreinoExercicio = async () => {
    try {
      await api.post<TreinoExercicio>("/treinoExercicio", exForm);
      setExForm({});
      await loadTreinoExercicios();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Erro ao criar TreinoExercicio");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={perfil || undefined} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Cabeçalho */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="p-2 rounded-full text-blue-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-blue-600 lg:ml-0">Área do Professor</h1>
          </div>
        </header>

        <main className="flex-1 p-4 space-y-8 max-w-7xl mx-auto w-full">
          {/* ===== USUÁRIOS ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Gerenciar Usuários</h2>
            </div>

            {loadingUsers ? (
              <p className="text-blue-600">Carregando usuários…</p>
            ) : errorUsers ? (
              <p className="text-red-600">{errorUsers}</p>
            ) : (
              <>
                {/* Lista de Usuários */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 text-left text-sm font-medium">Nome</th>
                        <th className="p-2 text-left text-sm font-medium">E-mail</th>
                        <th className="p-2 text-left text-sm font-medium">Validação</th>
                        <th className="p-2 text-left text-sm font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <tr key={u._id} className="border-t">
                          <td className="p-2 text-sm">{u.nome}</td>
                          <td className="p-2 text-sm">{u.email}</td>
                          <td className="p-2 text-sm">
                            {u.statusValidacao ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                Validado
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                Pendente
                              </span>
                            )}
                          </td>
                          <td className="p-2 text-sm space-x-2">
                            <button
                              className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                              onClick={() => handleEditUser(u)}
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Formulário de Criação / Edição */}
                <div className="border-t pt-4">
                  <h3 className="text-md font-semibold mb-2">
                    {userEditId ? "Editar Usuário" : "Criar Novo Usuário"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={userForm.nome || ""}
                      onChange={(e) => handleUserFormChange("nome", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Altura (m)"
                      value={userForm.altura != null ? String(userForm.altura) : ""}
                      onChange={(e) =>
                        handleUserFormChange("altura", e.target.value ? parseFloat(e.target.value) : undefined)
                      }
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="number"
                      placeholder="Peso (kg)"
                      value={userForm.peso != null ? String(userForm.peso) : ""}
                      onChange={(e) =>
                        handleUserFormChange("peso", e.target.value ? parseFloat(e.target.value) : undefined)
                      }
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="date"
                      placeholder="Data de Nascimento"
                      value={userForm.dataNascimento?.substring(0, 10) || ""}
                      onChange={(e) =>
                        handleUserFormChange("dataNascimento", e.target.value || undefined)
                      }
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Objetivo (ex: Hipertrofia)"
                      value={userForm.objetivo || ""}
                      onChange={(e) => handleUserFormChange("objetivo", e.target.value || undefined)}
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Dias de Treino (separados por vírgula)"
                      value={userForm.diasTreino ? userForm.diasTreino.join(",") : ""}
                      onChange={(e) =>
                        handleUserFormChange(
                          "diasTreino",
                          e.target.value
                            ? e.target.value.split(",").map((d) => d.trim()).filter((d) => d.length > 0)
                            : undefined
                        )
                      }
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Duração de Treino (ex: 45min)"
                      value={userForm.duracaoTreino || ""}
                      onChange={(e) =>
                        handleUserFormChange("duracaoTreino", e.target.value || undefined)
                      }
                      className="p-2 border border-gray-300 rounded"
                    />

                    <input
                      type="text"
                      placeholder="Foco de Treino (ex: Peito, Costas)"
                      value={userForm.focoTreino || ""}
                      onChange={(e) =>
                        handleUserFormChange("focoTreino", e.target.value || undefined)
                      }
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={userForm.email || ""}
                      onChange={(e) => handleUserFormChange("email", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="date"
                      placeholder="Data de Nascimento"
                      value={userForm.dataNascimento?.substring(0, 10) || ""}
                      onChange={(e) => handleUserFormChange("dataNascimento", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={userForm.statusValidacao ? "true" : "false"}
                      onChange={(e) =>
                        handleUserFormChange("statusValidacao", e.target.value === "true")
                      }
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="false">Pendente</option>
                      <option value="true">Validado</option>
                    </select>
                  </div>
                  <div className="mt-4 space-x-2">
                    {userEditId ? (
                      <>
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded"
                          onClick={handleUpdateUser}
                        >
                          Salvar Alterações
                        </button>
                        <button
                          onClick={handleUpdateUser}
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Atualizar
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                          onClick={handleCancelEditUser}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={handleCreateUser}
                      >
                        Criar Usuário
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>

          {/* ===== TREINOS ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Dumbbell className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Gerenciar Treinos</h2>
            </div>

            {loadingTreinos ? (
              <p className="text-blue-600">Carregando treinos…</p>
            ) : errorTreinos ? (
              <p className="text-red-600">{errorTreinos}</p>
            ) : (
              <>
                {/* Lista de Treinos */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 text-left text-sm font-medium">Usuário ID</th>
                        <th className="p-2 text-left text-sm font-medium">Data</th>
                        <th className="p-2 text-left text-sm font-medium">Grupo</th>
                        <th className="p-2 text-left text-sm font-medium">Status</th>
                        <th className="p-2 text-left text-sm font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treinos.map((t) => (
                        <tr key={t._id} className="border-t">
                          <td className="p-2 text-sm">{t.usuario}</td>
                          <td className="p-2 text-sm">{new Date(t.data).toLocaleString()}</td>
                          <td className="p-2 text-sm">{t.grupamentoMuscular}</td>
                          <td className="p-2 text-sm">
                            {t.statusTreino === "concluído" ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                Concluído
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                Pendente
                              </span>
                            )}
                          </td>
                          <td className="p-2 text-sm space-x-2">
                            <button
                              className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                              onClick={() => handleEditTreino(t)}
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Formulário de Criação / Edição de Treino */}
                <div className="border-t pt-4">
                  <h3 className="text-md font-semibold mb-2">
                    {treinoEditId ? "Editar Treino" : "Criar Novo Treino"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                      value={treinoForm.usuario || ""}
                      onChange={(e) => handleTreinoFormChange("usuario", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">Selecione Usuário</option>
                      {usuarios.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.nome} ({u._id.substring(0, 6)})
                        </option>
                      ))}
                    </select>
                    <input
                      type="datetime-local"
                      value={treinoForm.data || ""}
                      onChange={(e) => handleTreinoFormChange("data", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Grupamento Muscular"
                      value={treinoForm.grupamentoMuscular || ""}
                      onChange={(e) => handleTreinoFormChange("grupamentoMuscular", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <select
                      value={treinoForm.statusTreino || "pendente"}
                      onChange={(e) =>
                        handleTreinoFormChange(
                          "statusTreino",
                          e.target.value as "pendente" | "concluído"
                        )
                      }
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="concluído">Concluído</option>
                    </select>
                  </div>
                  <div className="mt-4 space-x-2">
                    {treinoEditId ? (
                      <>
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded"
                          onClick={handleUpdateTreino}
                        >
                          Salvar Alterações
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                          onClick={handleCancelEditTreino}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={handleCreateTreino}
                      >
                        Criar Treino
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>

          {/* ===== CONQUISTAS ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Gerenciar Conquistas</h2>
            </div>

            {loadingConqs ? (
              <p className="text-blue-600">Carregando conquistas…</p>
            ) : errorConqs ? (
              <p className="text-red-600">{errorConqs}</p>
            ) : (
              <>
                {/* Lista de Conquistas */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 text-left text-sm font-medium">Nome</th>
                        <th className="p-2 text-left text-sm font-medium">Descrição</th>
                        <th className="p-2 text-left text-sm font-medium">Ícone URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conquistas.map((c) => (
                        <tr key={c._id} className="border-t">
                          <td className="p-2 text-sm">{c.nome}</td>
                          <td className="p-2 text-sm">{c.descricao || "-"}</td>
                          <td className="p-2 text-sm">{c.iconeUrl || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Formulário de Criação de Conquista */}
                <div className="border-t pt-4">
                  <h3 className="text-md font-semibold mb-2">Criar Nova Conquista</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Nome da Conquista"
                      value={conquistaForm.nome || ""}
                      onChange={(e) => handleConquistaFormChange("nome", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={conquistaForm.descricao || ""}
                      onChange={(e) => handleConquistaFormChange("descricao", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="URL do Ícone"
                      value={conquistaForm.iconeUrl || ""}
                      onChange={(e) => handleConquistaFormChange("iconeUrl", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={handleCreateConquista}
                    >
                      Criar Conquista
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* ===== ATRIBUIR CONQUISTA A USUÁRIO ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Atribuir Conquista a Usuário</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={assignConqForm.usuarioId}
                onChange={(e) => handleAssignConqChange("usuarioId", e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Selecione Usuário</option>
                {usuarios.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.nome} ({u._id.substring(0, 6)})
                  </option>
                ))}
              </select>
              <select
                value={assignConqForm.conquistaId}
                onChange={(e) => handleAssignConqChange("conquistaId", e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Selecione Conquista</option>
                {conquistas.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.nome} ({c._id.substring(0, 6)})
                  </option>
                ))}
              </select>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAssignConquista}
                disabled={loadingAssignConqs}
              >
                {loadingAssignConqs ? "Atribuindo…" : "Atribuir"}
              </button>
            </div>
            {errorAssignConqs && <p className="mt-2 text-red-600">{errorAssignConqs}</p>}

            {/* Lista de Atribuições */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="p-2 text-left text-sm font-medium">Usuário ID</th>
                    <th className="p-2 text-left text-sm font-medium">Conquista</th>
                    <th className="p-2 text-left text-sm font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarioConqs.map((uc) => (
                    <tr key={uc._id} className="border-t">
                      <td className="p-2 text-sm">{uc.conquista._id}</td>
                      <td className="p-2 text-sm">{uc.conquista.nome}</td>
                      <td className="p-2 text-sm">
                        {new Date(uc.data).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ===== HISTÓRICO ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Histórico de Treinos</h2>
            </div>

            {loadingHist ? (
              <p className="text-blue-600">Carregando histórico…</p>
            ) : errorHist ? (
              <p className="text-red-600">{errorHist}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left text-sm font-medium">Data Realização</th>
                      <th className="p-2 text-left text-sm font-medium">Nome do Treino</th>
                      <th className="p-2 text-left text-sm font-medium">Tempo Total</th>
                      <th className="p-2 text-left text-sm font-medium">Observações</th>
                      <th className="p-2 text-left text-sm font-medium">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicos.map((h) => (
                      <tr key={h._id} className="border-t">
                        <td className="p-2 text-sm">
                          {new Date(h.dataRealizacao).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-2 text-sm">{h.treino.nome}</td>
                        <td className="p-2 text-sm">{h.tempoTotal || "-"}</td>
                        <td className="p-2 text-sm">{h.observacoes || "-"}</td>
                        <td className="p-2 text-sm">{h.feedback || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* ===== TREINO-EXERCICIO ===== */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <List className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Gerenciar Treino‐Exercício</h2>
            </div>

            {loadingExs ? (
              <p className="text-blue-600">Carregando Treino‐Exercício…</p>
            ) : errorExs ? (
              <p className="text-red-600">{errorExs}</p>
            ) : (
              <>
                {/* Lista de TreinoExercicio */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 text-left text-sm font-medium">Treino ID</th>
                        <th className="p-2 text-left text-sm font-medium">Exercício ID</th>
                        <th className="p-2 text-left text-sm font-medium">Séries</th>
                        <th className="p-2 text-left text-sm font-medium">Repetições</th>
                        <th className="p-2 text-left text-sm font-medium">Descanso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {treinoExs.map((te) => (
                        <tr key={te._id} className="border-t">
                          <td className="p-2 text-sm">{te.treino._id}</td>
                          <td className="p-2 text-sm">{te.exercicio._id}</td>
                          <td className="p-2 text-sm">{te.series}</td>
                          <td className="p-2 text-sm">{te.repeticoes}</td>
                          <td className="p-2 text-sm">{te.tempoIntervalo || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Formulário de Criação de TreinoExercicio */}
                <div className="border-t pt-4">
                  <h3 className="text-md font-semibold mb-2">Vincular Exercício a Treino</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                      value={exForm.treino || ""}
                      onChange={(e) => handleExFormChange("treino", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="">Selecione Treino</option>
                      {treinos.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.grupamentoMuscular} ({t._id.substring(0, 6)})
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Exercício ID"
                      value={exForm.exercicio || ""}
                      onChange={(e) => handleExFormChange("exercicio", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Séries"
                      value={exForm.series || ""}
                      onChange={(e) => handleExFormChange("series", Number(e.target.value))}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Repetições"
                      value={exForm.repeticoes || ""}
                      onChange={(e) => handleExFormChange("repeticoes", Number(e.target.value))}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Carga Recomendada (kg)"
                      value={exForm.cargaRecomendada || ""}
                      onChange={(e) =>
                        handleExFormChange("cargaRecomendada", Number(e.target.value))
                      }
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Tempo Intervalo (ex: 60s)"
                      value={exForm.tempoIntervalo || ""}
                      onChange={(e) => handleExFormChange("tempoIntervalo", e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                      onClick={handleCreateTreinoExercicio}
                    >
                      Vincular
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
