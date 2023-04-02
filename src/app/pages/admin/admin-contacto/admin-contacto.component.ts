import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactoService } from '../../../core/apis/admin/admin-contacto.service';
import { Contacto } from 'src/app/core/models/admin/admin-contacto';
import { getPayloadEmpleado } from 'src/app/util/token.util';
import {
  alertConfirmation,
  alertNotification,
} from 'src/app/util/notifications';

@Component({
  selector: 'app-admin-contacto',
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.scss'],
})
export class AdminContactoComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  data: Contacto[] = [];
  contactoSelected: Contacto = {} as Contacto;
  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10,
    };
    this.setdataList();
  }

  setdataList() {
    this.contactoService.getContacto().subscribe((result) => {
      result = result.sort(this.sortByEstado);
      this.data = result;
      this.dtTrigger.next(this.dtOptions);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  eliminarContacto(id: number) {
    this.contactoService.deleteContacto(id).subscribe(() => {});
  }

  selectContact(contacto: Contacto) {
    console.log({ contacto });
    this.contactoSelected = contacto;
  }

  async onSubmitModal() {
    const { respuestaAtencion } = this.contactoSelected;

    if (!respuestaAtencion?.trim()) {
      alertNotification('', 'Ingrese su respuesta', 'info');
      return;
    }

    const resul = await alertConfirmation();
    if (!resul.isConfirmed) return;

    const { id: idEmpleado } = getPayloadEmpleado()!;
    this.contactoSelected.idLogin = idEmpleado;
    this.contactoService.actualizarContacto(this.contactoSelected).subscribe({
      next: this.onSubmitModalSucess.bind(this),
      error: this.onSubmitModalError.bind(this),
    });
  }

  onSubmitModalSucess() {
    this.setdataList();
  }

  onSubmitModalError(err: any) {
    alertNotification('', err.error.message, 'info');
  }

  sortByEstado(a: Contacto, b: Contacto) {
    if (a.estado < b.estado) {
      return -1;
    }
    if (a.estado > b.estado) {
      return 1;
    }
    return 0;
  }
}
