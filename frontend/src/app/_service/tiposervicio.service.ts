import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { TipoServicio } from '../_model/tiposervicio';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService extends GenericService<TipoServicio> {

  private tiposervicioCambio = new Subject<TipoServicio[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/tiposervicios`);
  }

  //get Subjects
  getTipoServicioCambio() {
    return this.tiposervicioCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setTipoServicioCambio(tiposervicios: TipoServicio[]) {
    this.tiposervicioCambio.next(tiposervicios);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
