import { EventEmitter, Injectable } from '@angular/core';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ModaReservaEventService {
    reserva$ = new EventEmitter<IReserva>()
  constructor() { }
}
