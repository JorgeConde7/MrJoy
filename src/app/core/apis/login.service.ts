import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/response/login.response';
import { DataResponse } from '../models/response/response.response';

const URL = `${environment.URL_BASE}/apilogin/login`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    return this.http.get<DataResponse<string>>(URL + `/${user}/${password}/1`)
  }

}
