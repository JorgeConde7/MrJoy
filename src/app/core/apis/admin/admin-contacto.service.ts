import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contacto } from '../../models/admin/admin-contacto';
import { environment } from 'src/environments/environment';

const URL = `${environment.URL_BASE}/api/contactos`;
@Injectable({
    providedIn: 'root'
  })
export  class ContactoService{
    private httpHeaders =new HttpHeaders({'Content-Type':'application/json'})
    constructor(private http:HttpClient) { }

    //Observable: Convertir el flujo de InformaciÃ³n a partir de Los objetos: CLIENTES
    getContacto(): Observable<Contacto[]>{
        return this.http.get<Contacto[]>(URL);
      }

      create(contacto:Contacto):Observable<Contacto>{
        return this.http.post<Contacto>(URL,contacto,{headers:this.httpHeaders})
      }

      deleteContacto(id: number) {
        return this.http.delete<any>(URL + '/' + id);
      }

      actualizarContacto(contacto: Contacto) {
        const id = contacto.idContacto || '';
        return this.http.put<any>(URL + '/contactos/' + id,contacto);
      }
    }

