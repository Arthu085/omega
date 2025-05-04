import { EStatusProduction } from "../enums/status-production.enum";

export interface ProductionDTO {
  id?: number;
  forno?: {
    id?: number;
  };
  loteFrita?: number;
  nroProducao?: number;
  lote?: number;
  temperatura?: number;
  oleo?: number;
  oxigenio?: number;
  peso?: number;
  rpm?: number;
  tMovel?: number;
  status?: EStatusProduction;
}
