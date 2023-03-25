import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';

// RESERVA
import { ReservaServiceService } from '../../../core/apis/client/reserva-service.service';
import { IReserva } from '../calendario-reserva/reserva';
import { Router } from '@angular/router';
import { getPayload } from 'src/app/util/token.util';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as regex from 'src/app/util/regex.util';
import * as moment from 'moment';
import { getCurrentDate } from 'src/app/util/utils.util';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';


@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormularioReservaComponent implements OnInit {

  horaCadena: string[] = ['10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00']
  horaOcupada: string[] = [];

  @Input() reserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: 'inicio',
    cantPersonas: 0,
    correo: "",
    idLogin: 1,
    nombres: '',
    apellido: '',
    email: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 0,
    totalPago: 0
  };
  total: number = 0;

  paquetes: Paquete[] = [];
  formReserva: FormGroup
  sesionData = { isClient: true }

  constructor(private paqueteService: PaquetesService, private reservaService: ReservaServiceService, private router: Router, private formBuilder: FormBuilder) {
    this.formReserva = this.getReservaFormBuilder();
  }



  ngOnInit(): void {
    this.paqueteService.getPaquetes().subscribe(
      paquetes => {
        this.paquetes = paquetes;
      });
  }

  get cantidadPersonas() {
    return this.formReserva.controls['cantPersonas'].value
  }

  get cantidadAcompaniantes() {
    return this.formReserva.controls['acompaniante'].value
  }

  dateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value) {
      const date = moment(control.value);
      const today = moment().subtract(1, 'day');
      if (date.isBefore(today)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }

  getReservaFormBuilder() {
    const [date, month, year, _] = getCurrentDate()
    const today = `${year}-${month}-${date}`
    this.validandoCambioDeFechaByFecha(today)
    let { correo, apellidos, nombres, telefono, profile } = getPayload()!
    const isClient = profile === "cliente"
    if (!isClient) {
      correo = ''
      apellidos = ''
      nombres = ''
      telefono = ''
    }
    this.sesionData.isClient = isClient;
    return this.formBuilder.group({
      fechaReserva: [today, [Validators.required, this.dateValidator]],
      hora: ["inicio", [Validators.required, Validators.pattern(regex.NOT_INICIO)]],
      nombres: [nombres, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      apellido: [apellidos, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      email: [correo, [Validators.required, Validators.email]],
      telefono: [telefono, [Validators.required, Validators.pattern(regex.PHONE)]],
      idPaquete: ["0", [Validators.required, Validators.pattern(regex.PAQUETE)]],
      cantPersonas: [15, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(15), Validators.max(30)]],
      acompaniante: [0, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(0), Validators.max(15)]],
    })
  }


  validarHorario() {
    this.reservaService.getReserva(this.reserva.fechaReserva).subscribe
      (
        reservas => {
          for (let i = 0; i < reservas.length; i++) {
            //console.log(reservas[i].hora);
            if (this.reserva.hora === reservas[i].hora) {
              alert("El horario escogido se encuentra reservado. Por favor elija otra horario!!")
              return;
            }
          }
          //this.RegistrarReserva()
        }
      )
  }

  setFormularioDataToReservaDTO() {
    // console.log("Hola Mundo");
    const currentDateTime = new Date()
    const day = currentDateTime.getFullYear()
    const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0")
    const date = (currentDateTime.getDate()).toString().padStart(2, "0")
    const today = `${day}-${month}-${date}`;

    const { acompaniante, apellido, cantPersonas, fechaReserva, hora, idPaquete, nombres, telefono, email } = this.formReserva.value as IReserva;
    const payload = getPayload()!;
    const { id: idLoginFromToken } = payload;

    const idPaqueteSelected = idPaquete.toString().split(" ")[0]

    this.reserva.acompaniante = acompaniante
    this.reserva.apellido = apellido
    this.reserva.cantPersonas = cantPersonas
    this.reserva.fechaRegistro = null;
    this.reserva.fechaReserva = fechaReserva
    this.reserva.hora = hora
    this.reserva.idLogin = idLoginFromToken
    this.reserva.idPaquete = Number(idPaqueteSelected)
    this.reserva.nombres = nombres
    this.reserva.telefono = telefono
    this.reserva.totalPago = this.total
    this.reserva.email = email
  }

  registrarReservaEmpleado() {
    this.setFormularioDataToReservaDTO()
    this.reservaService.CrearReserva(this.reserva).subscribe(reservaResponse => {
      console.log({ reservaResponse });

    })


  }

  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {

    const paqueteSplit = paquete.split(" ")
    let precio = 0
    if (paqueteSplit.length <= 1) {
      this.total = 0
      console.log("No selecciono paquete")
      this.reserva.totalPago = this.total

    }
    else {
      precio = Number(paqueteSplit[1])
      console.log("paquete: ", precio);
      const precioAcompaniante = 6
      const totalTemp = cantPersona * Number(precio) + acompaniante * precioAcompaniante
      this.total = Number(totalTemp.toFixed(2))
      this.reserva.totalPago = this.total;
    }

  }

  validandoCambioDeFecha() {
    this.horaCadena = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    const { fechaReserva } = this.formReserva.value as IReserva
    const isEmpty = fechaReserva === ""

    if (isEmpty) return;

    this.reservaService.getReserva(fechaReserva).subscribe(reservaResponse => {

      this.horaOcupada = reservaResponse.map(reserva => reserva.hora)

      this.horaOcupada.sort()

      for (let i = 0; i < this.horaOcupada.length; i++) {
        this.horaCadena.splice(this.horaCadena.indexOf(this.horaOcupada[i]), 1)
      }
    })
  }

  validandoCambioDeFechaByFecha(fecha: string) {
    this.horaCadena = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    this.reservaService.getReserva(fecha).subscribe(reservaResponse => {

      this.horaOcupada = reservaResponse.map(reserva => reserva.hora)

      this.horaOcupada.sort()

      for (let i = 0; i < this.horaOcupada.length; i++) {
        this.horaCadena.splice(this.horaCadena.indexOf(this.horaOcupada[i]), 1)
      }
    })
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }



}

