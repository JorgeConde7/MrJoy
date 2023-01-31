import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado, IEmpleado } from '../../../core/models/admin/admin-empleado';
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
  isInsert=true;



  constructor(private empleadoService: EmpleadoService, private router: Router) {
  }
  ngOnInit(): void {
    this.obtenerEmpleadoInit();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  formularioEmpleado(){
    if(!this.empleado.id_empleados){
      this.registrarEmpleado();
      console.log("Empleado guardado");
    }
    else{
      this.empleadoService.actualizarEmpleado(this.empleado).subscribe((result)=>{
          this.getEmpleados();
        })
      console.log("Empleado Actualizar");
    }
  }

  obtenerEmpleadoInit() {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
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

  registrarEmpleado() {
    this.empleado.usuario = this.empleado.correo;
    this.empleado.contrasenia =
    this.empleado.nombres[0] + this.empleado.apellidos;
    this.empleado.tipouser = 'empleado';

    this.empleadoService.create(this.empleado).subscribe(()=>{
      this.getEmpleados();
    });
  }

  eliminarEmpleado(id: number) {
    console.log(typeof id);
    this.empleadoService.deleteEmpleado(id).subscribe(()=>{
      this.getEmpleados();
    })
  }

  btnNuevoEmpleado(){
    this.limpiarModal();
    this.isInsert=true
  }
  btnSetEmpleadoModal(empleado:IEmpleado){
    this.empleado=empleado
    this.isInsert=false;
  }
  btnCancelarModal(){
    this.getEmpleados()
    console.log("cancelar ModalEmpleado")
  }

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
