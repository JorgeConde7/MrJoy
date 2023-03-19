import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReserva, Reserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { ICalendary } from 'src/app/core/models/client/calendary';
import * as moment from 'moment';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';

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

    paquetes: Paquete[] = [];

    total: number = 0;

    //variables de calendario
    dateValue: any;
    monthSelect: any[];
    dateSelect: any;
    calendarySelect!: ICalendary;

    listar: any;

    week: any = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo"
    ];

  constructor(private activerouter: ActivatedRoute, private router:Router,
    private reservaService: ReservaServiceService, private paqueteService: PaquetesService) {
      this.monthSelect = new Array;
    }

    datosReserva: Reserva[] = [];
    iReserva: IReserva[] = [];

  editarForm = new FormGroup({
    nombres: new FormControl(''),
    idPaquete: new FormControl(''),
    fechaRegistro: new FormControl(''),
    fechaReserva: new FormControl(''),
    hora: new FormControl(''),
    cantPersonas: new FormControl(0),
    idLogin: new FormControl(0),
    apellido: new FormControl(''),
    telefono: new FormControl(''),
    flagTipoReserva: new FormControl(0),
    acompaniante: new FormControl(1),
    totalPago: new FormControl(0),
    email: new FormControl('')

} );

  ngOnInit(): void {
    let reservaId = this.activerouter.snapshot.paramMap.get('id')
    let reservaIdNumber = Number(reservaId);

    this.setPaquetesList()

    this.reservaService.getReservasPorIdReserva(reservaIdNumber).subscribe(data => {
      const paquetefound = this.paquetes.find(paquete => paquete.idPaquete === data.idPaquete)
      const paqueteValue = `${paquetefound?.idPaquete} ${paquetefound?.precio}`

      const horafound = this.horaCadena.find(hora => {
        const horaFormat = data.hora.split('-')[0]
        return hora === horaFormat
      })


      this.editarForm.setValue({
        'nombres': data.nombres,
        'idPaquete': paqueteValue,
        'fechaRegistro': data.fechaRegistro,
        'fechaReserva': data.fechaReserva,
        'hora': horafound!,
        'cantPersonas': data.cantPersonas,
        'idLogin': data.idLogin,
        'apellido': data.apellido,
        'telefono': data.telefono,
        'flagTipoReserva': data.flagTipoReserva,
        'acompaniante': data.acompaniante,
        'totalPago': data.totalPago,
        'email': data.email!
      });
    })




  }

  setPaquetesList() {
    this.paqueteService.getPaquetes().subscribe(
      paquetes => {
        this.paquetes = paquetes;
      });
  }

  onSubmit() {
    console.log(this.editarForm.value)
  }

  //calendario

  verDetallesReserva(hora: string) {
    console.log('diste clic en la hora: ' + hora)
    for (let i = 0; i < this.datosReserva.length; i++) {
      if (this.datosReserva[i].hora === hora) {
        this.listar = this.datosReserva[i];
      }
    }
    this.iReserva = this.listar;

  }

  isDateCalendarySelected(day: ICalendary) {
    // console.log(this.calendarySelect === day);

    return this.calendarySelect === day
  }

  clickDay(day: ICalendary) {
    console.log({ dateSelect: this.dateSelect });
    const dateSelectMoment = this.dateSelect as moment.Moment;
    console.log(day);
    this.calendarySelect = day;
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    this.reservaService.getReserva(parse).subscribe(reservas => { this.datosReserva = reservas });
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

  getDaysFromDate(month: number, year: number) {

    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((date: string) => {
      const datenumber = parseInt(date) + 1;
      const dayObject = moment(`${year}-${month}-${datenumber}`);
      return {
        name: dayObject.format("dddd"),
        value: datenumber,
        indexWeek: dayObject.isoWeekday()

      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

}


