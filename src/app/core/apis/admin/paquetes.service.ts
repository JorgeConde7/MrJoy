import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
const URL = `${environment.URL_BASE}/apireserva/paquetes`;
@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(private http:HttpClient) { }
  getPaquetes(): Observable<Paquete[]>{
    return this.http.get<Paquete[]>(URL);
  }
}

