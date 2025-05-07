import { EStatusProduction } from "../enums/status-production.enum";
import { TurnoDTO } from "../dto/turno.dto";
import { FornosDto } from "@/modules/fornos/domain/dto/fornos.dto";
import { UsuarioDTO } from "@/modules/usuarios/domain/dto/usuario.dto";

export class ProductionEntity {
  id: number = 0;
  turno: TurnoDTO = { id: 0};
  forno: FornosDto = { id: 0};
  usuario: UsuarioDTO = { id: 0, nome: "", sobrenome: "", email: "" };
  loteFrita: number = 0;
  nroProducao: number = 0;
  lote: number = 0;
  temperatura: number = 0;
  oleo: number = 0;
  oxigenio: number = 0;
  horarioInicio: string = "";
  horarioFim: string = "";
  peso: number = 0;
  rpm: number = 0;
  tMovel: number = 0;
  status: EStatusProduction = EStatusProduction.PARADO;

  constructor(partial: Partial<ProductionEntity>) {
    Object.assign(this, { ...partial });
  }
}
