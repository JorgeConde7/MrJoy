import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, IReserva } from '../../../components/cliente/calendario-reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService
{
  private urlApi : string = "http://localhost:8090/apireserva/";

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http:HttpClient) { }

  getReserva(fecha : any) : Observable<Reserva[]>
  {
    return this.http.get<Reserva[]>(this.urlApi + 'reservas-fecha/'+ fecha);
  }

  CrearReserva(reserva: IReserva) : Observable<IReserva>
  {
    return this.http.post<IReserva>(this.urlApi + 'reservas', reserva);
  }
}
