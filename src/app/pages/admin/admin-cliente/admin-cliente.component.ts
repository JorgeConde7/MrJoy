
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../../../core/apis/admin/admin-cliente.service';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.scss']
})

export class AdminClienteComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any

  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    this.clienteService.getCliente()
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
