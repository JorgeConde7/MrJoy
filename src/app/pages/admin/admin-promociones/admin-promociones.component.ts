import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminPromocionesService } from '../../../core/apis/admin/admin-promociones.service';
import { Router } from '@angular/router';
import { Promociones, IPromociones } from '../../../core/models/admin/admin-promociones';

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
  ipromocion: IPromociones =
  {
    id_promociones: 0,
    descripcion: '',
    promociones: '',
    foto: ''
  }

  constructor(private promocionService:AdminPromocionesService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    this.promocionService.getPromocion()
      .subscribe(result => {
        //console.log(result);
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

  eliminarPromociones(id : number)
  {
    this.promocionService.deletePromocion(id).subscribe(
      result => {
        this.getPromociones()
      }
    )
  }

  editarPromociones(data : any)
  {
    this.ipromocion = data;
  }

  limpiarModal()
  {
    this.ipromocion.id_promociones = 0;
    this.ipromocion.promociones = '';
    this.ipromocion.descripcion = '';
    this.ipromocion.foto = '';
  }

  guardarDatos()
  {
    if (!this.ipromocion.id_promociones)
    {
      this.promocionService.create(this.ipromocion).subscribe(
        datos => { this.getPromociones() }
      )
      //console.log('e')

    }
    else
    {
      this.promocionService.actualizarPromocion(this.ipromocion, this.ipromocion.id_promociones).subscribe(
        datos => { this.getPromociones() }
      )
      //console.log('a')
    }
  }
}




