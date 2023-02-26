import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getPayload } from 'src/app/util/token.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombre: any = 'Ingresar';
  datosCompletos: any;

  constructor(private router: Router) { this.obtener_localstore() }

  ngOnInit(): void {
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  obtener_localstore() {
    // console.log('abriendo ga')
    // let nombrelocal = localStorage.getItem("datos");
    const payload = getPayload()
    console.log("payload ");
    console.log(payload);

    if (payload) {
      //console.log(JSON.parse(nombrelocal))
      const { username, profile, id, create_at } = payload
      //console.log(objeto.usuario)
      this.nombre = username;
      this.datosCompletos = create_at;
      //console.log(this.datosCompletos.usuario)
      //this.nombre = JSON.parse(nombrelocal);
    }
  }

  siono: any;

  cambioSelect() {
    localStorage.clear();
    window.location.href = '/cliente/index'
  }

  nombreClick() {
    console.log('eeeh')
    const select = (<HTMLInputElement>document.getElementById('selectuser'))
    select.onclick

  }

}
