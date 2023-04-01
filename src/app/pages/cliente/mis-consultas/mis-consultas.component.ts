import { Component,OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { ContactoService } from 'src/app/core/apis/client/contacto.service';
import { Contacto } from 'src/app/core/models/client/contacto';
import { getPayload } from 'src/app/util/token.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-consultas',
  templateUrl: './mis-consultas.component.html',
  styleUrls: ['./mis-consultas.component.scss']
})
export class MisConsultasComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()

  id!: number;
  consultotas: Contacto[]=[];

  constructor(private consultaService: ContactoService) { }

  ngOnInit(): void {

    const payLoad = getPayload()
    this.id = payLoad?.id ? payLoad.id : 0;
    this.consultaService.getConsultasPorIdLogin(this.id).subscribe(
      data => {
        this.consultotas = data;
        console.log(this.consultotas);

        this.dtTrigger.next(this.dtOptions)
      }
    );

    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

}
