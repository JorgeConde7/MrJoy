import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ModalPagoService } from "src/app/core/apis/client/modal-pago.service";
import { Boleta } from "src/app/core/models/client/boleta";
import { IPayModal } from "src/app/core/models/client/payModal";
import {
  alertConfirmation,
  alertNotification
} from "src/app/util/notifications";
import * as regex from "src/app/util/regex.util";
import { getPayload } from "src/app/util/token.util";
import { checkLuhn } from "src/app/util/utils.util";
import { CompraEntradasService } from "../../../core/apis/client/compra-entradas.service";

@Component({
  selector: "app-compra-entradas",
  templateUrl: "./compra-entradas.component.html",
  styleUrls: ["./compra-entradas.component.scss"]
})
export class CompraEntradasComponent implements OnInit {
  data: any;
  subTotal: number = 0;
  desCuento: number = 0;
  totals: number = 0;
  idss: any = [];
  ticket: Boleta;
  formTarjeta: FormGroup;

  constructor(
    private compraEntradasService: CompraEntradasService,
    private formBuilder: FormBuilder,
    private modalPagoService: ModalPagoService
  ) {
    this.formTarjeta = this.getFormBuilderTarjeta();
    this.ticket = this.getTicketDefaultValues();
  }

  ngOnInit(): void {
    this.compraEntradasService.getEntradas().subscribe(result => {
      this.data = result;
      //console.log(result);
      for (let i = 0; i < this.data.length; i++) {
        //console.log(this.data[i].id)
        this.idss.push(this.data[i].id);
      }

      //console.log(this.idss)
    });
  }

  getFormBuilderTarjeta() {
    return this.formBuilder.group({
      numeroTarjeta: [
        null,
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          this.cardValidator
        ]
      ],
      mesTarjeta: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          this.dateCardValidator,
          Validators.pattern(regex.CVV)
        ]
      ],
      codSeguridad: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ]
    });
  }

  cardValidator(control: FormControl): { [s: string]: boolean } | null {
    const clientCard = control.value;
    if (clientCard) {
      const isValidCard = checkLuhn(clientCard);
      if (isValidCard) {
        return null;
      }
    }
    return { invalidCard: true };
  }

  dateCardValidator(control: FormControl): { [s: string]: boolean } | null {
    const dateCard: string = control.value;

    if (dateCard) {
      const dateTime = new Date();
      const yearCurrentTemp = String(dateTime.getFullYear()).slice(-2);
      const yearCurrent = Number(yearCurrentTemp);
      const monthCurrent = dateTime.getMonth() + 1;

      const [monthCard, yearCard] = dateCard.split("-");
      const isvalidYear = Number(yearCard) >= yearCurrent;
      const isvalidmonth = Number(monthCard) >= monthCurrent;

      if (Number(yearCard) === yearCurrent) {
        if (!isvalidmonth) return { invalidDateCard: true };
      }

      if (isvalidYear) return null;
    }
    return { invalidDateCard: true };
  }

  Aumentar(idString: string, precio: number, itemid: number, suma: number) {
    const id = <HTMLInputElement>document.getElementById(idString);
    const subtotal = <HTMLInputElement>document.getElementById(
      itemid.toString()
    );

    const isIncrementButton = suma == 1;
    const isDecrementButton = suma == 0;

    if (isIncrementButton) {
      const quantityTicket = parseInt(id.value) + 1;
      id.value = "" + quantityTicket;

      this.setTicketDetail(itemid, quantityTicket, precio);
    } else if (isDecrementButton) {
      if (id.value == "0") return;

      const quantityTicket = parseInt(id.value) - 1;
      id.value = "" + quantityTicket;

      this.setTicketDetail(itemid, quantityTicket, precio);
    }

    if (id.value === "") subtotal.value = "" + 0;
    else subtotal.value = "" + precio * parseInt(id.value);

    let sub = 0;
    for (let i = 0; i < this.idss.length; i++) {
      sub += parseInt(
        (<HTMLInputElement>document.getElementById(this.idss[i].toString()))
          .value
      );
    }

    this.subTotal = sub;
    this.totals = this.subTotal - this.desCuento / 100 * this.subTotal;
  }

  setTicketDetail(idEntrada: number, quantityTicket: number, unitPrice: number) {
    const isTicket_1 = idEntrada === 1;
    const isTicket_2 = idEntrada === 2;
    const isTicket_3 = idEntrada === 3;
    const subTotal = quantityTicket * unitPrice;

    if (isTicket_1) {
      this.ticket.detalleBoleta[0].cantidad = quantityTicket;
      this.ticket.detalleBoleta[0].subTotal = subTotal;
    } else if (isTicket_2) {
      this.ticket.detalleBoleta[1].cantidad = quantityTicket;
      this.ticket.detalleBoleta[1].subTotal = subTotal;
    } else if (isTicket_3) {
      this.ticket.detalleBoleta[2].cantidad = quantityTicket;
      this.ticket.detalleBoleta[2].subTotal = subTotal;
    }
  }

  keydown(event: any) {
    if (event.key === "-" || event.key === "e") event.preventDefault();
  }

  async ngSubmit() {
    const result = await alertConfirmation();
    const isDenied = !result.isConfirmed;

    if (isDenied) {
      this.formTarjeta.controls["mesTarjeta"].reset();
      this.formTarjeta.controls["codSeguridad"].reset();
      return;
    }

    const isInvalidFormTarjeta = this.formTarjeta.invalid;
    if (isInvalidFormTarjeta) return;

    const { codSeguridad, mesTarjeta, numeroTarjeta } = this.formTarjeta.value as IPayModal;
    const { id: idLogin } = getPayload()!;
    this.ticket.idLogin = idLogin;
    this.ticket.total = this.totals;

    this.modalPagoService
      .getTarjeta(numeroTarjeta, mesTarjeta, codSeguridad)
      .subscribe(tarjetaResponse => {
        if (tarjetaResponse) {
          if (tarjetaResponse.saldo >= this.totals) {
            this.compraEntradasService.saveTicket(this.ticket).subscribe(_ => {
              this.modalPagoService
                .putTarjeta(numeroTarjeta, tarjetaResponse.saldo - this.totals)
                .subscribe(_ => {
                  alertNotification(
                    "Compra de entrada(s) Completada. Su constancia se le enviara a su correo en breve.",
                    "",
                    "success",
                    ({ isConfirmed }) => {
                      if (isConfirmed) window.location.reload();
                    }
                  );

                  // setTimeout(() => { window.location.reload() }, 3000)
                });
            });
          } else {
            alertNotification("No tiene saldo suficiente para realizar la compra", '', "error")
            this.formTarjeta.controls['mesTarjeta'].reset();
            this.formTarjeta.controls['codSeguridad'].reset();
          }
        } else {
          alertNotification("Verifique sus datos e intentelo denuevo", '', "error")
        }
      });
  }

  getTicketDefaultValues() {
    return {
      idLogin: 0,
      total: 0,
      detalleBoleta: [
        {
          idTipoEntrada: 1,
          cantidad: 0,
          subTotal: 0
        },
        {
          idTipoEntrada: 2,
          cantidad: 0,
          subTotal: 0
        },
        {
          idTipoEntrada: 3,
          cantidad: 0,
          subTotal: 0
        }
      ]
    };
  }
}
