import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReservaServiceService } from './reserva-service.service';
import { Reserva } from './reserva';
import { Route, Router } from '@angular/router';
import { IReserva } from './reserva';
//import { FormularioReservaComponent } from '../formulario-reserva/formulario-reserva.component';

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
  reservas:Reserva[]=[];

  listar:Reserva;

  // iniciando datos de variables
  constructor(private reseraService:ReservaServiceService, private router:Router) {
    this.monthSelect=new Array;
    this.listar = new Reserva();
   }

  // la misma vaina :v

  ngOnInit(): void 
  {
    var fecha = new Date();
    var hoy = fecha.getDate();
    var mesActual = fecha.getMonth()+1;
    var anioActual = fecha.getFullYear();
    /* Test 
    /* console.log(hoy);
    /* console.log(mesActual);
    /* console.log(anioActual);
    /* */
    this.getDaysFromDate(mesActual, anioActual)
    this.clickDayInicial(hoy)
  }

  getDaysFromDate(month:any, year:any) {

    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate ;
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()

      };
    });

    /*var fecha = new Date();
    var hoy = fecha.getDate();
    this.clickDay(hoy);*/
    this.monthSelect = arrayDays;
  }

  changeMonth(flag:any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day:any) 
  {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    this.reseraService.getReserva(parse).subscribe( reservas => { this.reservas = reservas});
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

  clickDayInicial(day:any)
  {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day}`
    this.reseraService.getReserva(parse).subscribe( reservas => { this.reservas = reservas; });
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

  

  verDetallesReserva(hora : any)
  {
    //console.log('diste clic en la hora: ' + hora)
    for (let i=0 ; this.reservas.length; i++)
    {
      if (this.reservas[i].hora === hora)
      {
        this.listar = this.reservas[i];
      }
    }
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
    correo:"",
    idLogin: -1,
    nombres: '',
    apellido: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 0,
    totalPago: 0
  };

  /*obtenerDatosModal(objecto : any)
  {
    this.ireserva = objecto;
    this.formularioReservaComponent.darValores(this.ireserva);
  }*/

  
}
