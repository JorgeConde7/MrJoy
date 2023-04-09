import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { PaquetesService } from '../../../core/apis/admin/paquetes.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { getPayload, getPayloadEmpleado } from 'src/app/util/token.util';
import { LoginResponse } from 'src/app/core/models/response/login.response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  alertConfirmation,
  alertNotification,
} from 'src/app/util/notifications';
@Component({
  selector: 'app-admin-paquetes',
  templateUrl: './admin-paquetes.component.html',
  styleUrls: ['./admin-paquetes.component.scss'],
})
export class AdminPaquetesComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  paquetes: Paquete[] = [];
  sesionData = { isAdmin: false };
  isInsert = true;
  formPaquete: FormGroup;

  constructor(
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder
  ) {
    this.setSesionData();
    this.formPaquete = this.getFormPaqueteBuilder();
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10,
      lengthMenu: [10, 10, 25],
      processing: true,
    };

    this.setDefaultPaquetes();
  }

  btnNuevo() {
    this.formPaquete.reset();
    this.formPaquete.markAsUntouched();
    this.isInsert = true;
  }

  btnEditar(paquete: Paquete) {
    this.isInsert = false;
    console.log({ paquete });

    this.formPaquete.setValue({
      idPaquete: paquete.idPaquete,
      precio: paquete.precio,
      descripcion: paquete.descripcion,
    });
  }

  async btnDelete(paquete: Paquete) {
    console.log({paquete});

    const result = await alertConfirmation(
      `Se va a eliminar '${paquete.descripcion}'`
    );

    if (!result.isConfirmed) return;

    this.paqueteService.deletePaquete(paquete.idPaquete!).subscribe({
      next: (paqueteResult) => {
        this.getPaquetes();
        if (paqueteResult) {
          alertNotification('', `Se eliminó '${paquete.idPaquete}'!`);
        } else {
          alertNotification(
            '',
            `Error al eliminar '${paquete.idPaquete}' intentelo denuevo`
          );
        }
      },
    });
  }

  getFormPaqueteBuilder() {
    return this.formBuilder.group({
      idPaquete: [null],
      precio: [0.0, Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  async onSubmit() {
    if (this.formPaquete.invalid) {
      alertNotification('', 'Todos los campos son requeridos', 'info');
      return;
    }

    const formPaquete = this.formPaquete.value as Paquete;

    if (this.isInsert) {
      const result = await alertConfirmation(
        `Agregar nuevo paquete '${formPaquete.descripcion}'`
      );

      if (!result.isConfirmed) return;
      this.paqueteService
        .savePaquete(formPaquete)
        .subscribe((paqueteResponse) => {
          this.getPaquetes();
          alertNotification(
            '',
            `Se agregó paquete '${paqueteResponse.descripcion}'`
          );
        });
    } else {
      const result = await alertConfirmation(
        `Actualizar paquete '${formPaquete.descripcion}'`
      );
      if (!result.isConfirmed) return;

      this.paqueteService
        .updatePaquete(formPaquete)
        .subscribe((paqueteResponse) => {
          this.getPaquetes();
          alertNotification(
            '',
            `Se actualizó el paquete '${paqueteResponse.descripcion}'`
          );
        });
    }
  }
  setSesionData() {
    const sesionData = getPayloadEmpleado()!;
    this.sesionData.isAdmin = sesionData.profile === 'admin';
  }

  setDefaultPaquetes() {
    this.paqueteService.getPaquetes().subscribe((paqueteResponse) => {
      this.paquetes = paqueteResponse;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  getPaquetes() {
    this.paqueteService.getPaquetes().subscribe((paquetesResponse) => {
      this.paquetes = paquetesResponse;
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
