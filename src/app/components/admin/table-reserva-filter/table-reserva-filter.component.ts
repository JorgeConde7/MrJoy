import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { ModaReservaEventService } from 'src/app/core/events/moda-reserva-event.service';
import { IReserva } from '../../cliente/calendario-reserva/reserva';

@Component({
  selector: 'app-table-reserva-filter',
  templateUrl: './table-reserva-filter.component.html',
  styleUrls: ['./table-reserva-filter.component.scss'],
})
export class TableReservaFilterComponent implements OnInit {
  formFilter: FormGroup;
  reservasFiltered: IReserva[] = []

  constructor(
    private reseraService: ReservaServiceService,
    private formBuilder: FormBuilder,
    private modaReservaEventService: ModaReservaEventService
  ) {
    this.formFilter = this.getFormFilterBuilder();
  }

  ngOnInit(): void {}

  onSubmitFilter() {
    const formFilter = this.formFilter.value;

    if (this.formFilter.invalid) return;

    const valor = formFilter.valor.trim();
    const campo = formFilter.campo;
    const isEmptyValor = valor === '';
    if (isEmptyValor) return;

    this.reseraService
      .findReservasByNombreOrApellidoOrDni(campo, valor)
      .subscribe((reservasResponse) => {
        this.reservasFiltered = reservasResponse;
      });
  }
  btnEditreserva(reserva:IReserva){
    console.log({reserva});

    this.modaReservaEventService.reserva$.emit(reserva)
  }
  getFormFilterBuilder() {
    return this.formBuilder.group({
      campo: ['dni', [Validators.required]],
      valor: ['77215670', [Validators.required]],
    });
  }
}
