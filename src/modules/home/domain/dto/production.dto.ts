import { EStatusProduction } from "../enums/status-production.enum";

export interface ProductionDTO {
  id?: number;
  turno?: {
    id?: number;
  };
  forno?: {
    id?: number;
  };
  usuario: {
    id?: number;
  };
  loteFrita?: number;
  nroProducao?: number;
  lote?: number;
  temperatura?: number;
  oleo?: number;
  oxigenio?: number;
  horarioInicio?: string;
  horarioFim?: string;
  peso?: number;
  rpm?: number;
  tMovel?: number;
  status?: EStatusProduction;
}
