import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openCityInNewWindow(path:string) {
  // Converts the route into a string that can be used
  // with the window.open() function
  const url = this.router.serializeUrl(
    this.router.createUrlTree([path])
  );

  window.open(url, '_blank');
}

}
