import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IParques } from '../../models/client/parques';
const URL = `${environment.URL_BASE}/apiParques`;
@Injectable({
  providedIn: 'root'
})
export  class ParqueService{
  constructor(private http:HttpClient) { }

getParques(){
  return this.http.get<IParques[]>(`${URL}/parques`)
}

}
