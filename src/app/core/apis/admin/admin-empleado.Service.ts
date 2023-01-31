import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado, IEmpleado } from '../../models/admin/admin-empleado';
import { environment } from 'src/environments/environment';
const URL = `${environment.URL_BASE}/api`;

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}


  getEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(URL + '/empleados');
  }

  create(empleado: IEmpleado): Observable<IEmpleado> {
    return this.http.post<IEmpleado>(URL + '/guardarEmpleado', empleado, {

    });
  }

  deleteEmpleado(id: number) {
    return this.http.delete<any>(URL + '/empleados/' + id);
  }

  actualizarEmpleado(empleado: IEmpleado) {
    const id = empleado.id_empleados || '';
    return this.http.put<any>(URL + '/empleados/' + id, empleado);
  }
}
