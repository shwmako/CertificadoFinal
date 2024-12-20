import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CitaListaTipoServicioDTO } from '../_dto/citaListaTipoServicioDTO';

import { Cita } from '../_model/cita';
import { FiltroCitaDTO } from '../_dto/filtroCitaDTO';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private url: string = `${environment.HOST}/citas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(citaDTO: CitaListaTipoServicioDTO) {
    return this.http.post(this.url, citaDTO);
  }

  buscarFecha(fecha1: string, fecha2: string) {
    return this.http.get<Cita[]>(`${this.url}/buscar?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroCita: FiltroCitaDTO) {
    return this.http.post<Cita[]>(`${this.url}/buscar/otros`, filtroCita);
  }

  listarExamenPorConsulta(idCita: number) {
    return this.http.get<CitaListaTipoServicioDTO[]>(`${environment.HOST}/citatiposervicios/${idCita}`);
  }




}
