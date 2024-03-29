import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { hasToken } from 'src/app/util/token.util';


@Component({
  selector: 'app-cumpleanios',
  templateUrl: './cumpleanios.component.html',
  styleUrls: ['./cumpleanios.component.scss']
})
export class CumpleaniosComponent implements OnInit {
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
  precioPaquetes = {
    nito: 0,
    mr_joy: 0,
    super_mr_joy: 0
  }

  constructor(private paquetesService: PaquetesService) {
    this.monthSelect = new Array;

  }

  habilitar: boolean = true;

  ngOnInit(): void {
    this.getDaysFromDate(12, 2022);
    this.setPriceToCardPackages()

  }
  getDaysFromDate(month: any, year: any) {


    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
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

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  hasSesion() {
    return hasToken()
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
  }

  setPriceToCardPackages() {

    this.paquetesService.getPaquetes().subscribe(packageResponse => {
      packageResponse.forEach(paquete => {
        const isNitoPackage = paquete.idPaquete === 1;
        const isMrJoyPackage = paquete.idPaquete === 2;
        const isSuperMrJoyPackage = paquete.idPaquete === 3;

        if (isNitoPackage) this.precioPaquetes.nito = paquete.precio!
        if (isMrJoyPackage) this.precioPaquetes.mr_joy = paquete.precio!
        if (isSuperMrJoyPackage) this.precioPaquetes.super_mr_joy = paquete.precio!
      })
    })

  }

}
