import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRegistro } from '../../models/client/registro';
import { environment } from 'src/environments/environment';
const URL = `${environment.URL_BASE}/api`;
@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}
  registroUsuario(registro: IRegistro): Observable<IRegistro> {
    return this.http.post<IRegistro>(URL + '/guardarCliente', registro, {

    });
  }
}
