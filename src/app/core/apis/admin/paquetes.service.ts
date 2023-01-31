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

  private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }
  getPromocion(): Observable<Paquete[]>{
    return this.http.get<Paquete[]>(URL);
  }
}

