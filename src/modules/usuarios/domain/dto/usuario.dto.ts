import { EStatusUsuario } from "../enums/status-usuario";
import { ERoleUsuario } from "../enums/role-usuario";

export interface UsuarioDTO {
    id?: number;
    email: string;
    senha?: string;
    status?: EStatusUsuario;
    nome: string;
    sobrenome: string;
    roles?: ERoleUsuario;
  }