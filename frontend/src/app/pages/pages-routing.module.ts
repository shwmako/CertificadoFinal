import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { GuardService } from '../_service/guard.service';

import { InicioComponent } from './inicio/inicio.component';
//import { Not403Component } from './not403/not403.component';

import { GuardService } from '../_service/guard.service';
import { Not403Component } from './not403/not403.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteEdicionComponent } from './cliente/cliente-edicion/cliente-edicion.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SolicitudEdicionComponent } from './solicitud/solicitud-edicion/solicitud-edicion.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { TipoServicioComponent } from './tiposervicio/tiposervicio.component';
import { TipoServicioEdicionComponent } from './tiposervicio/tiposervicio-edicion/tiposervicio-edicion.component';
import { CitaComponent } from './cita/cita.component';
import { FiltroComponent } from './filtro/filtro.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent , canActivate: [GuardService]},
  {
    path: 'cliente', component: ClienteComponent, children: [
      { path: 'nuevo', component: ClienteEdicionComponent },
      { path: 'edicion/:id', component: ClienteEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'tiposervicio', component: TipoServicioComponent, children: [
      { path: 'nuevo', component: TipoServicioEdicionComponent },
      { path: 'edicion/:id', component: TipoServicioEdicionComponent },
    ], canActivate: [GuardService]
  },
  {
    path: 'solicitud', component: SolicitudComponent, children: [
      { path: 'nuevo', component: SolicitudEdicionComponent },
      { path: 'edicion/:id', component: SolicitudEdicionComponent },
    ], canActivate: [GuardService]
  },
  { path: 'tecnico', component: TecnicoComponent, canActivate: [GuardService]},
  { path: 'cita', component: CitaComponent , canActivate: [GuardService]},

  { path: 'buscar', component: FiltroComponent , canActivate: [GuardService]},


  //else else else
  { path: 'not-403', component: Not403Component}
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }