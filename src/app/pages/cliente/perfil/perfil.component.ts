import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { GetDataService } from 'src/app/core/apis/get-data.service';
import { CharacterResponse } from 'src/app/core/models/character.model';
import { environment } from 'src/environments/environment';
import { ClienteService } from './perfil.service';
import { Cliente,ICliente } from './perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nombre : any = '';
  datosCompletos : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()
  data: any

  constructor(private clienteService:ClienteService) { this.obtener_localstore() }

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  icliente:ICliente={

    id_cliente:0,
    nombres:'',
  
    apePaterno:'',
    apeMaterno:'',
    telefono: '',
    correo:'',
    dni:'',
    genero:'',
    direccion:'',
    fechaNacimiento:'',
    rutaImg:'' 
  }

  obtener_localstore()
  {
    //console.log('abriendo ga')
    let nombrelocal = localStorage.getItem("datos");
    if (nombrelocal != null)
    {
      //console.log(JSON.parse(nombrelocal))
      let objeto = JSON.parse(nombrelocal)
      //console.log(objeto.usuario)
      this.nombre = objeto.usuario;
      this.datosCompletos = objeto;
      //console.log(this.datosCompletos.usuario)
      //this.nombre = JSON.parse(nombrelocal);
      this.clienteService.traerCliente(objeto.idLogin).subscribe(nomequiere=> 
        {
          console.log(nomequiere);
          this.icliente=nomequiere;
        
          console.log(this.icliente);
        })
    }
  }
 
}
