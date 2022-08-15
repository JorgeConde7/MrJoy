import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cliente } from './perfil';
const URL = `${environment.URL_BASE}/api/clientes`;
@Injectable({
  providedIn: 'root'
})
export  class ClienteService{
  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }
   
  //Observable: Convertir el flujo de InformaciÃ³n a partir de Los objetos: CLIENTES
  getCliente(): Observable<Cliente[]>{
      return this.http.get<Cliente[]>(URL);
    }

  traerCliente(id:number): Observable<Cliente>{
      return this.http.get<Cliente>(URL+'byidlogin/'+id);
    }

}