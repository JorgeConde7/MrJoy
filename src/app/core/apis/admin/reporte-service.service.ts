import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { VentasPaquete,Info } from '../../models/admin/data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class ReporteServiceService {

  constructor(private http:HttpClient) { }

  getListarInfo():Observable<Info[]>{
    return this.http.get<Info[]>(`${environment.URL_BASE}/data/datosEmpresa`)
  }
}
