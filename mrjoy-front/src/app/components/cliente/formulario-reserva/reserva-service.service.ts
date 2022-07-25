import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService 
{
  private urlApi : string = "http://localhost:8090/apireserva/reservas-fecha/";

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http:HttpClient) { }

  getReserva(buscar : any) : Observable<reserva[]>
  {
    return this.http.get<reserva[]>(this.urlApi + buscar);
  }
}
