import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';
import { Tecnico } from '../_model/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService extends GenericService<Tecnico>{

  private tecnicoCambio: Subject<Tecnico[]> = new Subject<Tecnico[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/tecnicos`);
  }

   //////get & set ////
   getTecnicoCambio(){
    return this.tecnicoCambio.asObservable();
  }

  setTecnicoCambio(tecnicos: Tecnico[]){
    this.tecnicoCambio.next(tecnicos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}
