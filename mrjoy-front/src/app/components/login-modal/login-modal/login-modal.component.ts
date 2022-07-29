import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RoutesRecognized } from '@angular/router';
import { Login} from './login-modal';
import { LoginModalService } from './login-modal.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  login:Login={
    "contrasenia":"",
    "usuario":"",
    "tipouser":""
  }

  validacion:boolean=false;

  constructor(private loginservice:LoginModalService) { }

  
  accesoLogin(){
    this.loginservice.getLogin(this.login).subscribe(usuario=>{
      if (usuario==null){
      this.validacion=true
      this.login.contrasenia="";
      this.login.usuario="";
      }
      else{
        this.validacion=false
        if (usuario.tipouser=="Empleado"){
          console.log(typeof(usuario.tipouser))
          window.location.href="admin/empleados"
          
        }
      }

      console.log(usuario);

      
    });
    
  }

  ngOnInit(): void {

    // this.loginservice.getLogin("asd").subscribe(logins=>{
    //   this.login.id=logins.id;
    //   this.login.usuario=logins.usuario;
    //   this.login.contrasenia=logins.contrasenia;
      // console.log(logins);
    // });
    

  }

}