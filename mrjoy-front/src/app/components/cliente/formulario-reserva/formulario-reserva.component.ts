import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PaqueteServiceService } from 'src/app/components/cliente/formulario-reserva/paquete-service.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';

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

  constructor(private paqueteService:PaqueteServiceService) {
    this.monthSelect=new Array;
    
   }



  ngOnInit(): void {
    this.getDaysFromDate(12, 2022)
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

  clickDay(day:any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

}

