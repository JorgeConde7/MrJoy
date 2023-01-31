import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TipoEntrada } from '../../models/client/compra-entradas';
const URL = `${environment.URL_BASE}/apitipoentrada`;

@Injectable({
  providedIn: 'root'
})
export class CompraEntradasService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getEntradas() : Observable<TipoEntrada[]>
  {
    return this.http.get<any>(URL+'/tipoentrada');
  }

  // postEntradas(): Observable<TipoEntrada>

}
