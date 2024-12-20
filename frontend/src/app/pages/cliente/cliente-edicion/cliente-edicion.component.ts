import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';


@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombreCliente': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellidoCliente': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'correoCliente': new FormControl(''),
      'direccionCliente': new FormControl(''),
      'dniCliente': new FormControl(''),
      'telefonoCliente': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }  

  get f() { return this.form.controls; }

  initForm(){
    if(this.edicion){
      //MODIFICAR
      this.clienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idCliente),
          'nombreCliente': new FormControl(data.nombreCliente, Validators.required),
          'apellidoCliente': new FormControl(data.apellidoCliente, [Validators.required, Validators.minLength(3)]),
          'correoCliente': new FormControl(data.correoCliente),
          'direccionCliente': new FormControl(data.direccionCliente),
          'dniCliente': new FormControl(data.dniCliente),
          'telefonoCliente': new FormControl(data.telefonoCliente)
        });
      });     
    }
  }

  operar(){
    if(this.form.invalid){ return; }

    let cliente = new Cliente();
    cliente.idCliente = this.form.value['id'];
    cliente.nombreCliente = this.form.value['nombreCliente'];
    cliente.apellidoCliente = this.form.value['apellidoCliente'];
    cliente.correoCliente = this.form.value['correoCliente'];
    cliente.direccionCliente = this.form.value['direccionCliente'];
    cliente.dniCliente = this.form.value['dniCliente'];
    cliente.telefonoCliente = this.form.value['telefonoCliente'];

    if(this.edicion){
      //PRACTICA COMUN
      this.clienteService.modificar(cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.setClienteCambio(data);
          this.clienteService.setMensajeCambio('Se modificó');
        });
      });
    }else{
      //PRACTICA IDEAL
      this.clienteService.registrar(cliente).pipe(switchMap( () => {
        return this.clienteService.listar();        
      }))      
      .subscribe(data => {
        this.clienteService.setClienteCambio(data);
        this.clienteService.setMensajeCambio('Se registró');
      });
    }

    this.router.navigate(['/pages/cliente']);
  }

}
