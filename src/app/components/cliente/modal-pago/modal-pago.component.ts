import { Component, Input, OnInit } from '@angular/core';
import { FormularioReservaComponent } from '../formulario-reserva/formulario-reserva.component';
import { ModalPagoService } from '../../../core/apis/client/modal-pago.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {
  @Input() datoReservaFormulario: any;

  numeroTarjeta: String = '';
  mesTarjeta: String = '';
  codSeguridad: String = '';

  public validar: boolean = false;

  constructor(private formularioReservaComponent: FormularioReservaComponent, private modalPagoService: ModalPagoService/*, private modal : NgbModal*/) {

  }

  ngOnInit(): void {


  }

  validarPago() {
    this.validar = true;
    console.log('Entro en validar pago ')
    try {
      if (this.validar) {
        if (this.numeroTarjeta.trim() !== '' && this.mesTarjeta.trim() !== '' && this.codSeguridad.trim() !== '') {
          this.modalPagoService.getTarjeta(this.numeroTarjeta, this.mesTarjeta, this.codSeguridad).subscribe(result => {
            /*console.log(this.datoReservaFormulario.totalPago)
            console.log(result.saldo)*/

            if (result) {
              if (result.saldo >= this.datoReservaFormulario.totalPago) {
                this.formularioReservaComponent.RegistrarReservaClass(this.datoReservaFormulario)
                //console.log(result.saldo - this.datoReservaFormulario.totalPago)
                this.modalPagoService.putTarjeta(this.numeroTarjeta, (result.saldo - this.datoReservaFormulario.totalPago)).subscribe()

                alert("Reservacion Completada. Su constancia se le enviara a su correo  en breve.")
              }
              else {
                const audio = new Audio('assets/audios/pipipiii.mp3')
                audio.volume = 0.4;
                audio.play();
                alert('Mano no tienes plata. pipipi ( ͡ಥ ͜ʖ ͡ಥ)')
              }
            } else {
              alert("No se pudo concretar la compra, intentelo denuevo")
            }




          })
        }
        else alert('Datos vacíos')
      }
      else {
        alert('Error Papu :V')
      }


    } catch (error) {
      alert("Se se pudo concreta la la accion. Vuelva a intentarlo mas tarde.")
    }
  }

  /*cerrarModal(contentido : any)
  {
    this.modal.dismissAll
  }*/


}
