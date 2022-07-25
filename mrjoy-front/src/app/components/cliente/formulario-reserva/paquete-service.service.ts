import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Paquete } from './Paquete';

@Injectable({
  providedIn: 'root'
})
export class PaqueteServiceService {

  private urlAPI : string = "http://localhost:8080/apireserva/paquetes";

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'})



  constructor(private http:HttpClient) 
  { 
      
  }

  getPaquete() : Observable<Paquete[]>
  {
    return this.http.get<Paquete[]>(this.urlAPI);
  }

  create(paquete:Paquete) : Observable<Paquete>
  {
    return this.http.post<Paquete>(this.urlAPI, paquete, {headers : this.httpHeaders});
  }
}
