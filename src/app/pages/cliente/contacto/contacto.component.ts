import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/core/apis/client/contacto.service';
import { Contacto } from 'src/app/core/models/client/contacto';
import { alertNotification } from 'src/app/util/notifications';
import { getPayload } from 'src/app/util/token.util';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  nombres!: string;
  correo!: string;
  telefono!: string;
  asunto!: string;
  estado!: string;
  descripcion!: string;
  fechaRegistro: Date = new Date();
  respuestaAtencion!: string;
  idLogin!: number;

  constructor(
    private contactoService: ContactoService,
    private router: Router
  ) {
    this.setDefaultValues();
  }

  ngOnInit(): void {}

  setDefaultValues() {
    const payLoad = getPayload();
    this.nombres = payLoad?.nombres ? payLoad.nombres : '';
    this.correo = payLoad?.correo ? payLoad.correo : '';
    this.telefono = payLoad?.telefono ? payLoad.telefono : '';
    this.idLogin = Number(payLoad?.id ? payLoad.id : '');
  }

  onCreate(): void {
    const contacto = new Contacto(
      this.nombres,
      this.correo,
      this.telefono,
      this.asunto,
      this.estado,
      this.descripcion,
      this.fechaRegistro,
      this.idLogin
    );

    this.contactoService.create(contacto).subscribe((_) => {
      alertNotification('', 'Consulta enviada', 'success');
      this.cleanForm();
    });
  }

  cleanForm() {
    this.asunto = '';
    this.descripcion = '';
  }
}
