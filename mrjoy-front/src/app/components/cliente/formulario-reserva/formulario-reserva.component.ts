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

  horaOcupada: string[] = [] ;


  public reserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: 'inicio',
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



  paquetes: Paquete[] = [];


  constructor(private paqueteService: PaqueteServiceService, private reservaServiceService: ReservaServiceService) {

  }



  ngOnInit(): void {
    this.paqueteService.getPaquete().subscribe(
      paquetes => {
        this.paquetes = paquetes;

      });
  }



  validarHorario()
  {
    //console.log('Llamando a fecha reserva ' + this.reserva.fechaReserva)
    this.reservaServiceService.getReserva(this.reserva.fechaReserva).subscribe
    (
      reservas => 
      {
        for (let i = 0; i < reservas.length; i++)
        {
          //console.log(reservas[i].hora);
          if (this.reserva.hora === reservas[i].hora)
          {
            alert("El horario escogido se encuentra reservado. Por favor elija otra horario!!")
            return;
          }
        }
        //this.RegistrarReserva()
      }
    )
  }

  RegistrarReservaClass(datoReserva : any)
  {
    this.reserva = datoReserva;
    let guardandoidPaquete = this.reserva.idPaquete;
    let pruebita = guardandoidPaquete.toString().split(" ");
    this.reserva.idPaquete = parseInt(pruebita[0]);
    this.reservaServiceService.CrearReserva(this.reserva).subscribe(() => {
      alert("Reserva registrada correctamente!!")
    });
    this.reserva.idPaquete = 0;
  }


  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {

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

  validandoCambioDeFecha()
  {
    //console.log(this.reserva.fechaReserva)
    this.horaCadena = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    this.reserva.hora = 'inicio'
    if (this.reserva.fechaReserva === '') return;

    this.reservaServiceService.getReserva(this.reserva.fechaReserva).subscribe( cuerpo =>
      {
        this.horaOcupada = [];
        for(let i=0; i<cuerpo.length; i++)
        {
          this.horaOcupada.push(cuerpo[i].hora)
        }
        this.horaOcupada.sort()
        //console.log(this.horaOcupada)
        for(let i=0; i<this.horaOcupada.length; i++)
        {
          //console.log(this.horaCadena.indexOf(this.horaOcupada[i]))
          this.horaCadena.splice(this.horaCadena.indexOf(this.horaOcupada[i]), 1)
        }
        //console.log(this.horaCadena)
      })
  }
  
}

