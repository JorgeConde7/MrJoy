import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReserva } from '../../../components/cliente/calendario-reserva/reserva';
import { environment } from 'src/environments/environment';
import { DataResponse } from '../../models/response/response.response';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService
{

  private urlApi : string = `${environment.URL_BASE}/apireserva`;

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http:HttpClient) { }

  getReserva(fecha : string) : Observable<IReserva[]>
  {
    return this.http.get<IReserva[]>(this.urlApi + '/reservas-fecha/'+ fecha);
  }

  CrearReserva(reserva: IReserva) : Observable<IReserva>
  {
    return this.http.post<IReserva>(this.urlApi + '/reservas', reserva);
  }

  getReservasPorIdLogin(idLogin: number): Observable<IReserva[]> {
    return this.http.get<IReserva[]>(this.urlApi + '/reservas-idLogin/'+idLogin);
  }

  getReservaPorIdReserva(idReserva: number): Observable<IReserva> {
    return this.http.get<IReserva>(this.urlApi + '/reservas/'+ idReserva);
  }

  putReserva(reserva: IReserva, idReserva: number) {
    return this.http.put<DataResponse<any>>(this.urlApi + '/reservas/'+idReserva, reserva);
  }

  findReservasByNombreOrApellidoOrDni(campo:string, valor: string){
    return this.http.get<IReserva[]>(`${this.urlApi}/buscar?campo=${campo}&valor=${valor}`)
  }

  eliminarReserva(reserva: IReserva, idReserva: number) {
    return this.http.post<IReserva>(this.urlApi + '/anularReserva/'+ idReserva, reserva);
  }

}
