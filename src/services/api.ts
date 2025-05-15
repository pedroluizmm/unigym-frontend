// src/services/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// instancia do Axios
const api: AxiosInstance = axios.create({
  baseURL: '/api'
})

// (Opcional) Defina suas interfaces de dado
export interface Usuario {
  _id: string
  nome: string
  email: string
  // …
}
export interface Treino { /* … */ }
export interface Exercicio { /* … */ }
// etc…

// Usuários
export const listUsers = (): Promise<AxiosResponse<Usuario[]>> =>
  api.get('/usuarios')

export const getUser = (id: string): Promise<AxiosResponse<Usuario>> =>
  api.get(`/usuarios/${id}`)

export const createUser = (data: Partial<Usuario>): Promise<AxiosResponse<Usuario>> =>
  api.post('/usuarios', data)

export const updateUser = (
  id: string,
  data: Partial<Usuario>
): Promise<AxiosResponse<Usuario>> =>
  api.put(`/usuarios/${id}`, data)

export const deleteUser = (id: string): Promise<AxiosResponse<void>> =>
  api.delete(`/usuarios/${id}`)

export const validateEmail = (userId: string): Promise<AxiosResponse<Usuario>> =>
  api.put(`/usuarios/${userId}/validate-email`)

// Treinos
export const fetchWorkouts = (): Promise<AxiosResponse<Treino[]>> =>
  api.get('/treinos')

export const completeExercise = (
  exerciseLog: { treinoId: string; exercicioId: string; feito: boolean }
): Promise<AxiosResponse<any>> =>
  api.post('/treino-exercicios/complete', exerciseLog)

// Exercícios
export const fetchExercises = (): Promise<AxiosResponse<Exercicio[]>> =>
  api.get('/exercicios')

// Histórico de treinos
export const fetchHistory = (): Promise<AxiosResponse<any>> =>
  api.get('/historicos')

// FAQ e Dicas
export const fetchFaq = (): Promise<AxiosResponse<any>> =>
  api.get('/faq')
export const fetchDicas = (): Promise<AxiosResponse<any>> =>
  api.get('/dicas')

// Gamificação
export const addConquista = (
  usuarioId: string,
  conquistaId: string
): Promise<AxiosResponse<any>> =>
  api.post('/usuario-conquistas', { usuarioId, conquistaId })

export const fetchConquistas = (usuarioId: string): Promise<AxiosResponse<any>> =>
  api.get(`/usuario-conquistas/${usuarioId}`)

// IA (stubs)
export const sugestaoAlongamento = (
  grupoMuscular: string
): Promise<AxiosResponse<string>> =>
  api.post('/ia/alongamento', { grupoMuscular })

export const descricaoExercicio = (
  nomeExercicio: string
): Promise<AxiosResponse<string>> =>
  api.post('/ia/descricao-exercicio', { nomeExercicio })

export default api
