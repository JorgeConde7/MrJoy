import { Component, OnInit } from '@angular/core';
import { CompraEntradasService } from './compra-entradas.service';

@Component({
  selector: 'app-compra-entradas',
  templateUrl: './compra-entradas.component.html',
  styleUrls: ['./compra-entradas.component.scss']
})
export class CompraEntradasComponent implements OnInit {

  data: any;

  constructor(private compraEntradasService:CompraEntradasService) 
  { 

  }

  ngOnInit(): void 
  {
    this.compraEntradasService.getEntradas().subscribe((result) => {
      this.data = result;
      console.log(result);
    })
  }

  Aumentar(idString:string, precio:any, itemid:any, suma:number)
  {
    const id = (<HTMLInputElement>document.getElementById(idString))
    const subtotal = (<HTMLInputElement>document.getElementById(itemid.toString()))

    if(suma) id.value = ""+ (parseInt(id.value) + 1 )
    else 
    {
      if (id.value == '0') return
      id.value = "" + (parseInt(id.value) - 1 )
    }
    
    subtotal.value = ""+(precio * parseInt(id.value))
    
    
  }

}
