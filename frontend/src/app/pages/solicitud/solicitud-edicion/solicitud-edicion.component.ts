import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Solicitud } from 'src/app/_model/solicitud';
import { SolicitudService } from 'src/app/_service/solicitud.service';

@Component({
  selector: 'app-solicitud-edicion',
  templateUrl: './solicitud-edicion.component.html',
  styleUrls: ['./solicitud-edicion.component.css']
})
export class SolicitudEdicionComponent implements OnInit {

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
      'estadoSolicitud': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.solicitudService.listarPorId(this.id).subscribe(data => {
        
        this.form = new FormGroup({
          'id': new FormControl(data.idSolicitud),
          'nombreSolicitud': new FormControl(data.nombreSolicitud),
          'apellidoSolicitud': new FormControl(data.apellidoSolicitud),
          'correoSolicitud': new FormControl(data.correoSolicitud),
          'telefonoSolicitud': new FormControl(data.telefonoSolicitud),
          'tipoServicioSolicitud': new FormControl(data.tipoServicioSolicitud),
          'descripcionSolicitud': new FormControl(data.descripcionSolicitud),
          'estadoSolicitud': new FormControl(data.estadoSolicitud),

        });
      });
    }
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

    this.router.navigate(['/pages/solicitud']);
  }

}
