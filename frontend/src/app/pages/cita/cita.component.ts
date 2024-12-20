import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/_model/cliente';
import { Tecnico } from 'src/app/_model/tecnico';
import { TipoServicio } from 'src/app/_model/tiposervicio';
import { Solicitud } from 'src/app/_model/solicitud';
import { DetalleCita } from 'src/app/_model/detalleCita';
import { ClienteService } from 'src/app/_service/cliente.service';
import { TecnicoService } from 'src/app/_service/tecnico.service';
import { TipoServicioService } from 'src/app/_service/tiposervicio.service';
import { SolicitudService } from 'src/app/_service/solicitud.service';
import { CitaService } from 'src/app/_service/cita.service';
import { Cita } from 'src/app/_model/cita';
import { CitaListaTipoServicioDTO } from 'src/app/_dto/citaListaTipoServicioDTO';

/*interface consultaListaExamenDTO{
  consulta: Consulta;
  lstExamen: Examen[];
}*/


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  clientes$: Observable<Cliente[]>;
  tecnicos$: Observable<Tecnico[]>;
  tiposervicios$: Observable<TipoServicio[]>;
  solcitudes$: Observable<Solicitud[]>;

  maxFecha: Date = new Date();
  analisis: string;
  solucion: string;

  detalleCita: DetalleCita[] = [];
  tiposerviciosSeleccionados: TipoServicio[] = [];

  idClienteSeleccionado: number;
  idTecnicoSeleccionado: number;
  idSolicitudSeleccionado: number;
  idTipoServicioSeleccionado: number;
  fechaSeleccionada: Date = new Date();

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private tiposervicioService: TipoServicioService,
    private solicitudService: SolicitudService,
    private citaService: CitaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
    this.listarTipoServicios();
    this.listarSolicitudes();
  }

  agregar() {
    let det = new DetalleCita();
    det.analisis = this.analisis;
    det.solucion = this.solucion;

    this.detalleCita.push(det);
  }

  agregarTipoServicio() {
    if (this.idTipoServicioSeleccionado > 0) {

      this.tiposervicioService.listarPorId(this.idTipoServicioSeleccionado).subscribe(data => {
        this.tiposerviciosSeleccionados.push(data);
      });

    }
  }

  aceptar() {
    let tecnico = new Tecnico();
    tecnico.idTecnico = this.idTecnicoSeleccionado;

    let cliente = new Cliente();
    cliente.idCliente = this.idClienteSeleccionado;

    console.log(this.idClienteSeleccionado);
    console.log(cliente.idCliente);

    let solicitud = new Solicitud();
    solicitud.idSolicitud = this.idSolicitudSeleccionado;

    let cita = new Cita();
    cita.tecnico = tecnico;
    cita.cliente = cliente;
    cita.solicitud = solicitud;
    cita.numAl = "C1";
    cita.detalleCita = this.detalleCita;

    /*let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(this.fechaSeleccionada.getTime() - tzoffset)).toISOString();*/

    cita.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

    let dto = new CitaListaTipoServicioDTO();
    dto.cita = cita;
    dto.lstTipoServicio = this.tiposerviciosSeleccionados;

    this.citaService.registrarTransaccion(dto).subscribe(data => {
      this.snackBar.open("SE REGISTRO", 'AVISO', { duration: 2000 });

      setTimeout(() => {
        this.limpiarControles();
      }, 2000)
    });
  }

  limpiarControles(){
    this.idClienteSeleccionado = 0;
    this.idTecnicoSeleccionado = 0;
    this.idSolicitudSeleccionado = 0;
    this.idTipoServicioSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.analisis = null;
    this.solucion = null;
    this.detalleCita = [];
    this.tiposerviciosSeleccionados = [];
  }

  removerDiagnostico(index: number) {
    this.detalleCita.splice(index, 1);
  }

  removerExamen(index: number) {
    this.tiposerviciosSeleccionados.splice(index, 1);
  }

  //metodos

  listarClientes() {
    this.clientes$ = this.clienteService.listar();
  }

  listarTecnicos() {
    this.tecnicos$ = this.tecnicoService.listar();
  }

  listarTipoServicios() {
    this.tiposervicios$ = this.tiposervicioService.listar();
  }

  listarSolicitudes() {
    this.solcitudes$ = this.solicitudService.listar();
  }


}
