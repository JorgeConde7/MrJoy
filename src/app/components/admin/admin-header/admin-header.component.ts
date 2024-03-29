import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getPayloadEmpleado } from 'src/app/util/token.util';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  sesionData = {
    isAdmin: false
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setSesionData()
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  setSesionData() {
    const sesionData = getPayloadEmpleado()!
    console.log({sesionData});

    this.sesionData.isAdmin = sesionData.profile === "admin"
  }

}
