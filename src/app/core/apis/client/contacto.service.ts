import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contacto } from '../../models/client/contacto';
import { Observable } from 'rxjs';
const URL = `${environment.URL_BASE}/api`;

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  create(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(URL + "/contactos", contacto)
  }
}
