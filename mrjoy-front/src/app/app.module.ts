import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { InitPageComponent } from './components/layout/init-page/init-page.component';
import { ParquesComponent } from './pages/parques/parques.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { CumpleaniosComponent } from './pages/cumpleanios/cumpleanios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { BioseguridadComponent } from './pages/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/compra-entradas/compra-entradas.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InitPageComponent,
    ParquesComponent,
    HorariosComponent,
    PromocionesComponent,
    CumpleaniosComponent,
    ContactoComponent,
    LoginComponent,
    BioseguridadComponent,
    CompraEntradasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
