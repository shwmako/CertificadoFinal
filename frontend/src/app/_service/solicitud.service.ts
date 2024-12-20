import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Solicitud } from '../_model/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService extends GenericService<Solicitud>{

  private solicitudCambio = new Subject<Solicitud[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/solicitudes`);
  }

  //get Subjects
  getSolicitudCambio() {
    return this.solicitudCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setSolicitudCambio(solicitudes: Solicitud[]) {
    this.solicitudCambio.next(solicitudes);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

}