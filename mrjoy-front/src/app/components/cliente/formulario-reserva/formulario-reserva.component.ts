import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PaqueteServiceService } from 'src/app/components/cliente/formulario-reserva/paquete-service.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';

// RESERVA
import { ReservaServiceService } from '../calendario-reserva/reserva-service.service';
import { Reserva, IReserva } from '../calendario-reserva/reserva';


@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.scss']
})
export class FormularioReservaComponent implements OnInit {
  @Input()
  habilitar: boolean = false;
  total: number = 0;


  reserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: '',
    cantPersonas: 1,
    idLogin: -1,
    nombres: '',
    apellido: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 1,
    totalPago: 0
  };



  paquetes: Paquete[] = [];


  constructor(private paqueteService: PaqueteServiceService, private reservaServiceService: ReservaServiceService) {

    // let total = this.reserva.acompaniante * 10;

  }



  ngOnInit(): void {
    this.paqueteService.getPaquete().subscribe(
      paquetes => {
        this.paquetes = paquetes;

      });
  }

  RegistrarReserva() {
    console.log(this.reserva);
    let guardandoidPaquete = this.reserva.idPaquete;
    let pruebita = guardandoidPaquete.toString().split(" ");
    this.reserva.idPaquete = parseInt(pruebita[0]);
    this.reservaServiceService.CrearReserva(this.reserva).subscribe(() => {

    });
    this.reserva.idPaquete = 0;
    //console.log("Creando Reserva test...")
  }

  ValueDelPaquete(xd: any) {

  }

  aea() {
    console.log("aea funcionando")
    //this.total = this.reserva.acompaniante; //* this.reserva.idPaquete
  }

  parse(aea: any) {
    return parseInt(aea);
  }


  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {
    console.log("cantPersona: ", cantPersona);
    console.log("acompaniante: ", acompaniante);
    /*if (Number(paquete) == 0)
    {
      this.total = 0
    }*/

    const paqueteSplit = paquete.split(" ")
    let precio = 0
    if (paqueteSplit.length <= 1)
    {
      this.total = 0
      console.log("No selecciono paquete")
      
    }
    else
    {
      precio = Number(paqueteSplit[1])
      console.log("paquete: ", precio);
      const precioAcompaniante = 6
      this.total = cantPersona * Number(precio) + acompaniante * precioAcompaniante
    }
    this.reserva.totalPago = this.total;
    
  }

  fechaprobando()
  {
    console.log(this.reserva.fechaReserva)
  }
}

