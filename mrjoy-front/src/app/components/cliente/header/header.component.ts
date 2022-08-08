import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombre : any = 'Ingresar';
  datosCompletos : any;

  constructor(private router: Router) { this.obtener_localstore() }

  ngOnInit(): void {
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  obtener_localstore()
  {
    console.log('abriendo ga')
    let nombrelocal = localStorage.getItem("datos");
    if (nombrelocal != null)
    {
      console.log(JSON.parse(nombrelocal))
      let objeto = JSON.parse(nombrelocal)
      console.log(objeto.usuario)
      this.nombre = objeto.usuario
      this.datosCompletos = objeto;
      console.log(this.datosCompletos.usuario)
      //this.nombre = JSON.parse(nombrelocal);
    }
  }

  siono: any;

  cambioSelect()
  {
    localStorage.clear();
    window.location.href='/cliente/index'
  }

  nombreClick()
  {
    console.log('eeeh')
    const select = (<HTMLInputElement>document.getElementById('selectuser'))
    select.onclick
    
  }

}
