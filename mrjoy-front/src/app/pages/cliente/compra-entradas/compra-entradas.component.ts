import { Component, OnInit } from '@angular/core';
import { CompraEntradasService } from './compra-entradas.service';

@Component({
  selector: 'app-compra-entradas',
  templateUrl: './compra-entradas.component.html',
  styleUrls: ['./compra-entradas.component.scss']
})
export class CompraEntradasComponent implements OnInit {

  data: any;
  subTotal: number = 0;
  desCuento: number = 20;
  totals: number = 0 ;
  idss: any = [];


  constructor(private compraEntradasService:CompraEntradasService) 
  { 
    
  }

  ngOnInit(): void 
  {
    this.compraEntradasService.getEntradas().subscribe((result) => {
      this.data = result;
      //console.log(result);
      for (let i=0; i<this.data.length; i++)
      {
        //console.log(this.data[i].id)
        this.idss.push(this.data[i].id);
      }
      
      //console.log(this.idss)
      
    })
  }

  Aumentar(idString:string, precio:any, itemid:any, suma:number)
  {
    const id = (<HTMLInputElement>document.getElementById(idString))
    const subtotal = (<HTMLInputElement>document.getElementById(itemid.toString()))

    if(suma == 1) id.value = ""+ (parseInt(id.value) + 1 )
    else if (suma == 0)
    {
      if (id.value == '0') return;
      id.value = "" + (parseInt(id.value) - 1 )
    }
    
    if (id.value === '') subtotal.value = ""+0
    else subtotal.value = ""+(precio * parseInt(id.value))
    
    let sub = 0;
    for (let i=0; i<this.idss.length; i++)
    {
      sub += parseInt((<HTMLInputElement>document.getElementById(this.idss[i].toString())).value)
    }

    this.subTotal = sub;
    this.totals = this.subTotal - ((this.desCuento/100) * this.subTotal);
  }

  keydown(event: any)
  {
    if (event.key === '-' || event.key === 'e') event.preventDefault()
  }

}
