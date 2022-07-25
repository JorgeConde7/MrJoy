import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login} from './login-modal'

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private urlEndPoint:string="http://localhost:8090/apilogin/login"

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) {}

    getLogin(user:string):Observable<Login>{
      return this.http.get<Login>(this.urlEndPoint+"/"+user);
    }

   
}
