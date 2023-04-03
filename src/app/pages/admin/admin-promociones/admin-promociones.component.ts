import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { IPromociones } from '../../../core/models/admin/admin-promociones';
import { getPayloadEmpleado } from 'src/app/util/token.util';
import { PromocionService } from 'src/app/core/apis/client/promociones.service';
import { Promocion } from 'src/app/core/models/client/Promociones';

@Component({
  selector: 'app-admin-promociones',
  templateUrl: './admin-promociones.component.html',
  styleUrls: ['./admin-promociones.component.scss']
})
export class AdminPromocionesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  promociones!: Promocion[];
  isInsert = true;
  ipromocion: IPromociones = { id_promociones: 0, descripcion: '', promociones: '', foto: '' }

  sesionData = { isAdmin: false }

  constructor(private promocionService: PromocionService, private router: Router) { }

  ngOnInit(): void {
    this. setSesionData()
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10
    };

    this.promocionService.getPromociones()
      .subscribe(result => {
        //console.log(result);
        this.promociones = result;
        this.dtTrigger.next(this.dtOptions)
      })
  }

  setSesionData() {
    const sesionData = getPayloadEmpleado()!
    this.sesionData.isAdmin = sesionData.profile === "admin"
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((result) => {
      this.promociones = result;
    });
  }

  eliminarPromociones(id: number) {
    // this.promocionService.deletePromocion(id).subscribe(
    //   result => {
    //     this.getPromociones()
    //   }
    // )
  }

  editarPromociones(data: any) {
    this.ipromocion = data;
  }

  limpiarModal() {
    this.ipromocion.id_promociones = 0;
    this.ipromocion.promociones = '';
    this.ipromocion.descripcion = '';
    this.ipromocion.foto = '';
  }

  guardarDatos() {
    // if (!this.ipromocion.id_promociones) {
    //   this.promocionService.create(this.ipromocion).subscribe(
    //     datos => { this.getPromociones() }
    //   )
    //   //console.log('e')

    // }
    // else {
    //   this.promocionService.actualizarPromocion(this.ipromocion, this.ipromocion.id_promociones).subscribe(
    //     datos => { this.getPromociones() }
    //   )
    //   //console.log('a')
    // }
  }
}




