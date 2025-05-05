import { EStatusProduction } from '../enums/status-production.enum';
import { ProductionDTO } from './production.dto';

export interface ProductionUpdateDto extends Partial<ProductionDTO> {
  status?: EStatusProduction;
  forno?: {
    id?: number;
  }
}
