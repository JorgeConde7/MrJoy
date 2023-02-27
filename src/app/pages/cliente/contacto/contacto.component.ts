import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/core/apis/client/contacto.service';
import { Contacto } from 'src/app/core/models/client/contacto';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  nombres!: string;
  correo!: string;
  telefono!: string;
  asunto!: string;
  estado!: string;
  descripcion!: string;
  fechaRegistro: Date = new Date();

  constructor(
    private contactoService: ContactoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const contacto = new Contacto(this.nombres, this.correo, this.telefono, this.asunto, this.estado, this.descripcion, this.fechaRegistro);
    this.contactoService.create(contacto).subscribe(
      data => {
        this.router.navigate([""])
      }
    )
  }

}
