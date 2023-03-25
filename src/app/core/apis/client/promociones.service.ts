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
}
