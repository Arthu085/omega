import { EStatusUser } from "../enums/user-status";

export interface UserCreateDTO {
  nome?: string;
  sobrenome?: string,
  status?: EStatusUser;
  email?: string,
  senha?: string
  role?: string
}
