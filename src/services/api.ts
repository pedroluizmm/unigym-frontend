const BASE = import.meta.env.VITE_API_URL

export interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress?: number
  total?: number
}
export interface TimeSlot {
  id: string
  start: string
  end: string
}
export interface ScheduleGridRow {
  id: string
  days: boolean[]
  occupancy: number[]
}
export interface Workout {
  id: string
  name: string
}
export interface ExerciseDTO {
  id: number
  name: string
  sets: number
  reps: number
  weight: number
  completed: boolean
}

// --- Autenticação ---
export async function login(email: string, senha: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "Credenciais inválidas");
  return data as { token: string };
}

export async function register(
  email: string,
  senha: string,
  nome: string
): Promise<{ token: string }> {
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "Erro no cadastro");
  return data as { token: string };
}

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`${BASE}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Erro ao enviar código");
}

export async function verifyCode(email: string, code: string): Promise<{ token: string }> {
  const res = await fetch(`${BASE}/auth/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || "Código inválido");
  return data as { token: string };
}

// --- Perfil do usuário ---
export async function getProfile(token: string) {
  const res = await fetch(`${BASE}/usuario/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Perfil indisponível");
  return res.json();
}

export async function updateProfile(token: string, body: any) {
  const res = await fetch(`${BASE}/usuario/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Erro ao atualizar perfil");
  return res.json();
}

// --- Workouts & Exercises ---
export interface Workout { id: string; name: string; }
export interface ExerciseDTO {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export async function getWorkouts(token: string): Promise<Workout[]> {
  const res = await fetch(`${BASE}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Falha ao carregar treinos");
  return res.json();
}

export async function getExercises(
  token: string,
  workoutId: string
): Promise<ExerciseDTO[]> {
  const res = await fetch(`${BASE}/workouts/${workoutId}/exercises`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Falha ao carregar exercícios");
  return res.json();
}

export async function updateExercise(
  token: string,
  exerciseId: number,
  data: Partial<Pick<ExerciseDTO, "completed" | "weight">>
): Promise<ExerciseDTO> {
  const res = await fetch(`${BASE}/exercises/${exerciseId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Falha ao atualizar exercício");
  return res.json();
}

// ——— Conquistas ———
export async function getAchievements(token: string): Promise<Achievement[]> {
  const res = await fetch(`${BASE}/achievements`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Falha ao carregar conquistas")
  return res.json()
}

// ——— Horários ———
export async function getScheduleSlots(token: string): Promise<{
  morning: TimeSlot[]
  afternoon: TimeSlot[]
  evening: TimeSlot[]
}> {
  const res = await fetch(`${BASE}/schedule/slots`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Falha ao carregar horários")
  return res.json()
}

export async function getScheduleGrid(
  token: string
): Promise<Record<"morning" | "afternoon" | "evening", ScheduleGridRow[]>> {
  const res = await fetch(`${BASE}/schedule/grid`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Falha ao carregar grade de horários")
  return res.json()
}

export async function getUserReservations(token: string): Promise<{ [key: string]: boolean }> {
  const res = await fetch(`${BASE}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Falha ao carregar suas reservas")
  return res.json()
}

export async function reserveSlot(
  token: string,
  period: string,
  row: string,
  col: number
): Promise<void> {
  const res = await fetch(`${BASE}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ period, row, col }),
  })
  if (!res.ok) throw new Error("Falha ao reservar horário")
}

export async function cancelReservation(
  token: string,
  period: string,
  row: string,
  col: number
): Promise<void> {
  const res = await fetch(`${BASE}/reservations`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ period, row, col }),
  })
  if (!res.ok) throw new Error("Falha ao cancelar reserva")
}
