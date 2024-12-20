import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialModule } from '../material/material.module';



import { LayoutComponent } from './layout/layout.component';
import { PagesRoutingModule } from './pages-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteEdicionComponent } from './cliente/cliente-edicion/cliente-edicion.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SolicitudEdicionComponent } from './solicitud/solicitud-edicion/solicitud-edicion.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { TecnicoDialogoComponent } from './tecnico/tecnico-dialogo/tecnico-dialogo.component';
import { TipoServicioComponent } from './tiposervicio/tiposervicio.component';
import { TipoServicioEdicionComponent } from './tiposervicio/tiposervicio-edicion/tiposervicio-edicion.component';
import { CitaComponent } from './cita/cita.component';
import { FiltroComponent } from './filtro/filtro.component';
import { FiltroDialogoComponent } from './filtro/filtro-dialogo/filtro-dialogo.component';
import { PaginawebComponent } from './paginaweb/paginaweb.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SolicitarComponent } from './solicitar/solicitar.component';
import { SolicitarEdicionComponent } from './solicitar/solicitar-edicion/solicitar-edicion.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';

//import { Not403Component } from './not403/not403.component';
//import { Not404Component } from './not404/not404.component';


@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        PdfViewerModule,
        PagesRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        // otros módulos
    OverlayModule,         // Agregar esto
    MatSelectModule,       // Asegúrate de que MatSelectModule esté importado
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,


    ],
    exports: [],
    declarations: [



        LayoutComponent,
        InicioComponent,
        Not403Component,
        Not404Component,
        RecuperarComponent,
        TokenComponent,

        //
        ClienteComponent,
        ClienteEdicionComponent,
        //
        SolicitudComponent,
        SolicitudEdicionComponent,

        //
        TecnicoComponent,
        TecnicoDialogoComponent,

        //
        TipoServicioComponent,
        TipoServicioEdicionComponent,

        // citas


        CitaComponent,

        //filtro
        FiltroComponent,
        FiltroDialogoComponent,

        //
        PaginawebComponent,
        //
        NosotrosComponent,
        ServiciosComponent,
        SolicitarComponent,
        SolicitarEdicionComponent,
    
        
    ],
    providers: [],
})
export class PagesModule { }
