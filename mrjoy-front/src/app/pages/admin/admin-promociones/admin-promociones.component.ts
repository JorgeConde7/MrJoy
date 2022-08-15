import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminPromocionesService } from './admin-promociones.service';
import { Router } from '@angular/router';
import { Promociones } from './admin-promociones';

@Component({
  selector: 'app-admin-promociones',
  templateUrl: './admin-promociones.component.html',
  styleUrls: ['./admin-promociones.component.scss']
})
export class AdminPromocionesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  data: any;
  isInsert=true;

  constructor(private promocionService:AdminPromocionesService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    this.promocionService.getPromocion()
      .subscribe(result => {
        console.log(result);
        this.data = result;
        this.dtTrigger.next(this.dtOptions)
      })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
  getPromociones() {
    this.promocionService.getPromocion().subscribe((result) => {
    this.data = result;
    });
  }
  
  }




