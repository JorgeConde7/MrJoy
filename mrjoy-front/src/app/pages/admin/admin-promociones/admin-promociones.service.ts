import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Promociones } from './admin-promociones';
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

  create(promociones:Promociones):Observable<Promociones>{
    return this.http.post<Promociones>(URL,promociones,{headers:this.httpHeaders})
  }
  deletePromocion(id: number) {
    return this.http.delete<any>(URL + '/promociones/' + id);
  }

  actualizarPromocion(promociones: Promociones) {
    const id = promociones.id_promociones || '';
    return this.http.put<any>(URL + '/promociones/' + id, promociones);
  }
}
