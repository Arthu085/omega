export interface Alarm {
  id: number;
  device_id: number;
  name: string;
  status: boolean | null;
  horario_ativacao: string | null;
  horario_desativacao: string | null;
  ativo: boolean | null;
  created_at: Date | null;
  deleted_at: Date | null;
}