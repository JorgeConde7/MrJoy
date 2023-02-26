import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { VentasPaquete,Info } from '../../models/admin/data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class ReporteServiceService {

  private urlEndPoint:string=`${environment.URL_BASE}/apireserva/totalPaquetes`;

  constructor(private http:HttpClient) { }

    getListar():Observable<VentasPaquete[]>{
      return this.http.get<VentasPaquete[]>(this.urlEndPoint);
  }

  getListarInfo():Observable<Info[]>{
    return this.http.get<Info[]>(`${environment.URL_BASE}/data/datosEmpresa`)
  }
}
