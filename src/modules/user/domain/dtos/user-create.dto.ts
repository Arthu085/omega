import { ERolesUser } from "../enums/user-roles";
import { EStatusUser } from "../enums/user-status";

export interface UserCreateDTO {
  nome?: string;
  lastname?: string,
  status?: EStatusUser;
  email?: string,
  senha?: string
  role?: ERolesUser
}
