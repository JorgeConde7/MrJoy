import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente, ICliente } from '../../models/client/perfil';
const URL = `${environment.URL_BASE}/api/clientes`;
@Injectable({
  providedIn: 'root'
})
export  class ClienteService{
  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  getCliente(): Observable<Cliente[]>{
      return this.http.get<Cliente[]>(URL);
    }

  traerCliente(id:number): Observable<ICliente>{
      return this.http.get<ICliente>(URL+"/"+id);
    }

}
