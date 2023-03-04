import { Component, Input, OnInit } from '@angular/core';
import { FormularioReservaComponent } from '../formulario-reserva/formulario-reserva.component';
import { ModalPagoService } from '../../../core/apis/client/modal-pago.service';
import { ReservaServiceService } from 'src/app/core/apis/client/reserva-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkLuhn } from 'src/app/util/utils.util';
import { IPayModal } from 'src/app/core/models/client/payModal';
import { IReserva } from '../calendario-reserva/reserva';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {
  @Input() datoReservaFormulario!: IReserva;

  formTarjeta: FormGroup
  constructor(private reservaService: ReservaServiceService, private modalPagoService: ModalPagoService, private formBuilder: FormBuilder) {
    this.formTarjeta = this.getFormBuilderTarjeta()
  }

  ngOnInit(): void { }


  getFormBuilderTarjeta() {
    return this.formBuilder.group({
      numeroTarjeta: [null, [Validators.required, Validators.minLength(16), Validators.maxLength(16), this.cardValidator]],
      mesTarjeta: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), this.dateCardValidator]],
      codSeguridad: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  cardValidator(control: FormControl): { [s: string]: boolean } | null {
    const clientCard = control.value
    if (clientCard) {
      const isValidCard = checkLuhn(clientCard);
      if (isValidCard) {
        return null
      }
    }
    return { 'invalidCard': true };
  }
  dateCardValidator(control: FormControl): { [s: string]: boolean } | null {
    const dateCard: string = control.value

    if (dateCard) {
      const dateTime = new Date();
      const yearCurrentTemp = String(dateTime.getFullYear()).slice(-2)
      const yearCurrent = Number(yearCurrentTemp)
      const monthCurrent = dateTime.getMonth() + 1

      const [monthCard, yearCard] = dateCard.split("-")
      const isvalidYear = Number(yearCard) >= yearCurrent
      const isvalidmonth = Number(monthCard) >= monthCurrent

      if (Number(yearCard) === yearCurrent) {
        if (!isvalidmonth) return { 'invalidDateCard': true }
      }

      if (isvalidYear) return null

    }
    return { 'invalidDateCard': true }
  }

  validarPago() {
    const isInvalidFormTarjeta = this.formTarjeta.invalid
    if (isInvalidFormTarjeta) return;

    console.log('Entro en validar pago ')
    try {

      const { codSeguridad, mesTarjeta, numeroTarjeta } = this.formTarjeta.value as IPayModal

      this.modalPagoService.getTarjeta(numeroTarjeta, mesTarjeta, codSeguridad).subscribe(tarjetaResponse => {
        /*console.log(this.datoReservaFormulario.totalPago)
        console.log(result.saldo)*/

        if (tarjetaResponse) {
          if (tarjetaResponse.saldo >= this.datoReservaFormulario.totalPago) {
            // this.formularioReservaComponent.RegistrarReservaClass(this.datoReservaFormulario)
            this.reservaService.CrearReserva(this.datoReservaFormulario).subscribe(reservaResponse => {
              console.log("RESULT RESERVACION:: ", { reservaResponse });

              this.modalPagoService.putTarjeta(numeroTarjeta, (tarjetaResponse.saldo - this.datoReservaFormulario.totalPago)).subscribe(response => {
                console.log({ response });

                alert("Reservacion Completada. Su constancia se le enviara a su correo  en breve.")
              })
            })
          }
          else {
            const audio = new Audio('assets/audios/pipipiii.mp3')
            audio.volume = 0.4;
            audio.play();
            alert('Mano no tienes plata. pipipi ( ͡ಥ ͜ʖ ͡ಥ)')
          }
        } else {
          alert("Verifique sus datos e intentelo denuevo")
        }

      })

    } catch (error) {
      alert("Se se pudo concreta la la accion. Vuelva a intentarlo mas tarde.")
    }
  }

  /*cerrarModal(contentido : any)
  {
    this.modal.dismissAll
  }*/


}
