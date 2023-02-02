import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/apis/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formLogin: FormGroup
  hasLoginError = false

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formLogin = this.loginFormBuilder()
    this.values$()
  }

  loginFormBuilder() {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  values$() {
    this.formLogin.controls['username'].valueChanges.subscribe(v => {
      console.log("valuer: " + v);

    })
    this.formLogin.invalid
  }

  onSubmit() {
    console.log(this.formLogin.value);
    if (this.formLogin.invalid) return;
    const { username, password } = this.formLogin.value

    this.loginService.login(username, password).subscribe(loginResponse => {
      console.log(loginResponse);
      const isEmptyUser = loginResponse.idLogin == null

      if (isEmptyUser) {
        this.hasLoginError = true
        return
      }

      this.router.navigate(['admin'])

    })


  }


}
