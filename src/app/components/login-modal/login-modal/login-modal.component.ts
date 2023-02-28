import { Component, OnInit } from '@angular/core';
import { Login } from './login-modal';
import { LoginModalService } from '../../../core/apis/client/login-modal.service';
import { setToken } from 'src/app/util/token.util';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  login: Login = {
    "contrasenia": "",
    "usuario": "",
    "tipouser": ""
  }

  hasBadCredentials: boolean = false;

  constructor(private loginservice: LoginModalService) { /*this.obtener_localstore()*/ }


  accesoLogin() {
    console.log("asdasd");

    this.loginservice.getLogin(this.login).subscribe({
      next: (response) => {
        console.log(response);

        const isEmptyToken = response.data === null
        if (isEmptyToken) {
          this.hasBadCredentials = true
          this.login.contrasenia = "";
          this.login.usuario = "";
          return;
        }
        const { data: token } = response;
        setToken(token);
        window.location.href = "/"
        //this.router.navigate(['/cliente/index'])
      },
      error: (err) => {
        console.log(err);
        this.hasBadCredentials = true
      }
    });

  }

  ngOnInit(): void {

  }

}
