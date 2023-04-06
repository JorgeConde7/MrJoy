import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmpleado } from '../../../core/models/admin/admin-empleado';
import { EmpleadoService } from '../../../core/apis/admin/admin-empleado.Service';
import {
  alertConfirmation,
  alertNotification,
  alertPrompt,
} from 'src/app/util/notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as regex from 'src/app/util/regex.util';
import { getPayloadEmpleado } from 'src/app/util/token.util';
import {
  markFormGroupTouched,
  markFormGroupUnTouched,
} from 'src/app/util/utils.util';

@Component({
  selector: 'app-admin-empleado',
  templateUrl: './admin-empleado.component.html',
  styleUrls: ['./admin-empleado.component.scss'],
})
export class AdminEmpleadoComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  data: any;
  isInsert = true;
  formEmpleado: FormGroup;

  constructor(
    private empleadoService: EmpleadoService,
    private formBuilder: FormBuilder
  ) {
    this.formEmpleado = this.getEmpleadoFormBuilder();
  }

  ngOnInit(): void {
    this.obtenerEmpleadoInit();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getEmpleadoFormBuilder() {
    return this.formBuilder.group({
      id_empleados: [null],
      nombres: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.JUST_LETTERS_WITH_SPACES),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.JUST_LETTERS_WITH_SPACES),
        ],
      ],
      dni: ['', [Validators.required, Validators.pattern(regex.DNI)]],
      telefono: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      correo: ['', [Validators.required, Validators.email]],
      turno: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.JUST_LETTERS_WITH_SPACES),
        ],
      ],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    console.log({ touched: this.formEmpleado.touched });

    const isInvalidForm = this.formEmpleado.invalid;
    const isTouchedForm = this.formEmpleado.touched;

    if (isInvalidForm) {
      markFormGroupTouched(this.formEmpleado);
      return;
    }

    if (this.isInsert) {
      this.registrarEmpleado();
      alertNotification('', 'Empleado registrado!');
    } else if (isTouchedForm) {
      const result = await alertConfirmation('Confirmar cambios');

      if (!result.isConfirmed) return;

      this.empleadoService
        .actualizarEmpleado(this.formEmpleado.value)
        .subscribe((_) => {
          this.getEmpleados();
          alertNotification('', 'Empleado Actualizado!');
        });
    }
  }
  btnCancel() {
    // this.formEmpleado.controls['nombres'].markAsUntouched()
    markFormGroupUnTouched(this.formEmpleado);
    // this.formEmpleado.controls['nombres'].setErrors(null)
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
    const formEmpleado = this.formEmpleado.value;
    const password = `${formEmpleado.dni}${formEmpleado.apellidos[0]}`;

    const newEmpleado: IEmpleado = {
      apellidos: formEmpleado.apellidos,
      nombres: formEmpleado.nombres,
      fechaNacimiento: formEmpleado.fechaNacimiento,
      telefono: formEmpleado.telefono,
      dni: formEmpleado.dni,
      correo: formEmpleado.correo,
      turno: formEmpleado.turno,

      usuario: formEmpleado.correo,
      contrasenia: password,
      tipouser: 'empleado',
    };

    this.empleadoService.create(newEmpleado).subscribe(() => {
      this.getEmpleados();
    });
  }

  async eliminarEmpleado(empleado: IEmpleado) {
    const test = await alertPrompt('test')
    console.log({test});

    const result = await alertConfirmation(`Desea eliminar a ${empleado.nombres}?`);

    if (!result.isConfirmed) return;

    this.empleadoService
      .deleteEmpleado(Number(empleado.id_empleados))
      .subscribe(() => {
        this.getEmpleados();
      });
  }

  btnNuevoEmpleado() {
    this.limpiarModal();
    this.isInsert = true;
  }
  btnSetEmpleadoModal(empleado: IEmpleado) {
    this.formEmpleado.setValue({
      id_empleados: empleado.id_empleados,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      dni: empleado.dni,
      telefono: empleado.telefono,
      correo: empleado.correo,
      turno: empleado.turno,
      fechaNacimiento: empleado.fechaNacimiento,
    });

    this.isInsert = false;
  }

  limpiarModal() {
    this.formEmpleado.reset();
    this.formEmpleado.markAsUntouched(); // this.empleado = this.templateEmpleado();
  }
}
