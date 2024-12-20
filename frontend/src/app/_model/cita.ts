import { Cliente } from "./cliente";
import { DetalleCita } from "./detalleCita";
import { Solicitud } from "./solicitud";
import { Tecnico } from "./tecnico";


export class Cita{
    idCita: number;
    cliente: Cliente;
    tecnico: Tecnico;
    solicitud: Solicitud;
    fecha: string; //ISODate yyyy-mm-ddTHH:mm:ss
    numAl: string;
    detalleCita: DetalleCita[];
}