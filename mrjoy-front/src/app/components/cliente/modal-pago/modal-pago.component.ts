import { Component, OnInit } from '@angular/core';
import { ReservaServiceService } from '../calendario-reserva/reserva-service.service';
import { FormularioReservaComponent } from '../formulario-reserva/formulario-reserva.component';
import { PaqueteServiceService } from '../formulario-reserva/paquete-service.service';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {

  private formulario:FormularioReservaComponent=new FormularioReservaComponent(this.paqueteService,this.reservaServiceService);

  constructor(private paqueteService: PaqueteServiceService, private reservaServiceService: ReservaServiceService) { }

  ngOnInit(): void {
  }

  registrar(){
    
  }


}
