import { ETipoTurno } from "../enums/tipo-turno.enum";

export interface TurnoDTO {
    id?: number;
    nome?: string;
    tipo?: ETipoTurno;
    dtTurno?: string;
}