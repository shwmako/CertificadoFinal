import { Cita } from "../_model/cita";
import { TipoServicio } from "../_model/tiposervicio";

export class CitaListaTipoServicioDTO {
    cita: Cita;
    lstTipoServicio: TipoServicio[];
}