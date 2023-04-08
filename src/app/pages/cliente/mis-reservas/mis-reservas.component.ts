import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IReserva } from 'src/app/components/cliente/calendario-reserva/reserva';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';
import { PaquetesService } from 'src/app/core/apis/admin/paquetes.service';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { alertConfirmation, alertNotification } from 'src/app/util/notifications';
import { getPayload } from 'src/app/util/token.util';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<ADTSettings>()

  namePaquete: String = ""
  descripcion: String = ""
  id!: number;
  
  paquetes: Paquete[] = []

  tablaReserva: TablaReserva[] = []
  tablaReservaE: TablaReserva = {} as TablaReserva;

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
      this.tablaReserva = reservaResponse.map(
        
        reserva => {
          const paqueteFound = this.paquetes.find(paquete => paquete.idPaquete == reserva.idPaquete);
          //this.descripcion = paqueteFound.descripcion
          
          return {
            idLogin: reserva.idLogin,
            acompaniante: reserva.acompaniante,
            apellido: reserva.apellido,
            cantPersonas: reserva.cantPersonas,
            fechaRegistro: reserva.fechaRegistro,
            fechaReserva: reserva.fechaReserva,
            flagTipoReserva: reserva.flagTipoReserva,
            hora: reserva.hora ? reserva.hora : "",
            nombres: reserva.nombres,
            telefono: reserva.telefono,
            totalPago: reserva.totalPago,
            email: reserva.email,
            idReserva: reserva.idReserva,
            paqueteName: paqueteFound ? paqueteFound.descripcion : '',
            estado: reserva.estado,
            dni: reserva.dni,
            usuarioModificacion: reserva.usuarioModificacion,
            fechaModificacion: reserva.fechaModificacion,
            diferenciaPagar: reserva.diferenciaPagar
          }
        } 
      )
      this.dtTrigger.next(this.dtOptions)
    });
    
    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  selectReserva(reserva: TablaReserva) {
    this.tablaReservaE = reserva
  }

  async onSubmitModalEliminarReserva() {
    const { motivoAnulacion } = this.tablaReservaE;
    const { idReserva } = this.tablaReservaE;

    if (!motivoAnulacion?.trim()) {
      alertNotification('', 'Ingrese su respuesta', 'info');
      return;
    }
    const resul = await alertConfirmation('Confirme respuesta');
    if (!resul.isConfirmed) return;

    const paqueteFound = this.paquetes.find(paquete => paquete.descripcion === this.tablaReservaE.paqueteName)!;
    console.log("paquete found " + paqueteFound.descripcion)

    const iReserva: IReserva = {
      idPaquete: paqueteFound.idPaquete ? paqueteFound.idPaquete : 1,
      idLogin: this.tablaReservaE.idLogin,
      acompaniante: this.tablaReservaE.acompaniante,
      apellido: this.tablaReservaE.apellido,
      cantPersonas: this.tablaReservaE.cantPersonas,
      fechaRegistro: this.tablaReservaE.fechaRegistro,
      fechaReserva: this.tablaReservaE.fechaReserva,
      flagTipoReserva: this.tablaReservaE.flagTipoReserva,
      hora: this.tablaReservaE.hora ? this.tablaReservaE.hora : "",
      nombres: this.tablaReservaE.nombres,
      telefono: this.tablaReservaE.telefono,
      totalPago: this.tablaReservaE.totalPago,
      email: this.tablaReservaE.email,
      idReserva: this.tablaReservaE.idReserva,
      estado: this.tablaReservaE.estado,
      dni: this.tablaReservaE.dni,
      usuarioModificacion: this.tablaReservaE.usuarioModificacion,
      fechaModificacion: this.tablaReservaE.fechaModificacion
    }
    console.log(iReserva)
    this.reservaService.eliminarReserva(iReserva, idReserva!).subscribe ({
      next: this.onSubmitModalSucess.bind(this),
      error: this.onSubmitModalError.bind(this),
    })

  }
  

  onSubmitModalSucess() {
    window.location.reload()
  }

  onSubmitModalError(err: any) {
    alertNotification('', err.error.message, 'info');
  }


  editarReserva(reserva: TablaReserva) {
    const isModificado = reserva.fechaModificacion !== null
    if (isModificado) {
      alertNotification('', 'La reserva ya ha sido modificada', 'info')
      return;
    }
    this.router.navigate(['editar-misreservas', reserva.idReserva])
  }

}

interface TablaReserva{
  paqueteName?: string;
  idReserva?: number | undefined;
  fechaRegistro: string | null;
  fechaReserva: string;
  hora: string;
  cantPersonas: number;
  idLogin: number;
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
  motivoAnulacion?: string;
  diferenciaPagar?: number;
}
