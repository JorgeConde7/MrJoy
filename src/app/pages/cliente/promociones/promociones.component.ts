import { Component, OnInit } from '@angular/core';
import { PromocionService } from 'src/app/core/apis/client/promociones.service';
import { Promocion } from 'src/app/core/models/client/Promociones';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss']
})
export class PromocionesComponent implements OnInit {
  promociones: Promocion[] = []
  constructor(private promocionService: PromocionService) { }

  ngOnInit(): void {
    this.promocionesRender();
  }


  promocionesRender() {

    this.promocionService.getPromociones().subscribe(promocionresponse => {
      console.log({ promocionresponse });
      this.promociones = promocionresponse
    })

  }


}
