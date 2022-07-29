import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado, IEmpleado } from './admin-empleado';
import { EmpleadoService } from './admin-empleado.Service';

@Component({
  selector: 'app-admin-empleado',
  templateUrl: './admin-empleado.component.html',
  styleUrls: ['./admin-empleado.component.scss'],
})
export class AdminEmpleadoComponent implements OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  data: any;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerEmpleadoInit();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  obtenerEmpleadoInit() {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      //pagingType: "full_numbers",
      pageLength: 10,
    };
    this.empleadoService.getEmpleado().subscribe((result) => {
        this.data = result;
        this.dtTrigger.next(this.dtOptions);
    });
  }
  

  getEmpleados() {
    this.empleadoService.getEmpleado().subscribe((result) => {
    this.data = result;
    });
  }

  
/*Inicio Crear Empleado */
  create() {
    this.empleado.usuario = this.empleado.correo;
    this.empleado.contrasenia =
      this.empleado.nombres[0] + this.empleado.apellidos;
    this.empleado.tipouser = 'empleado';

    this.empleadoService.create(this.empleado).subscribe({
      next: this.createEmpleadoNext.bind(this),
      error: (err) => console.log('Error al crear empleado: ', err),
    });
  }

  protected createEmpleadoNext(empleado: IEmpleado) {
    console.log('Empleado creado: ', empleado);
    this.getEmpleados();
    this.limpiarModal();
  }
/*Fin Crear Empleado */

/*Inicio Eliminar Empleado */
  eliminarEmpleado(id: number) {
    console.log(typeof id);
    this.empleadoService.deleteEmpleado(id).subscribe(()=>{
      this.getEmpleados();
      
    }
      
    )
  }

  editarEmpleado(empleado:IEmpleado){
    console.log(empleado);
    this.empleado=empleado
    this.empleadoService.actualizarEmpleado(empleado).subscribe((result)=>{
      this.getEmpleados();
      this.limpiarModal();
      console.log(result);
    })
  }

  /*no tocar mrd:v */ 
  empleado: IEmpleado = this.templateEmpleado() 

  templateEmpleado() {
    return {
      nombres: '',
      apellidos: '',
      dni:'',
      telefono: '',
      correo: '',
      turno: '',
      fechaNacimiento: '',
      usuario: '',
      contrasenia: '',
      tipouser: '',
    };
  }

  limpiarModal() {
    console.log("Limpiando")
    this.empleado = this.templateEmpleado() 
  }
  
}
