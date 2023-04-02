import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../../../components/login-modal/login-modal/login-modal'
import { DataResponse } from '../../models/response/response.response';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  private urlEndPoint: string = `${environment.URL_BASE}/apilogin/login`

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getLogin(login: Login) {
    return this.http.get<DataResponse<string>>(this.urlEndPoint + "/" + login.usuario + "/" + login.contrasenia + "/0");
  }


}
