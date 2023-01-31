import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/core/apis/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // 1 Inyectamos nuestro servicio
  constructor(private getDataService: GetDataService) { }

  ngOnInit(): void {
    // 5 Llamar a la funcion. https://i.pinimg.com/736x/7c/a9/3e/7ca93e7121049b69af926a05c1d9c0e8.jpg
    this.buscarCharacterXId();
  }

  // 2 Creamos nuestra función para buscar personaje por id
  buscarCharacterXId() {
    /*const personaje_id = "32";
    // 3 usamos nuestro servicio creado y buscamos por un id
    this.getDataService.obtenerPersonajeXId(personaje_id)
      // 4 Nos suscribimos para obtener los datos de la respuesta
      .subscribe(personajeResponse => {
        // Y hacemos lo que queremos con nuestra respuesta
        console.log("Data: ", personajeResponse);
      })*/
  }

}
