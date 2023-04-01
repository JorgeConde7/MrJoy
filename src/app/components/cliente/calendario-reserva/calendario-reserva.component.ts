import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReservaServiceService } from '../../../core/apis/client/reserva-service.service';
import { Reserva } from './reserva';
import { Router } from '@angular/router';
import { IReserva } from './reserva';
import { ICalendary } from 'src/app/core/models/client/calendary';

@Component({
  selector: 'app-calendario-reserva',
  templateUrl: './calendario-reserva.component.html',
  styleUrls: ['./calendario-reserva.component.scss']
})
export class CalendarioReservaComponent implements OnInit {

  // definiendo variables

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  dateValue: any;
  monthSelect: any[];
  dateSelect: any;
  reservas: Reserva[] = [];
  calendarySelect!: ICalendary;
  
  //listar:Reserva;
  listar: any;

  // iniciando datos de variables
  constructor(private reseraService: ReservaServiceService, private router: Router) {
    this.monthSelect = new Array;
    this.listar = new Reserva();
  }

  // la misma vaina :v

  ngOnInit(): void {
    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anioActual = fecha.getFullYear();

    this.getDaysFromDate(mesActual, anioActual)
    this.clickDayInicial(hoy)
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

  clickDay(day: ICalendary) {
    console.log({ dateSelect: this.dateSelect });
    const dateSelectMoment = this.dateSelect as moment.Moment;
    console.log(day);
    this.calendarySelect = day;
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    this.reseraService.getReserva(parse).subscribe(reservas => { this.reservas = reservas });
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

  clickDayInicial(day: number) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const dateFull = `${monthYear}-${day}`
    this.reseraService.getReserva(dateFull).subscribe(reservas => { this.reservas = reservas; });
    const objectDate = moment(dateFull)
    this.dateValue = objectDate;
  }

  //paquete:any;

  verDetallesReserva(hora: string) {
    console.log('diste clic en la hora: ' + hora)
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].hora === hora) {
        this.listar = this.reservas[i];
      }
    }
    this.ireserva = this.listar;
    /*this.paqueteService.getPaquete().subscribe( paquetes =>
      {
        this.paquete = paquetes;
        for (let i=0; i<this.paquete.length; i++)
        {
          if (this.paquete[i].idPaquete === this.ireserva.idPaquete)
          {
            this.ireserva.idPaquete = this.ireserva.idPaquete + ' ' + this.paquete[i].precio;
          }
        }
      });*/
    //this.ireserva.idPaquete = this.ireserva.idPaquete + ' ' + this.ireserva.precio
    //console.log(this.ireserva)
  }

  isDateCalendarySelected(day: ICalendary) {
    // console.log(this.calendarySelect === day);

    return this.calendarySelect === day
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  ireserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: '',
    cantPersonas: 0,
    correo: "",
    idLogin: 1,
    nombres: '',
    apellido: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 0,
    totalPago: 0,
    dni: '',
    estado: 'vigente'
  };

}
