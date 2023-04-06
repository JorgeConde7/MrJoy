import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';

@Component({
  selector: 'app-admin-reserva',
  templateUrl: './admin-reserva.component.html',
  styleUrls: ['./admin-reserva.component.scss'],
})
export class AdminReservaComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();

  habilitar: boolean = true;
  reservaPicked: IReserva = this.getReservaPickedTemplate();
  paquetes: Paquete[] = [];
  paquetePicked: String = '-';

  constructor(private paquetesService: PaquetesService) {}

  ngOnInit(): void {
    this.setPaqueteList();
  }

  reservaPicked$(reserva: IReserva) {
    this.reservaPicked = reserva;
    this.paquetePicked = this.paquetes.find(paquete=> paquete.idPaquete === reserva.idPaquete)!.descripcion!
  }

  setPaqueteList() {
    this.paquetesService
      .getPaquetes()
      .subscribe((paquetes) => (this.paquetes = paquetes));
  }

  getReservaPickedTemplate(): IReserva {
    return {
      idReserva: 0,
      fechaRegistro: '-',
      fechaReserva: '-',
      hora: '-',
      cantPersonas: 0,
      acompaniante: 0,
      nombres: '-',
      apellido: '-',
      telefono: '-',
      email: '-',
      dni: '-',
      flagTipoReserva: 0,
      totalPago: 0.0,
      estado: '-',
      idPaquete: 0,
      idLogin: 0,
    };
  }
}
