import { Component, OnInit } from '@angular/core';
import { Login} from './login-modal';
import { LoginModalService } from './login-modal.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  logins:Login={
    "id":1,
    "contraseña":"",
    "usuario":""
  }

  constructor(private loginservice:LoginModalService) { }

  


  ngOnInit(): void {

    this.loginservice.getLogin("asd").subscribe(logins=>{
      this.logins.id=logins.id;
      this.logins.usuario=logins.usuario;
      this.logins.contraseña=logins.contraseña;
      console.log(logins);
    });
    

  }

}
