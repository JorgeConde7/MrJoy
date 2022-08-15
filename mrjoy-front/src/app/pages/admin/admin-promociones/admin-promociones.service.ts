import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Promociones, IPromociones } from './admin-promociones';
import { environment } from 'src/environments/environment';
const URL = `${environment.URL_BASE}/api/promociones`;
@Injectable({
  providedIn: 'root'
})
export class AdminPromocionesService {

  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }
  getPromocion(): Observable<Promociones[]>{
    return this.http.get<Promociones[]>(URL);
  }

  create(ipromociones:IPromociones):Observable<IPromociones>{
    return this.http.post<IPromociones>(URL,ipromociones,{headers:this.httpHeaders})
  }

  deletePromocion(id: number) {
    return this.http.delete<any>(URL + `/${id}`);
  }

  actualizarPromocion(ipromociones: IPromociones, id : any) {
    //console.log(ipromociones)
    //const id = ipromociones.id_promociones;
    return this.http.put<any>(URL + '/' + id, ipromociones);
  }
}
