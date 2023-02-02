import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/response/login.response';

const URL = `${environment.URL_BASE}/apilogin`;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    return this.http.get<LoginResponse>(URL + `/${user}/${password}`)
  }

}
