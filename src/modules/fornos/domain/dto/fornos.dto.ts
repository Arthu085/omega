import { EStatusForno } from '../enums/status-fornos.enum';

export interface FornosDto {
  id?: number;
  nro_forno?: number;
  name?: string;
  status?: EStatusForno;
  situacao?: string | null;
}
