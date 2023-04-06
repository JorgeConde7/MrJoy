import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { alertNotification } from 'src/app/util/notifications';
import { getPayload } from 'src/app/util/token.util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()

  namePaquete: String = ""
  id!: number;

  paquetes: Paquete[] = []

  tablaReserva: TablaReserva[] = []
  private primeraVez = true;

  constructor(private reservaService: ReservaServiceService, private router: Router,
    private paqueteService: PaquetesService) {
  }

  ngOnInit(): void {
    
    this.paqueteService.getPaquetes().subscribe(
      paquetes => {
        this.paquetes = paquetes;
    });
    
    this.dtOptions = {
      language: { url: environment.DATATABLE_LANGUAJE },
      pagingType: 'full_numbers',
      pageLength: 5, // Aquí defines la cantidad de registros por página que deseas mostrar
      lengthMenu: [ 5, 10, 25, 50 ], // Aquí defines las opciones de la lista desplegable de "Mostrar"
      processing: true
    };

    const payLoad = getPayload()
    this.id = payLoad?.id ? payLoad.id : 0;
    
    this.reservaService.getReservasPorIdLogin(this.id).subscribe(reservaResponse => {
      console.log({
        reservaResponse
      })
      this.tablaReserva = reservaResponse.map(
        
        reserva => {

          const paqueteFound = this.paquetes.find(paquete => paquete.idPaquete == reserva.idPaquete)!;
          const descripcion = paqueteFound.descripcion!
          
          return {
            acompaniante: reserva.acompaniante,
            apellido: reserva.apellido,
            cantPersonas: reserva.cantPersonas,
            fechaRegistro: reserva.fechaRegistro,
            fechaReserva: reserva.fechaReserva,
            flagTipoReserva: reserva.flagTipoReserva,
            hora: reserva.hora,
            nombres: reserva.nombres,
            telefono: reserva.telefono,
            totalPago: reserva.totalPago,
            email: reserva.email,
            idReserva: reserva.idReserva,
            paqueteName: descripcion,
            estado: reserva.estado,
            dni: reserva.dni,
            usuarioModificacion: reserva.usuarioModificacion,
            fechaModificacion: reserva.fechaModificacion

          }
        } 
      )
      this.dtTrigger.next(this.dtOptions)
    });
    
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }


  editarReserva(reserva: TablaReserva) {
    console.log(reserva)
    console.log(!!reserva.fechaModificacion)
    console.log(!!reserva.fechaModificacion !== null)
    const isModificado = reserva.fechaModificacion !== null
    if (isModificado) {
      alertNotification('', 'La reserva ya ha sido modificada', 'info')
      return;
    }

    this.router.navigate(['editar-misreservas', reserva.idReserva])

  }

}

interface TablaReserva{
  paqueteName: string ;
  idReserva?: number | undefined;
  fechaRegistro: string | null;
  fechaReserva: string;
  hora: string;
  cantPersonas: number;
  //idLogin: number;
  nombres: string;
  apellido: string;
  telefono: string;
  flagTipoReserva: number;
  acompaniante: number;
  totalPago: number;
  email?: string;
  estado?: string;
  dni?: string;
  fechaModificacion?: string;
  usuarioModificacion?: string;
}
