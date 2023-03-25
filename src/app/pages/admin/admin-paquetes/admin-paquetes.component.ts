import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { PaquetesService } from '../../../core/apis/admin/paquetes.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { getPayload } from 'src/app/util/token.util';
import { LoginResponse } from 'src/app/core/models/response/login.response';
@Component({
  selector: 'app-admin-paquetes',
  templateUrl: './admin-paquetes.component.html',
  styleUrls: ['./admin-paquetes.component.scss']
})
export class AdminPaquetesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  data!: Paquete[];
  sesionValues!: LoginResponse
  sesionData = { isAdmin: false }

  constructor(private paqueteService: PaquetesService) {
    this.setSesionData()
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10
    };

    this.setDefaultPaquetes()
  }

  setSesionData() {
    const sesionData = getPayload()!
    this.sesionValues = sesionData;
    this.sesionData.isAdmin = sesionData.profile === "admin"
  }

  setDefaultPaquetes() {
    this.paqueteService.getPaquetes()
      .subscribe(result => {
        this.data = result;
        this.dtTrigger.next(this.dtOptions)
      })
  }

  getPromociones() {
    this.paqueteService.getPaquetes().subscribe((result) => {
      this.data = result;
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
}
