import { EStatusForno } from '../enums/status-fornos.enum';

export interface FornosDto {
  id?: number;
  nroForno?: number;
  nome?: string;
  status?: EStatusForno;
  situacao?: string | null;
}
