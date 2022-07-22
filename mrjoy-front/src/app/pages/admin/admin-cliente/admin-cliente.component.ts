import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { GetDataService } from 'src/app/core/apis/get-data.service';
import { CharacterResponse } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.scss']
})

export class AdminClienteComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any

  constructor(private httpClient: HttpClient, private getData: GetDataService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    this.getData.obtenerPersonajeXId("")
      .subscribe(result => {
        console.log(result.results);
        this.data = result.results;
        this.dtTrigger.next(this.dtOptions)
      })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
}