import { EStatusFuncionario } from "../enums/status-funcionario";

export interface cadastroFuncionarioDto {
  id?: number;
  nome?: string;
  sobrenome?: string,
  status?: EStatusFuncionario;
  email?: string,
  senha?: string
}
