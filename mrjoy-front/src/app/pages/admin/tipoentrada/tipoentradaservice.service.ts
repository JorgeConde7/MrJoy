import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipoentrada } from './tipoentrada';

@Injectable({
  providedIn: 'root'
})
export class TipoentradaserviceService {

  //tipoentrada:Tipoentrada[]=[];

  private urlEndPoint:string="http://localhost:8090/apilogin/login";

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http:HttpClient) { }

  getentradas():Observable<Tipoentrada[]>{
    return this.http.get<Tipoentrada[]>(this.urlEndPoint);
  }

  getentradaporid(id:number):Observable<Tipoentrada>{
    return this.http.get<Tipoentrada>(this.urlEndPoint+"/"+id);
  }

  crearentradas(body:any):Observable<Tipoentrada>{
    return this.http.post<Tipoentrada>(this.urlEndPoint,body)
  }

  actualizarentradas(id:number,body:any):Observable<Tipoentrada>{
    return this.http.put<Tipoentrada>(this.urlEndPoint+"/"+id,body)
  }
  eliminarentradas(id:number):Observable<Tipoentrada>{
    return this.http.delete<Tipoentrada>(this.urlEndPoint+"/"+id);
  }

}
