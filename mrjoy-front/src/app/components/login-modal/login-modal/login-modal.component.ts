import { Component, OnInit } from '@angular/core';
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

  constructor(private loginservice:LoginModalService) { /*this.obtener_localstore()*/ }

  
  accesoLogin(){
    this.loginservice.getLogin(this.login).subscribe(usuario=>{
      if (usuario==null){
      this.validacion=true
      this.login.contrasenia="";
      this.login.usuario="";
      }
      else{
        this.validacion=false
        if (usuario.tipouser?.toLowerCase()=="empleado"){
          //console.log(typeof(usuario))
          this.grabar_localstore(usuario)
          window.location.href="admin/empleados"
          //this.router.navigate(['/admin/empleados'])
          
        }
        else if(usuario.tipouser?.toLowerCase()=="cliente"){
          //console.log(typeof(usuario))
          this.grabar_localstore(usuario)
          window.location.href="cliente/index"
          //this.router.navigate(['/cliente/index'])
        }
      }

      console.log(usuario);
      console.log('aea')

      
    });
    
  }

  /*obtener_localstore()
  {
    console.log(localStorage.getItem("datos"))
    console.log('xd')
  }*/

  grabar_localstore(objeto : any)
  {
    if (objeto)
    localStorage.setItem("datos", JSON.stringify( objeto ))
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
