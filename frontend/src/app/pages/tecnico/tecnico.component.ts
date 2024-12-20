import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { TecnicoDialogoComponent } from './tecnico-dialogo/tecnico-dialogo.component';
import { Tecnico } from 'src/app/_model/tecnico';
import { TecnicoService } from 'src/app/_service/tecnico.service';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  displayedColumns = ['idTecnico', 'nombreTecnico', 'apellidoTecnico', 'correoTecnico', 'dniTecnico', 'direccionTecnico', 'acciones'];
  dataSource: MatTableDataSource<Tecnico>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tecnicoService: TecnicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tecnicoService.listar().subscribe(data => {
      this.crearTabla(data);
    });

    this.tecnicoService.getTecnicoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.tecnicoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'INFO', { duration: 2000 });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  abrirDialogo(tecnico?: Tecnico) {
    this.dialog.open(TecnicoDialogoComponent, {
      width: '250px',
      data: tecnico
    });
  }


  eliminar(tecnico: Tecnico) {
    this.tecnicoService.eliminar(tecnico.idTecnico).pipe(switchMap(() => {
      return this.tecnicoService.listar();
    }))
      .subscribe(data => {
        this.tecnicoService.setTecnicoCambio(data);
        this.tecnicoService.setMensajeCambio('SE ELIMINO');
      });
  }

  crearTabla(data: Tecnico[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
