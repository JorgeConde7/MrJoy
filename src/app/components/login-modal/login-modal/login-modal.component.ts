import { Component, OnInit } from '@angular/core';
import { Login } from './login-modal';
import { LoginModalService } from '../../../core/apis/client/login-modal.service';
import { setToken } from 'src/app/util/token.util';
import { alertNotification } from 'src/app/util/notifications';

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

  constructor(private loginservice: LoginModalService) { }

  ngOnInit(): void {

  }
  
  accesoLogin() {
    this.loginservice.getLogin(this.login).subscribe({
      next: (response) => {
        const isEmptyToken = response.data === null
        if (isEmptyToken) {
          this.hasBadCredentials = true
          //alertNotification('malas credenciales', '', "error")
          this.login.contrasenia = "";
          this.login.usuario = "";
          return;
        }
        const { data: token } = response;
        setToken(token);
        window.location.reload()
      },
      error: (err) => {
        alertNotification(err.error.message, '', "error")
        this.hasBadCredentials = true
      }
    });
  }

}
