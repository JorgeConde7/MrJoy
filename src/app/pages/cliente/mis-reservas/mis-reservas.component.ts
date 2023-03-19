import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { getPayload } from 'src/app/util/token.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()

  reservas: IReserva[] = [];
  id!: number;

  paquetes: Paquete[] = [];

  constructor(private reservaService: ReservaServiceService, private router: Router,
    private paqueteService: PaquetesService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    const payLoad = getPayload()
    this.id = payLoad?.id ? payLoad.id : 0;
    this.reservaService.getReservasPorIdLogin(this.id).subscribe(data => {
      this.reservas = data;
      this.dtTrigger.next(this.dtOptions)
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
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
