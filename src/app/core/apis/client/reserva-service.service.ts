import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, IReserva } from '../../../components/cliente/calendario-reserva/reserva';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService
{

  private urlApi : string = `${environment.URL_BASE}/apireserva/`;

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

  getReservasPorIdLogin(idLogin: number): Observable<IReserva[]> {
    return this.http.get<IReserva[]>(this.urlApi + 'reservas-idLogin/'+idLogin);
  }

  getReservasPorIdReserva(idReserva: number): Observable<IReserva> {
    return this.http.get<IReserva>(this.urlApi + 'reservas/'+ idReserva);
  }

  putReserva(reserva: IReserva, idReserva: number):Observable<IReserva> {
    return this.http.put<IReserva>(this.urlApi + 'reservas/'+idReserva, reserva);
  }


}
