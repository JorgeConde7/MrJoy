import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarjeta } from '../../../components/cliente/modal-pago/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class ModalPagoService
{
  private urlEndPoint:string="http://localhost:8090/apitarjeta"

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});
  tarjeta : Tarjeta = new Tarjeta();

  constructor(private http:HttpClient)
  {

  }

  getTarjeta(num : String , mes : String, cod : String) : Observable<any>
  {
    return this.http.get<any>(this.urlEndPoint + `/${num}/${mes}/${cod}`);
  }

  putTarjeta(num : String, saldito : number) : Observable<any>
  {
    this.tarjeta.saldo = saldito;
    return this.http.put<any>(`${this.urlEndPoint}/guardartarjeta/${num}`, this.tarjeta, {headers: this.httpHeaders})
  }
}
