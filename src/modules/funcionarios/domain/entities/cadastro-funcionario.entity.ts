import { EStatusFuncionario } from "../enums/status-funcionario";

export class CadastroFuncionarioEntity {
  id?: number;
  nome?: string;
  sobrenome?: string;
  email?: string;
  senha?: string;
  status: EStatusFuncionario = EStatusFuncionario.ATIVO;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<CadastroFuncionarioEntity>) {
    Object.assign(this, { ...partial });
  }
}
