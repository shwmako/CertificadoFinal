import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Not404Component } from './pages/not404/not404.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { PaginawebComponent } from './pages/paginaweb/paginaweb.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { splitAtColon } from '@angular/compiler/src/util';
import { SolicitarComponent } from './pages/solicitar/solicitar.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { SolicitarEdicionComponent } from './pages/solicitar/solicitar-edicion/solicitar-edicion.component';

const routes: Routes = [
  { path: '', redirectTo: 'paginaweb', pathMatch: 'full' },


  { path: 'paginaweb', component: PaginawebComponent },

  { path: 'nosotros', component: NosotrosComponent },
  { path: 'solicitar', component:SolicitarComponent },
  { path: 'servicios', component: ServiciosComponent },

  { path: 'solicitarform', component: SolicitarEdicionComponent },


  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent , children: [
    { path : ':token' , component: TokenComponent}
  ]  },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  {path: 'not-404',component: Not404Component},
  {path: '**',redirectTo: 'not-404'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
