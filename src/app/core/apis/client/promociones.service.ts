import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Promocion } from '../../models/client/Promociones';

const URL = `${environment.URL_BASE}/apiPromociones`;

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  constructor(private http: HttpClient) { }

  getPromociones() {
    return this.http.get<Promocion[]>(`${URL}/promociones`)
  }

  savePromocion(promocion: Promocion) {
    return this.http.post<Promocion>(`${URL}/promociones`, promocion)
  }

  updatePromocion(promocion: Promocion) {
    return this.http.put<Promocion>(`${URL}/promociones/${promocion.id_promociones}`, promocion)
  }

  deletePromocion(id_promocion: number) {
    return this.http.delete<Promocion>(`${URL}/promociones/${id_promocion}`)
  }
}
