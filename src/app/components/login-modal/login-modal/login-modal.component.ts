import { Component, OnInit } from '@angular/core';
import { Login } from './login-modal';
import { LoginModalService } from '../../../core/apis/client/login-modal.service';
import { setToken } from 'src/app/util/token.util';
import { alertNotification } from 'src/app/util/notifications';
import Swal from 'sweetalert2';

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
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })        
        setTimeout(() => {
          window.location.reload();
        }, 1400);
      },
      error: (err) => {
        alertNotification(err.error.message, '', "error")
        this.hasBadCredentials = true
      }
    });
  }
  

}
