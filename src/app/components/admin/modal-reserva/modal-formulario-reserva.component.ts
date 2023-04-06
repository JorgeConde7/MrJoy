import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';

// RESERVA
import { ReservaServiceService } from '../../../core/apis/client/reserva-service.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as regex from 'src/app/util/regex.util';
import * as moment from 'moment';
import { getCurrentDate } from 'src/app/util/utils.util';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';

import { IReserva } from '../../cliente/calendario-reserva/reserva';
import { ModaReservaEventService } from 'src/app/core/events/moda-reserva-event.service';
import { alertConfirmation, alertNotification } from 'src/app/util/notifications';

@Component({
  selector: 'app-modal-formulario-reserva',
  templateUrl: './modal-formulario-reserva.component.html',
  styleUrls: ['./modal-formulario-reserva.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalFormularioReservaComponent implements OnInit {
  horaCadena: string[] = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ];

  horaOcupada: string[] = [];

  @Input() reserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: 'inicio',
    cantPersonas: 0,
    correo: '',
    idLogin: 1,
    nombres: '',
    apellido: '',
    email: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 0,
    totalPago: 0,
    idReserva: 0,
  };

  total: number = 0;

  paquetes: Paquete[] = [];
  formReserva: FormGroup;

  constructor(
    private paqueteService: PaquetesService,
    private reservaService: ReservaServiceService,
    private formBuilder: FormBuilder,
    private modaReservaEventService: ModaReservaEventService
  ) {
    this.formReserva = this.getReservaFormBuilder();
  }

  ngOnInit(): void {
    this.setCheckBoxPaquetes();
    this.onSetDataReservaToModal$();
  }

  get cantidadPersonas() {
    return this.formReserva.controls['cantPersonas'].value;
  }

  get cantidadAcompaniantes() {
    return this.formReserva.controls['acompaniante'].value;
  }

  setCheckBoxPaquetes() {
    this.paqueteService
      .getPaquetes()
      .subscribe((paquetes) => (this.paquetes = paquetes));
  }

  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isBefore(today)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  onSetDataReservaToModal$() {
    this.modaReservaEventService.reserva$.subscribe((reserva) => {
      console.log('SE HA ESCUCHADO');
      this.reserva = reserva;
      const paquetePrice = this.paquetes.find(
        (paquete) => paquete.idPaquete === reserva.idPaquete
      )!.precio;
      this.formReserva.setValue({
        fechaReserva: reserva.fechaReserva,
        hora: reserva.hora,
        nombres: reserva.nombres,
        apellido: reserva.apellido,
        dni: reserva.dni,
        email: reserva.email,
        telefono: reserva.telefono,
        idPaquete: `${reserva.idPaquete} ${paquetePrice}`,
        cantPersonas: reserva.cantPersonas,
        acompaniante: reserva.acompaniante,
      });
      this.total = reserva.totalPago;
    });
  }

  getReservaFormBuilder() {
    const [date, month, year, _] = getCurrentDate();
    const tomorrow = `${year}-${month}-0${Number(date) + 1}`;

    return this.formBuilder.group({
      fechaReserva: [tomorrow, [Validators.required, this.dateValidator]],
      hora: [
        'inicio',
        [Validators.required, Validators.pattern(regex.NOT_INICIO)],
      ],
      nombres: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.JUST_LETTERS_WITH_SPACES),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.JUST_LETTERS_WITH_SPACES),
        ],
      ],
      dni: [
        '',
        [Validators.required, Validators.pattern(regex.DOCUMENTO_IDENTIDAD)],
      ],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(regex.PHONE)]],
      idPaquete: [
        '0',
        [Validators.required, Validators.pattern(regex.PAQUETE)],
      ],
      cantPersonas: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.INTEGER),
          Validators.min(15),
          Validators.max(30),
        ],
      ],
      acompaniante: [
        '',
        [
          Validators.required,
          Validators.pattern(regex.INTEGER),
          Validators.min(0),
          Validators.max(15),
        ],
      ],
    });
  }

  async onSubmit() {
    const formReserva = this.formReserva.value;
    const isInvalidFormReserva = this.formReserva.invalid;
    if (isInvalidFormReserva) return;
    const idPaqueteToFormat: string = formReserva.idPaquete;
    const idPaquete = Number(idPaqueteToFormat.split(' ')[0]);

    const reservaUpdated = { ...this.reserva, ...formReserva, idPaquete };
    console.log({ newReser4va: reservaUpdated });

    const result = await alertConfirmation('Confirmar actualizacion de reserva')

    if(!result.isConfirmed) return;

    this.reservaService
      .putReserva(reservaUpdated, reservaUpdated.idReserva)
      .subscribe({
        next:(putResponse) => {
          alertNotification('', putResponse.message);
        },
        error:(err)=>{  alertNotification('', err.error.message, 'error');  }
      });
  }

  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {
    const paqueteSplit = paquete.split(' ');
    let precio = 0;
    if (paqueteSplit.length <= 1) {
      this.total = 0;
      // console.log("No selecciono paquete")
      this.reserva.totalPago = this.total;
    } else {
      precio = Number(paqueteSplit[1]);
      // console.log("paquete: ", precio);
      const precioAcompaniante = 6;
      const totalTemp =
        cantPersona * Number(precio) + acompaniante * precioAcompaniante;
      this.total = Number(totalTemp.toFixed(2));
      this.reserva.totalPago = this.total;
    }
  }
}
