import { EStatusForno } from '../enums/status-fornos.enum';

export class FurnaceEntity {
  id: number = 0;
  nome: string = '';
  nroForno: number = 0;
  situacao?: string | null = null;
  status: EStatusForno = EStatusForno.ATIVO;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<FurnaceEntity>) {
    Object.assign(this, { ...partial });
  }
}
