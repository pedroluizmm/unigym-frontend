import axios, { AxiosInstance, AxiosResponse } from 'axios'
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
})
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log('>> Bearer token (front):', token);
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('>> Axios config:', config);
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado - limpa armazenamento e redireciona para login
      localStorage.removeItem('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface Usuario {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  dataNascimento?: string;
  altura?: number;
  peso?: number;
  objetivo?: string;
  diasTreino?: string[];
  duracaoTreino?: string;
  focoTreino?: string;
  idade?: number;
  statusValidacao?: boolean;
}
export interface Conquista {
  _id: string
  nome: string
  descricao?: string
  iconeUrl?: string
}

export interface UsuarioConquista {
  _id: string
  conquista: Conquista
  data: string
}
export interface TreinoModel {
  _id: string
  usuario: string
  data: string
  grupamentoMuscular: string
  statusTreino: 'pendente' | 'concluído'
}
export interface Treino {
  id: string
  nome: string
  exercicios: number
  tempo: string
}
export interface Exercicio {
  _id: string
  nome: string
  descricao?: string
  grupoMuscular: string
  videoUrl?: string
  imagemUrl?: string
}

export interface TreinoExercicio {
  _id: string
  exercicio: Exercicio
  series: number
  repeticoes: number
  cargaRecomendada?: number
  tempoIntervalo?: string
  feito: boolean
}

export interface Progresso {
  treinos: number
  calorias: number
  tempo: string
}

export interface ProximoTreino {
  nome: string
  horario: string
}
export interface TreinoExercicio {
  _id: string;
  treino: {
    _id: string;
    usuario: string;
    grupamentoMuscular: string;
    data: string;
    statusTreino: 'pendente' | 'concluído';
  };
  exercicio: Exercicio;
  series: number;
  repeticoes: number;
  cargaRecomendada?: number;
  tempoIntervalo?: string;
  feito: boolean;
}
export interface Historico {
  _id: string;
  treino: {
    _id: string;
    nome: string;
    exercicios: number;
    tempo: string;
    calorias?: number;
  };
  dataRealizacao: string;
  tempoTotal?: string;
  observacoes?: string;
  feedback?: string;
}
export interface DashboardData {
  treinos: Treino[];
  progresso: Progresso;
  proximosTreinos: ProximoTreino[];
  history: { date: string; treinos: number }[];
}

export const fetchDashboardData = (): Promise<AxiosResponse<DashboardData>> =>
  api.get('/dashboard');

export const requestPasswordReset = (email: string) =>
  api.post('/usuarios/recuperar-senha', { email });

export const verifyResetCode = (email: string, code: string) =>
  api.post('/usuarios/recuperar-senha/codigo', { email, code });

export const resetPassword = (email: string, senha: string) =>
  api.post('/usuarios/recuperar-senha/nova-senha', { email, senha });

export const getTreinos = (): Promise<AxiosResponse<TreinoModel[]>> =>
  api.get('/treinos')

export const getTreinoExercicios = (treinoId: string): Promise<AxiosResponse<TreinoExercicio[]>> =>
  api.get(`/treinoExercicio?treino=${treinoId}`)
export const getTreinoExercicio = (id: string): Promise<AxiosResponse<TreinoExercicio>> =>
  api.get(`/treinoExercicio/${id}`)
export const updateTreino = (
  id: string,
  data: Partial<{
    grupamentoMuscular: string
    data: string
    statusTreino: 'pendente' | 'concluído'
  }>
): Promise<AxiosResponse<TreinoModel>> =>
  api.put(`/treinos/${id}`, data)
export const getHistorico = (): Promise<AxiosResponse<Historico[]>> =>
  api.get('/historicos');
export const getConquistas = (): Promise<AxiosResponse<Conquista[]>> =>
  api.get('/conquistas')
export const getUsuarioConquistas = (usuarioId: string): Promise<AxiosResponse<UsuarioConquista[]>> =>
  api.get(`/usuario-conquistas/${usuarioId}`)

export const getMyProfile = (): Promise<AxiosResponse<Usuario>> =>
  api.get('/usuarios/me')

export const findUserByEmail = (email: string): Promise<AxiosResponse<Usuario>> =>
  api.get(`/usuarios/buscar-por-email?email=${encodeURIComponent(email)}`)

export const listUsers = (): Promise<AxiosResponse<Usuario[]>> =>
  api.get('/usuarios')

export const getUser = (id: string): Promise<AxiosResponse<Usuario>> =>
  api.get(`/usuarios/${id}`)

export const createUser = (data: Partial<Usuario>): Promise<AxiosResponse<Usuario>> =>
  api.post('/usuarios', data)

export const updateUser = (id: string, data: Partial<Usuario>): Promise<AxiosResponse<Usuario>> =>
  api.put(`/usuarios/${id}`, data)

export const deleteUser = (id: string): Promise<AxiosResponse<void>> =>
  api.delete(`/usuarios/${id}`)

export const validateEmail = (userId: string): Promise<AxiosResponse<Usuario>> =>
  api.put(`/usuarios/${userId}/validate-email`)

export default api
