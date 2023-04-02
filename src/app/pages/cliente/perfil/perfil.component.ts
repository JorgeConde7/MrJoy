import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteService } from '../../../core/apis/client/perfil.service';
import { ICliente } from '../../../core/models/client/perfil';
import { getPayload } from 'src/app/util/token.util';

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
  id!: number;

  icliente!: ICliente
  /*={
    id_cliente:0,
    nombres:'',
    idLogin: 1,
    apePaterno:'',
    apeMaterno:'',
    telefono: '',
    correo:'',
    dni:'',
    genero:'',
    direccion:'',
    fechaNacimiento:'',
    rutaImg:''
  }*/

  constructor(private clienteService:ClienteService) {  } //this.obtener_localstore()

  ngOnInit(): void {
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      // pagingType: "full_numbers"
      pageLength:10
    };

    const payLoad = getPayload()
    this.id = payLoad?.id ? payLoad.id : 0;

    this.clienteService.traerCliente(this.id).subscribe(
      data => {
        this.icliente = data;
        console.log(this.icliente)
      }
    )
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  

  /*obtener_localstore()
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
  }*/

}
