import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';

import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {  FiltroDialogoComponent } from './filtro-dialogo/filtro-dialogo.component';
import { CitaService } from 'src/app/_service/cita.service';
import { FiltroCitaDTO } from 'src/app/_dto/filtroCitaDTO';
import { Cita } from 'src/app/_model/cita';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  form: FormGroup;
  displayedColumns = ['cliente', 'solicitud','tecnico', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Cita>;

  @ViewChild('tab') tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private citaService: CitaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta1': new FormControl(),
      'fechaConsulta2': new FormControl(),
    });
  }

  buscar() {
    if (this.tabGroup.selectedIndex == 0) {
      let dni = this.form.value['dni']; //this.form.get('dni').value;
      let nombreCompleto = this.form.value['nombreCompleto']; //this.form.get('nombreCompleto').value;

      let filtro = new FiltroCitaDTO(dni, nombreCompleto);

      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }   
      
      this.citaService.buscarOtros(filtro).subscribe(data => {
        this.crearTabla(data);
      });

    } else {
      let fecha1 = this.form.value['fechaConsulta1'];
      let fecha2 = this.form.value['fechaConsulta2'];

      fecha1 = moment(fecha1).format('YYYY-MM-DDTHH:mm:ss');
      fecha2 = moment(fecha2).format('YYYY-MM-DDTHH:mm:ss');

      this.citaService.buscarFecha(fecha1, fecha2).subscribe(data => {
        this.crearTabla(data);
      });
    }
  }

  crearTabla(data: Cita[]) {    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verDetalle(cita: Cita){
    this.dialog.open(FiltroDialogoComponent, {
      width: '750px',
      data: cita
    });
  }

}
