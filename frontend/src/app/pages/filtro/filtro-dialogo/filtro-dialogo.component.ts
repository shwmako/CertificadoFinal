import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Cita } from 'src/app/_model/cita';
import { CitaService } from 'src/app/_service/cita.service';


@Component({
  selector: 'app-filtro-dialogo',
  templateUrl: './filtro-dialogo.component.html',
  styleUrls: ['./filtro-dialogo.component.css']
})
export class FiltroDialogoComponent implements OnInit {

  cita: Cita;
  tipoServicio: any[];

  constructor(
    private dialogRef: MatDialogRef<FiltroDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Cita,
    private citaService: CitaService
  ) { }

  ngOnInit(): void {
    this.cita = { ...this.data };
    this.citaService.listarExamenPorConsulta(this.cita.idCita).subscribe(data => {
      //[
      //{consulta, examen},
      //{consulta, examen},
      //{consulta, examen}
      // ]

      //[
      // {consulta, examen[]}
      //]
      this.tipoServicio = data;
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
