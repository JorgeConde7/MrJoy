import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { VentasPaquete,Info } from '../../../core/models/admin/data';
import { Observable } from 'rxjs';


//import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class ReporteServiceService {

  private urlEndPoint:string="http://localhost:8090/apireserva/totalPaquetes"

  constructor(private http:HttpClient) { }

    getListar():Observable<VentasPaquete[]>{



      return this.http.get<VentasPaquete[]>(this.urlEndPoint);


  }

  getListarInfo():Observable<Info[]>{
    return this.http.get<Info[]>("http://localhost:8090/data/datosEmpresa")
  }
}
