import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/core/constants/constants';
import { getPayload, hasToken } from 'src/app/util/token.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nombre: any = 'Ingresar';
  datosCompletos: any;

  constructor(private router: Router) { this.setUsernameFromSession() }

  ngOnInit(): void {
  }

  isUrlEqualTo(currentURL: string) {
    const url = this.router.url

    return url === currentURL;
  }

  setUsernameFromSession() {
    const payload = getPayload()

    if (payload) {
      const { username, profile, id, create_at } = payload
      this.nombre = username;
      this.datosCompletos = create_at;
    }
  }


  hasSesion() {
    return hasToken()
  }
  signut() {
    localStorage.removeItem(TOKEN);
    this.nombre = 'Ingresar'

    this.router.navigate(['/'])
  }

}
