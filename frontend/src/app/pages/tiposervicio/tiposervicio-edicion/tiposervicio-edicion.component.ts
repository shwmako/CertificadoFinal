import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { TipoServicio } from 'src/app/_model/tiposervicio';
import { TipoServicioService } from 'src/app/_service/tiposervicio.service';

@Component({
  selector: 'app-tiposervicio-edicion',
  templateUrl: './tiposervicio-edicion.component.html',
  styleUrls: ['./tiposervicio-edicion.component.css']
})
export class TipoServicioEdicionComponent implements OnInit {

  id: number;
  tiposervicio: TipoServicio;
  form: FormGroup;
  edicion: boolean = false;


  constructor(
    private tiposervicioService: TipoServicioService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    this.tiposervicio = new TipoServicio();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombreTipoServicio': new FormControl(''),
      'descripcionTipoServicio': new FormControl(''),
    });


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.tiposervicioService.listarPorId(this.id).subscribe(data => {
        let id = data.idTipoServicio;
        let nombreTipoServicio = data.nombreTipoServicio;
        let descripcionTipoServicio = data.descripcionTipoServicio

        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombreTipoServicio': new FormControl(nombreTipoServicio),
          'descripcionTipoServicio': new FormControl(descripcionTipoServicio)
        });
      });
    }
  }

  operar() {
    this.tiposervicio.idTipoServicio = this.form.value['id'];
    this.tiposervicio.nombreTipoServicio = this.form.value['nombreTipoServicio'];
    this.tiposervicio.descripcionTipoServicio = this.form.value['descripcionTipoServicio'];

    if (this.tiposervicio != null && this.tiposervicio.idTipoServicio > 0) {
      //BUENA PRACTICA
      this.tiposervicioService.modificar(this.tiposervicio).pipe(switchMap(() => {
        return this.tiposervicioService.listar();
      })).subscribe(data => {
        this.tiposervicioService.setTipoServicioCambio(data);
        this.tiposervicioService.setMensajeCambio("Se modifico");
      });
    } else {
      //PRACTICA COMUN
      this.tiposervicioService.registrar(this.tiposervicio).subscribe(data => {
        this.tiposervicioService.listar().subscribe(especialidad => {
          this.tiposervicioService.setTipoServicioCambio(especialidad);
          this.tiposervicioService.setMensajeCambio("Se registro");
        });
      });
    }

    this.router.navigate(['/pages/tiposervicio']);
  }

}
