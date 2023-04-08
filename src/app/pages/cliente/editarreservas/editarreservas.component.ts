import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { getCurrentDate } from 'src/app/util/utils.util';
import { getPayload } from 'src/app/util/token.util';
import * as moment from 'moment';
import * as regex from 'src/app/util/regex.util';
import { alertNotification } from 'src/app/util/notifications';
import { error } from 'console';

@Component({
  selector: 'app-editarreservas',
  templateUrl: './editarreservas.component.html',
  styleUrls: ['./editarreservas.component.scss']
})
export class EditarreservasComponent implements OnInit {

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


  total: number = 0;

  listar: any;
  editarForm: FormGroup;

  paquetes: Paquete[] = [];

  datosReserva: IReserva = {
    idPaquete: 1,
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

  iReserva: IReserva[] = [];

  sesionData = { isClient: true }


  constructor(private activerouter: ActivatedRoute, private router:Router,
    private reservaService: ReservaServiceService, private paqueteService: PaquetesService, private formBuilder: FormBuilder) {
      this.editarForm = this.getReservaFormBuilder()
  }


  ngOnInit(): void {

    this.setPaquetesList()

    let reservaId = this.activerouter.snapshot.paramMap.get('id')
    let reservaIdNumber = Number(reservaId);

    this.reservaService.getReservaPorIdReserva(reservaIdNumber).subscribe(data => {

      const paquetefound = this.paquetes.find(paquete  => paquete.idPaquete === data.idPaquete)

      const paqueteValue = `${paquetefound?.idPaquete} ${paquetefound?.precio}`

      const horafound = this.horaCadena.find(hora => {
        const horaFormat = data.hora.split('-')[0]
        return hora === horaFormat
      })

      this.editarForm.setValue({
        'idPaquete': paqueteValue,
        //'fechaRegistro': data.fechaRegistro,
        'fechaReserva': data.fechaReserva,
        'hora': horafound!,
        'cantPersonas': data.cantPersonas,
        //'idLogin': data.idLogin,
        'telefono': data.telefono,
        //'flagTipoReserva': data.flagTipoReserva,
        'acompaniante': data.acompaniante,
        //'totalPago': data.totalPago,
        'email': data.email!
      });
      this.total = data.totalPago
    })


  }

  get cantidadPersonas() {
    return this.editarForm.controls['cantPersonas'].value
  }

  get cantidadAcompaniantes() {
    return this.editarForm.controls['acompaniante'].value
  }


  setPaquetesList() {
    this.paqueteService.getPaquetes().subscribe(
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
    let { correo, apellidos, nombres, telefono, profile } = getPayload()!
    const isClient = profile === "cliente"

    this.sesionData.isClient = isClient;
    return this.formBuilder.group({
      fechaReserva: [today, [Validators.required, this.dateValidator]],
      hora: ["inicio", [Validators.required, Validators.pattern(regex.NOT_INICIO)]],
      email: [correo, [Validators.required, Validators.email]],
      telefono: [telefono, [Validators.required, Validators.pattern(regex.PHONE)]],
      idPaquete: ["0", [Validators.required, Validators.pattern(regex.PAQUETE)]],
      cantPersonas: [15, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(15), Validators.max(30)]],
      acompaniante: [0, [Validators.required, Validators.pattern(regex.INTEGER), Validators.min(0), Validators.max(15)]]
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



  onSubmit() {
    let reservaId = Number(this.activerouter.snapshot.paramMap.get('id'))

    let { correo, apellidos: apellido, nombres, telefono, profile, id } = getPayload()!
    const soloIdPaquete = this.editarForm.value.idPaquete!.split(" ")[0]

    const reservaDto: IReserva = {
      nombres,
      idPaquete: soloIdPaquete,
      apellido,
      fechaRegistro: this.editarForm.value.fechaRegistro!,
      hora: this.editarForm.value.hora!,
      cantPersonas: Number(this.editarForm.value.cantPersonas!),
      idLogin: id,
      telefono: this.editarForm.value.telefono!,
      flagTipoReserva: 0,
      acompaniante: this.editarForm.value.acompaniante!,
      totalPago: this.total,
      email: this.editarForm.value.email!,
      fechaReserva: this.editarForm.value.fechaReserva!

    }

    if (reservaDto) {
      this.reservaService.putReserva(reservaDto, reservaId).subscribe(
        reservaDto => {
          console.log(reservaDto)
          alertNotification("Se ha actualizado la reserva. Todo correcto.", "", "success", ({ isConfirmed }) => {
          if (isConfirmed) window.location.reload();
        })
        this.router.navigate(['mis-reservas'])
      },
        error => {
          alertNotification(error.error.message, '', "error", ({ isConfirmed }) => {
            if (isConfirmed) window.location.reload();
          })
          this.router.navigate(['mis-reservas'])
        }
      )
      }
  }


  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {

    const paqueteSplit = paquete.split(" ")
    let precio = 0
    if (paqueteSplit.length <= 1) {
      this.total = 0
      //console.log("No selecciono paquete")
      this.datosReserva.totalPago == this.total
    }
    else {
      precio = Number(paqueteSplit[1])
      console.log("paquete: ", precio);
      const precioAcompaniante = 6
      const totalTemp = cantPersona * Number(precio) + acompaniante * precioAcompaniante
      this.total = Number(totalTemp.toFixed(2))
      this.datosReserva.totalPago == this.total
    }

  }

  validandoCambioDeFecha() {
    this.horaCadena = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    const { fechaReserva } = this.editarForm.value as IReserva
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

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  clickRegresar() {
    this.router.navigate(['/mis-reservas']);
  }

}


