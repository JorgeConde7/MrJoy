import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharacterResponse } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  // 1. Inyectamos la dependencia de  httpClient(similar a fetch, ajax, axios, etc)
  constructor(private httpClient: HttpClient) { }

  // 2 Función para obtener un character por id
  obtenerPersonajeXId(character_id: string = "") {
    // URL_BASE del back "https://rickandmortyapi.com/api/"
    const URL = `${environment.API_URL_BASE}/character/${character_id}`;

    // 3 Devolvemos el obserbable (similar a las promesas que usa fetch, axios... pero mejor)
    // "CharacterResponse" es una interfaz que nos ayuda a saber que campos tiene la respuesta
    return this.httpClient.get<{ info: any, results: CharacterResponse[] }>(URL)
  }

  // Servicio para obtener data creado!.
  // AHora lo llamamos en nuestro componente.
  // Ir a pages/Home/home.component.ts para el ejemplo

}
