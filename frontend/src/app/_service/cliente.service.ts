import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Cliente } from '../_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{

  //private url: string = `${environment.HOST}/pacientes`;
  private clienteCambio = new Subject<Cliente[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/clientes`);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

 

  // get set 
  getClienteCambio() {
    return this.clienteCambio.asObservable();
  }

  setClienteCambio(clientes: Cliente[]) {
    this.clienteCambio.next(clientes);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
  

}
