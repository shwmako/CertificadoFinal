import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Tecnico } from 'src/app/_model/tecnico';
import { TecnicoService } from 'src/app/_service/tecnico.service';

@Component({
  selector: 'app-tecnico-dialogo',
  templateUrl: './tecnico-dialogo.component.html',
  styleUrls: ['./tecnico-dialogo.component.css']
})
export class TecnicoDialogoComponent implements OnInit {

  tecnico: Tecnico;

  constructor(
    private dialogRef: MatDialogRef<TecnicoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Tecnico,
    private tecnicoService: TecnicoService
  ) { }

  ngOnInit(): void {
    this.tecnico = { ...this.data };
    /*this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    this.medico.fotoUrl = this.data.fotoUrl;*/
  }

  operar() {
    if (this.tecnico != null && this.tecnico.idTecnico > 0) {
      //MODIFICAR
      this.tecnicoService.modificar(this.tecnico).pipe(switchMap( ()=> {
        return this.tecnicoService.listar();
      }))
      .subscribe(data => {
        this.tecnicoService.setTecnicoCambio(data);
        this.tecnicoService.setMensajeCambio('SE MODIFICO');
      });
    }else{
      //REGISTRAR
      this.tecnicoService.registrar(this.tecnico).pipe(switchMap( ()=> {
        return this.tecnicoService.listar();
      }))      
      .subscribe(data => {
        this.tecnicoService.setTecnicoCambio(data);
        this.tecnicoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
