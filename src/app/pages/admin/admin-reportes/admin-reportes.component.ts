import { Component,OnInit } from '@angular/core';


//import { Chart,LinearScale, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';
//import Chart from 'chart.js/auto';

import { ReporteServiceService } from './reporte-service.service';

import {entradas} from '../../../core/models/admin/data'


@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.scss']
})
export class AdminReportesComponent  implements  OnInit{



  ngOnInit(): void{
    Object.assign(this, {entradas});



    this.reporte.getListar().subscribe(
      result=>{
        //var paquete=result;
        this.paquetes=result.map(datum  => ({name: datum.nombre, value: datum.total }));
        //console.log(typeof(result))
        //console.log(paquete)

      }
    )

    this.reporte.getListarInfo().subscribe(
      result=>{
        this.info=result.map(datum  => ({name: datum.dato, value: datum.cantidad }));
      }
    )

  }


  paquetes: any []=[];
  entradas: any[] = [];
  info: any[] = [];


  view1:[number,number] = [1400, 400];
  view2:[number,number] = [600, 400];
  view3:[number,number] = [600, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  xAxisLabel1 = 'Ventas por Paquetes';
  xAxisLabel = 'Ventar por entradas';
  yAxisLabel = 'Cantidad';
  yAxisLabel1 = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', 'red', '#C7B42C', '#AAAAAA']
  };

  constructor(private reporte: ReporteServiceService) {

  }

  onSelect(event:any) {
    console.log(event);
  }


  onSelect2(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  //title='app';
  //chart:any=[];

//   constructor() {
//     Chart.register(LinearScale,BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
// }

  //ngOnInit() {

  //   const dias = ["lunes","martes","miercoles","jueves","viernes","sabado"];
  //   const valor1 =[2, 19, 3, 5, 2, 3];
  //   const valor2 =[4, 14, 13,2, 8, 5];
  //   const myChart = new Chart("myChart", {
  //     type: 'bar',
  //     data: {
  //         labels: dias,
  //         datasets: [{
  //             label: 'prueba1',
  //             data: valor1,
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         },
  //         {
  //           label: 'prueba2',
  //           data: valor2,
  //           backgroundColor: [
  //               'rgba(255, 99, 132, 0.2)',
  //               'rgba(54, 162, 235, 0.2)',
  //               'rgba(255, 206, 86, 0.2)',
  //               'rgba(75, 192, 192, 0.2)',
  //               'rgba(153, 102, 255, 0.2)',
  //               'rgba(255, 159, 64, 0.2)'
  //           ],
  //           borderColor: [
  //               'rgba(255, 99, 132, 1)',
  //               'rgba(54, 162, 235, 1)',
  //               'rgba(255, 206, 86, 1)',
  //               'rgba(75, 192, 192, 1)',
  //               'rgba(153, 102, 255, 1)',
  //               'rgba(255, 159, 64, 1)'
  //           ],
  //           borderWidth: 1
  //       }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });
   //}
}
