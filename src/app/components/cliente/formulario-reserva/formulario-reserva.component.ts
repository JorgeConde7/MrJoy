import { Component, Input, OnInit } from '@angular/core';
import { PaqueteServiceService } from 'src/app/core/apis/client/paquete-service.service';
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


@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.scss']
})
export class FormularioReservaComponent implements OnInit {

  //habilitar: boolean = false;
  total: number = 0;



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



  paquetes: Paquete[] = [];

  formReserva: FormGroup

  constructor(private paqueteService: PaqueteServiceService, private reservaService: ReservaServiceService, private router: Router, private formBuilder: FormBuilder) {
    this.formReserva = this.getReservaFormBuilder();
  }



  ngOnInit(): void {
    this.paqueteService.getPaquete().subscribe(
      paquetes => {
        this.paquetes = paquetes;
      });
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

    return this.formBuilder.group({
      fechaReserva: [today, [Validators.required, this.dateValidator]],
      hora: ["inicio", [Validators.required, Validators.pattern(regex.NOT_INICIO)]],
      nombres: [null, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      apellido: [null, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required, Validators.pattern(regex.PHONE)]],
      idPaquete: ["0", [Validators.required, Validators.pattern(regex.PAQUETE)]],
      cantPersonas: [1, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(1), Validators.max(15)]],
      acompaniante: [0, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(0), Validators.max(15)]],
    })
  }


  validarHorario() {
    //console.log('Llamando a fecha reserva ' + this.reserva.fechaReserva)
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

  RegistrarReservaClass(datoReserva: any) {
    this.reserva = datoReserva;
    let guardandoidPaquete = this.reserva.idPaquete;
    let pruebita = guardandoidPaquete.toString().split(" ");
    this.reserva.idPaquete = parseInt(pruebita[0]);

    this.reservaService.CrearReserva(this.reserva).subscribe(() => {
      alert("Reserva registrada correctamente!!")
    });
    this.reserva.idPaquete = 0;
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
    // console.log("this.formReserva.value");
    // console.log(this.formReserva.value);
    // console.log("this.reserva");
    // console.log(this.reserva);

    this.reserva.acompaniante = acompaniante
    this.reserva.apellido = apellido
    this.reserva.cantPersonas = cantPersonas
    this.reserva.fechaRegistro = today
    this.reserva.fechaReserva = fechaReserva
    this.reserva.hora = hora
    this.reserva.idLogin = idLoginFromToken
    this.reserva.idPaquete = Number(idPaqueteSelected)
    this.reserva.nombres = nombres
    this.reserva.telefono = telefono
    this.reserva.totalPago = this.total
    this.reserva.email = email
  }

  RegistrarReservaEmpleado() {
    let guardandoidPaquete = this.reserva.idPaquete;
    let pruebita = guardandoidPaquete.toString().split(" ");
    this.reserva.idPaquete = parseInt(pruebita[0]);
    this.reservaService.CrearReserva(this.reserva).subscribe(() => {
      alert("Reserva registrada correctamente!!")
    });
    this.reserva.idPaquete = 0;
    window.location.href = 'admin/reservas'
  }

  get cantidadPersonas() {
    return this.formReserva.controls['cantPersonas'].value
  }

  get cantidadAcompaniantes() {
    return this.formReserva.controls['acompaniante'].value
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

