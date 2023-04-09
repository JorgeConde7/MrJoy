import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { VentasPaquete } from '../../models/admin/data';
const URL = `${environment.URL_BASE}/apipaquetes`;

@Injectable({
  providedIn: 'root',
})
export class PaquetesService {
  constructor(private http: HttpClient) {}
  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(`${URL}/paquetes`);
  }

  getTotalPaquetes(): Observable<VentasPaquete[]> {
    return this.http.get<VentasPaquete[]>(`${URL}/totalPaquetes`);
  }

  savePaquete(paquete: Paquete) {
    return this.http.post<Paquete>(`${URL}/paquetes`, paquete);
  }

  updatePaquete(paquete: Paquete) {
    return this.http.put<Paquete>(`${URL}/paquetes/${paquete.idPaquete}`, paquete);
  }
  deletePaquete(idPaquete: number) {
    return this.http.delete<Paquete>(`${URL}/${idPaquete}`);
  }
}
