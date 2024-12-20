import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/solicitud';
import { SolicitudService } from 'src/app/_service/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  displayedColumns = ['idSolicitud', 'nombreSolicitud', 'apellidoSolicitud','correoSolicitud','telefonoSolicitud','tipoServicioSolicitud','descripcionSolicitud','estadoSolicitud','acciones'];
  dataSource: MatTableDataSource<Solicitud>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private solicitudService: SolicitudService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.solicitudService.getSolicitudCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.solicitudService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.solicitudService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(solicitud: Solicitud) {
    this.solicitudService.eliminar(solicitud.idSolicitud).pipe(switchMap(() => {
      return this.solicitudService.listar();
    })).subscribe(data => {
      this.solicitudService.setSolicitudCambio(data);
      this.solicitudService.setMensajeCambio('Se eliminó');
    });
  }

  verificarHijos(){
    return this.route.children.length !== 0
  }
}
