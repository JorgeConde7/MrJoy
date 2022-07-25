import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { GetDataService } from 'src/app/core/apis/get-data.service';
import { CharacterResponse } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';
import { Empleado } from './admin-empleado';
import { EmpleadoService} from './admin-empleado.Service';

@Component({
  selector: 'app-admin-empleado',
  templateUrl: './admin-empleado.component.html',
  styleUrls: ['./admin-empleado.component.scss']
})
export class AdminEmpleadoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any

  constructor(private empleadoService:EmpleadoService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    this.empleadoService.getEmpleado()
      .subscribe(result => {
        console.log(result);
        this.data = result;
        this.dtTrigger.next(this.dtOptions)
      })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
}