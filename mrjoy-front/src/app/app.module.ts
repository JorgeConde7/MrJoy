import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { CalendarioReservaComponent } from './components/cliente/calendario-reserva/calendario-reserva.component';
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
import { BioseguridadComponent } from './pages/cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/cliente/compra-entradas/compra-entradas.component';
import { AdminClienteComponent } from './pages/admin/admin-cliente/admin-cliente.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginModalComponent } from './components/login-modal/login-modal/login-modal.component';
import { FormularioReservaComponent } from './components/cliente/formulario-reserva/formulario-reserva.component';
import { AdminReservaComponent } from './pages/admin/admin-reserva/admin-reserva.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/cliente/registro/registro.component';
import { AdminContactoComponent } from './pages/admin/admin-contacto/admin-contacto.component';
import { ModalPagoComponent } from './components/cliente/modal-pago/modal-pago.component';
import { AdminMenuComponent } from './pages/admin/admin-menu/admin-menu.component';
import { AdminVentaBoletoComponent } from './pages/admin/admin-venta-boleto/admin-venta-boleto.component';
import { AdminCalendarioComponent } from './pages/admin/admin-calendario/admin-calendario.component';
import { AdminReportesComponent } from './pages/admin/admin-reportes/admin-reportes.component';
import { AdminProveedoresComponent } from './pages/admin/admin-proveedores/admin-proveedores.component';
import { AdminPaquetesComponent } from './pages/admin/admin-paquetes/admin-paquetes.component';
import { AdminPromocionesComponent } from './pages/admin/admin-promociones/admin-promociones.component';
import { ReporteServiceService } from './pages/admin/admin-reportes/reporte-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BioseguridadComponent,
    CompraEntradasComponent,
    AdminClienteComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminEmpleadoComponent,
    AdminInicioComponent,
    LoginModalComponent,
    FormularioReservaComponent,
    AdminReservaComponent,
    RegistroComponent,
    AdminContactoComponent,
    CalendarioReservaComponent,
    ModalPagoComponent,
    AdminMenuComponent,
    AdminVentaBoletoComponent,
    AdminCalendarioComponent,
    AdminReportesComponent,
    AdminProveedoresComponent,
    AdminPaquetesComponent,
    AdminPromocionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule

  ],
  providers: [ReporteServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
