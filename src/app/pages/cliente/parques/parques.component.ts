import { Component, OnInit } from '@angular/core';
import { ParqueService } from 'src/app/core/apis/client/parques.service';
import { IParques } from 'src/app/core/models/client/parques';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.scss']
})
export class ParquesComponent implements OnInit {
  parques: IParques[] = []
  constructor(private parqueService: ParqueService) { }

  ngOnInit(): void {
    this.renderParques()
  }

  renderParques() {
    this.parqueService.getParques().subscribe(parques => {
      this.parques = parques
    })
  }

}
