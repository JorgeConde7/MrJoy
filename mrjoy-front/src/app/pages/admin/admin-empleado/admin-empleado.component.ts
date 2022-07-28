import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';

import { Subject } from 'rxjs';
import { GetDataService } from 'src/app/core/apis/get-data.service';
import { CharacterResponse } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';
import { Empleado, IEmpleado } from './admin-empleado';
import { EmpleadoService } from './admin-empleado.Service';

@Component({
  selector: 'app-admin-empleado',
  templateUrl: './admin-empleado.component.html',
  styleUrls: ['./admin-empleado.component.scss']
})
export class AdminEmpleadoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any



  constructor(private empleadoService: EmpleadoService, private router: Router) { }

  obtenerEmpleado(){
    this.empleadoService.getEmpleado()
    .subscribe(result => {
      console.log(result);
      this.data = result;
      this.dtTrigger.next(this.dtOptions)
    })
  }
  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10


    };
    this.obtenerEmpleado()
  
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()

  }
  empleado: IEmpleado =
    {
      nombres: "",
      apellidos: "",
      telefono: "",
      correo: "",
      turno: "",
      fechaNacimiento: "",
      login: {
        usuario: "",
        contrasenia: "",
        tipouser: ""
      },
    }


  create() {
    this.empleado.login.usuario = this.empleado.correo;
    this.empleado.login.contrasenia = this.empleado.nombres[0] + this.empleado.apellidos;
    this.empleado.login.tipouser = "empleado"
    window.location.href="admin/empleados"
    this.empleadoService.create(this.empleado).subscribe({
      next: (empleado) => this.createEmpleadoNext.bind(empleado),
      error: (err) => console.log("Error al crear empleado: ", err)
    })
  }

  protected createEmpleadoNext(empleado: IEmpleado) {
    console.log("Empleado creado: ", empleado);
  }
}
