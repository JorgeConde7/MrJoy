import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReporteServiceService } from './core/apis/admin/reporte-service.service';
import { PagesModule } from './pages/pages.module';
import { AddTokenInterceptor } from './core/interceptors/add-token.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
  ],
  providers: [ReporteServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenInterceptor,
    multi: true,
  },],

  bootstrap: [AppComponent]
})
export class AppModule { }
