import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado, IEmpleado } from './admin-empleado';
import { environment } from 'src/environments/environment';
const URL = `${environment.URL_BASE}/api/guardarEmpleado`;
const obtEmpleado = `${environment.URL_BASE}/api/empleados`;
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }


  //Observable: Convertir el flujo de InformaciÃ³n a partir de Los objetos: CLIENTES
  getEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(obtEmpleado);
  }

  create(empleado: IEmpleado): Observable<IEmpleado> {
    const URL = `${environment.URL_BASE}/api/guardarEmpleado`;

    return this.http.post<IEmpleado>(URL, empleado, { headers: this.httpHeaders })
  }

}