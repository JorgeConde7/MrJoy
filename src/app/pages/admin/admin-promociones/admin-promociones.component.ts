import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getPayloadEmpleado } from 'src/app/util/token.util';
import { PromocionService } from 'src/app/core/apis/client/promociones.service';
import { Promocion } from 'src/app/core/models/client/Promociones';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  alertConfirmation,
  alertNotification,
} from 'src/app/util/notifications';

@Component({
  selector: 'app-admin-promociones',
  templateUrl: './admin-promociones.component.html',
  styleUrls: ['./admin-promociones.component.scss'],
})
export class AdminPromocionesComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>();
  promociones: Promocion[] = [];
  isInsert = true;
  formPromocion: FormGroup;
  sesionData = { isAdmin: false };
  imgDefault =
    'https://www.viewhotels.jp/ryogoku/wp-content/uploads/sites/9/2020/03/test-img.jpg';

  constructor(
    private promocionService: PromocionService,
    private formBuilder: FormBuilder
  ) {
    this.formPromocion = this.getFormPromocionBulder();
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength: 10,
    };

    this.promocionService.getPromociones().subscribe((result) => {
      console.log(result);
      this.promociones = result;
      this.dtTrigger.next(this.dtOptions);
    });

    this.setSesionData();
  }

  getFormPromocionBulder() {
    return this.formBuilder.group({
      id_promociones: [null],
      titulo: ['', Validators.required],
      foto: [this.imgDefault],
      descripcion: ['', Validators.required],
    });
  }

  setSesionData() {
    const sesionData = getPayloadEmpleado()!;
    this.sesionData.isAdmin = sesionData.profile === 'admin';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getPromociones() {
    this.promocionService.getPromociones().subscribe((result) => {
      this.promociones = result.sort(this.sortPromocionesByid);
    });
  }

  sortPromocionesByid(a: Promocion, b: Promocion) {
    if (a.id_promociones! > b.id_promociones!) return 1;
    if (a.id_promociones! < b.id_promociones!) return -1;
    return 0;
  }

  async btnEliminar(promocion: Promocion) {
    const result = await alertConfirmation(`Eliminar '${promocion.titulo}'?`);

    if (!result.isConfirmed) return;

    this.promocionService
      .deletePromocion(promocion.id_promociones)
      .subscribe((_) => {
        this.getPromociones();
        alertNotification('', `Se eliminó ${promocion.titulo} con éxito`);
      });
  }

  btnEditar(promocion: Promocion) {
    this.isInsert = false;
    // const formPromocion = this.formPromocion.value as Promocion
    console.log({ promocion });

    this.formPromocion.setValue({
      id_promociones: promocion.id_promociones,
      titulo: promocion.titulo,
      descripcion: promocion.descripcion,
      foto: promocion.foto,
    });
  }

  btnNuevo() {
    this.isInsert = true;
    this.formPromocion.reset();
    this.formPromocion.markAsUntouched();
  }

  async onSubmit() {
    console.log('submit');

    if (this.formPromocion.invalid) {
      alertNotification('', 'Todos los campos son obligatorios', 'info');
      return;
    }
    const formPromocion = this.formPromocion.value as Promocion;
    formPromocion.foto = formPromocion.foto
      ? formPromocion.foto
      : this.imgDefault;

    const isInsert = !formPromocion.id_promociones;
    if (isInsert) {
      const result = await alertConfirmation(
        `Añadir promocion '${formPromocion.titulo}'?`
      );

      if (!result.isConfirmed) return;
      this.promocionService
        .savePromocion(formPromocion)
        .subscribe((promocionResponse) => {
          this.getPromociones();
          alertNotification(
            '',
            `Se creó nueva promoción ${promocionResponse.titulo}.`
          );
        });
    } else {
      const result = await alertConfirmation(
        `Actualizar '${formPromocion.titulo}'`
      );

      if (!result.isConfirmed) return;

      this.promocionService
        .updatePromocion(formPromocion)
        .subscribe((promocionResponse) => {
          this.getPromociones();
          alertNotification(
            '',
            `Se actualizó la promocion ${promocionResponse.titulo}.`
          );
        });
    }
  }
}
