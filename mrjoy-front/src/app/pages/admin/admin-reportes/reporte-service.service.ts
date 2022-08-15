import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ReporteServiceService {

  constructor(private  _http:HttpClient) { }

  daysWeather() {
    const urlAPI =
      "https://rickandmortyapi.com/api/character/1";
    return this._http.get(urlAPI).pipe(map(res => res));
  }
}
