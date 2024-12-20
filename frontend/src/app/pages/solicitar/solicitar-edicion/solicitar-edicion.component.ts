import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Solicitud } from 'src/app/_model/solicitud';
import { SolicitudService } from 'src/app/_service/solicitud.service';

@Component({
  selector: 'app-solicitar-edicion',
  templateUrl: './solicitar-edicion.component.html',
  styleUrls: ['./solicitar-edicion.component.css']
})


export class SolicitarEdicionComponent implements OnInit {

  id: number;
  solicitud: Solicitud;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.solicitud = new Solicitud();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombreSolicitud': new FormControl(''),
      'apellidoSolicitud': new FormControl(''),
      'correoSolicitud': new FormControl(''),
      'telefonoSolicitud': new FormControl(''),
      'tipoServicioSolicitud': new FormControl(''),
      'descripcionSolicitud': new FormControl(''),
      'estadoSolicitud': new FormControl('Pendiente'),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      
    });
  }

  

  operar() {
    this.solicitud.idSolicitud = this.form.value['id'];
    this.solicitud.nombreSolicitud = this.form.value['nombreSolicitud'];
    this.solicitud.apellidoSolicitud = this.form.value['apellidoSolicitud'];
    this.solicitud.correoSolicitud = this.form.value['correoSolicitud'];
    this.solicitud.telefonoSolicitud = this.form.value['telefonoSolicitud'];
    this.solicitud.tipoServicioSolicitud = this.form.value['tipoServicioSolicitud'];
    this.solicitud.descripcionSolicitud = this.form.value['descripcionSolicitud'];
    this.solicitud.estadoSolicitud = this.form.value['estadoSolicitud'];

    if (this.solicitud != null && this.solicitud.idSolicitud > 0) {
      //BUENA PRACTICA
      this.solicitudService.modificar(this.solicitud).pipe(switchMap(() => {
        return this.solicitudService.listar();
      })).subscribe(data => {
        this.solicitudService.setSolicitudCambio(data);
        this.solicitudService.setMensajeCambio("Se modificó");
      });

    } else {
      //PRACTICA COMUN
      this.solicitudService.registrar(this.solicitud).subscribe(data => {
        this.solicitudService.listar().subscribe(especialidad => {
          this.solicitudService.setSolicitudCambio(especialidad);
          this.solicitudService.setMensajeCambio("Se registró");
        });
      });
    }

    this.router.navigate(['/paginaweb']);
  }

}
