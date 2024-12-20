import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoServicio } from 'src/app/_model/tiposervicio';
import { TipoServicioService } from 'src/app/_service/tiposervicio.service';

@Component({
  selector: 'app-tiposervicio',
  templateUrl: './tiposervicio.component.html',
  styleUrls: ['./tiposervicio.component.css']
})
export class TipoServicioComponent implements OnInit {

  displayedColumns = ['idTipoServicio', 'nombreTipoServicio', 'descripcionTipoServicio', 'acciones'];
  dataSource: MatTableDataSource<TipoServicio>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tiposervicioService: TipoServicioService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tiposervicioService.getTipoServicioCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.tiposervicioService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.tiposervicioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(tiposervicio: TipoServicio) {
    this.tiposervicioService.eliminar(tiposervicio.idTipoServicio).pipe(switchMap(() => {
      return this.tiposervicioService.listar();
    })).subscribe(data => {
      this.tiposervicioService.setTipoServicioCambio(data);
      this.tiposervicioService.setMensajeCambio('Se eliminó');
    });

  }

}
