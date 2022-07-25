import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PaqueteServiceService } from 'src/app/components/cliente/formulario-reserva/paquete-service.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { ReservaServiceService } from './reserva-service.service';
import { reserva } from './reserva';


@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.scss']
})
export class FormularioReservaComponent implements OnInit {
  @Input()
  habilitar: boolean = false;
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;

  paquetes:Paquete[]=[];
  reservas:reserva[]=[];

  constructor(private paqueteService:PaqueteServiceService, private reseraService:ReservaServiceService) {
    this.monthSelect=new Array;
    
    
   }



  ngOnInit(): void {
    var fecha = new Date();
    var hoy = fecha.getDate();
    var mesActual = fecha.getMonth()+1;
    var anioActual = fecha.getFullYear();
    console.log(hoy);
    console.log(mesActual);
    console.log(anioActual);
    this.getDaysFromDate(mesActual, anioActual)
    this.clickDayInicial(hoy)
    this.paqueteService.getPaquete().subscribe( paquetes=>{ this.paquetes=paquetes; } ); 
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
    this.reseraService.getReserva(parse).subscribe( reservas => { this.reservas = reservas});
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

}

