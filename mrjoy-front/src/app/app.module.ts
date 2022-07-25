import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";

import { AdminFooterComponent } from './components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminEmpleadoComponent } from './pages/admin/admin-empleado/admin-empleado.component';
import { HeaderComponent } from './components/cliente/header/header.component';
import { FooterComponent } from './components/cliente/footer/footer.component';
import { HomeComponent } from './pages/cliente/home/home.component';
import { InitPageComponent } from './components/cliente/init-page/init-page.component';
import { ParquesComponent } from './pages/cliente/parques/parques.component';
import { HorariosComponent } from './pages/cliente/horarios/horarios.component';
import { PromocionesComponent } from './pages/cliente/promociones/promociones.component';
import { CumpleaniosComponent } from './pages/cliente/cumpleanios/cumpleanios.component';
import { ContactoComponent } from './pages/cliente/contacto/contacto.component';
import { LoginComponent } from './pages/cliente/login/login.component';
import { BioseguridadComponent } from './pages/cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/cliente/compra-entradas/compra-entradas.component';
import { AdminClienteComponent } from './pages/admin/admin-cliente/admin-cliente.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component';
import { DataTablesModule } from 'angular-datatables';


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
    CompraEntradasComponent,
    AdminClienteComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminEmpleadoComponent,
    AdminInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
