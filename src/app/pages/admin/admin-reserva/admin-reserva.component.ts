import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-reserva',
  templateUrl: './admin-reserva.component.html',
  styleUrls: ['./admin-reserva.component.scss']
})
export class AdminReservaComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any

  habilitar: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
