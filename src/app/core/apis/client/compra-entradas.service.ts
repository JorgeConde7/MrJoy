import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoEntrada } from '../../models/client/compra-entradas';
import { Boleta } from '../../models/client/boleta';
const URL = `${environment.URL_BASE}/apitipoentrada`;
const URL_BOLETA = `${environment.URL_BASE}/apiBoleta`;

@Injectable({
  providedIn: 'root'
})
export class CompraEntradasService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getEntradas(): Observable<TipoEntrada[]> {
    return this.http.get<any>(URL + '/tipoentrada');
  }

  saveTicket(boleta: Boleta) {
    return this.http.post<{ Mensaje: string }>(`${URL_BOLETA}/guardar`, boleta)
  }

}
