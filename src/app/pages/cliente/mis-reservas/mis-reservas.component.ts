import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { getPayload } from 'src/app/util/token.util';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {

  reservas: IReserva[] = [];
  id!: number;

  paquetes: Paquete[] = [];

  constructor(private reservaService: ReservaServiceService, private router: Router,
    private paqueteService: PaquetesService) {
  }

  ngOnInit(): void {
    const payLoad = getPayload()
    this.id = payLoad?.id ? payLoad.id : 0;
    this.reservaService.getReservasPorIdLogin(this.id).subscribe(data => {
      this.reservas = data});
  }


  editarReserva(id:number) {
    this.router.navigate(['editar-misreservas', id])
  }

  setPaquetesList() {
    this.paqueteService.getPaquetes().subscribe(
      paquetes => {
        this.paquetes = paquetes;
      });
  }
}
