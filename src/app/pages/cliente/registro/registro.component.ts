import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IRegistro } from '../../../core/models/client/registro';
import { RegistroService } from '../../../core/apis/client/registro.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(
    private registroService: RegistroService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registroUsuario() {
    this.registro.tipouser = 'cliente';
    this.registroService.registroUsuario(this.registro).subscribe({
      next: this.createEmpleadoNext.bind(this),
      error: (err) => console.log('Error al crear registro: ', err),

    });
  }

  protected createEmpleadoNext(registro: IRegistro) {
    console.log('Empleado creado: ', registro);
    window.location.href="cliente/index"
  }
  registro: IRegistro =
  {
      nombres: '',
      apePaterno: '',
      apeMaterno: '',
      dni: '',
      telefono: '',
      direccion:'',
      genero:'',
      correo: '',
      fechaNacimiento: '',
      usuario: '',
      contrasenia: '',
      tipouser: '',
  }
 redireccionar(){
  console.log('pipipipippi si llamo')
  window.location.href="cliente/terminos"
 }

}
