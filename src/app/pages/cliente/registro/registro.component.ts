import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IRegistro } from '../../../core/models/client/registro';
import { RegistroService } from '../../../core/apis/client/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as regex from 'src/app/util/regex.util';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  generos: string[] = ["Masculino", "Femenino", "No Binario"];
  distritos: string[] = ["Ate", "Barranco", "Breña", "Carabayllo", "Cercado de Lima",
    "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independecia", "Jesus Maria", "La Molina", "La Victoria"];


  formRegisterClient: FormGroup

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formRegisterClient = this.createUserBuilder()
  }

  ngOnInit(): void {
  }


  createUserBuilder() {
    return this.formBuilder.group({
      nombres: [null, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      apePaterno: [null, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      apeMaterno: [null, [Validators.required, Validators.pattern(regex.JUST_LETTERS_WITH_SPACES)]],
      dni: [null, [Validators.required, Validators.pattern(regex.DNI)]],
      telefono: [null, [Validators.required, Validators.pattern(regex.PHONE)]],
      direccion: ["Ate", [Validators.required, Validators.maxLength(30)]],
      genero: ["Masculino", [Validators.required, Validators.pattern(regex.GENDERS)]],
      fechaNacimiento: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      usuario: [null, [Validators.required, Validators.pattern(regex.USERNAME)]],
      password: [null, [Validators.required, Validators.pattern(regex.PASSWORD)]],
      passwordConfirm: [null, [Validators.required, Validators.pattern(regex.PASSWORD)]],
      termsAndConditions: [false, [Validators.requiredTrue]]
    },
      {
        validators: this.ConfirmedValidator('password', 'passwordConfirm'),
      })
  }

  registroUsuario() {
    const tipouser = 'cliente';
    const formRegister = this.formRegisterClient.value
    const dataRegistro: IRegistro = { ...formRegister, tipouser, contrasenia: formRegister.password, correo: formRegister.email }
    console.log(dataRegistro);

    this.registroService.registroUsuario(dataRegistro).subscribe({
      next: this.createEmpleadoNext.bind(this),
      error: (err) => console.log('Error al crear registro: ', err),
    });
  }

  protected createEmpleadoNext(registro: IRegistro) {
    console.log('Empleado creado: ', registro);
    this.router.navigate(['/'])
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors["passwordConfirm"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  inputValidation(formControlname?: string) {
    return (this.formRegisterClient.controls[formControlname!].errors &&
      this.formRegisterClient.controls[formControlname!].touched &&
      this.formRegisterClient.controls[formControlname!].dirty) || false
  }

}
