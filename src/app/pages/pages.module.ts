import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';


import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { ReporteServiceService } from '../core/apis/admin/reporte-service.service';
import { AdminCalendarioComponent } from './admin/admin-calendario/admin-calendario.component';
import { AdminClienteComponent } from './admin/admin-cliente/admin-cliente.component';
import { AdminContactoComponent } from './admin/admin-contacto/admin-contacto.component';
import { AdminEmpleadoComponent } from './admin/admin-empleado/admin-empleado.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminPaquetesComponent } from './admin/admin-paquetes/admin-paquetes.component';
import { AdminPromocionesComponent } from './admin/admin-promociones/admin-promociones.component';
import { AdminProveedoresComponent } from './admin/admin-proveedores/admin-proveedores.component';
import { AdminReportesComponent } from './admin/admin-reportes/admin-reportes.component';
import { AdminReservaComponent } from './admin/admin-reserva/admin-reserva.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminVentaBoletoComponent } from './admin/admin-venta-boleto/admin-venta-boleto.component';


import { BioseguridadComponent } from './cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './cliente/compra-entradas/compra-entradas.component';
import { ContactoComponent } from './cliente/contacto/contacto.component';
import { CumpleaniosComponent } from './cliente/cumpleanios/cumpleanios.component';
import { HomeComponent } from './cliente/home/home.component';
import { ParquesComponent } from './cliente/parques/parques.component';
import { AtraccionesComponent } from './cliente/atracciones/atracciones.component';
import { PerfilComponent } from './cliente/perfil/perfil.component';
import { PromocionesComponent } from './cliente/promociones/promociones.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { TerminosComponent } from './cliente/terminos/terminos.component';


import { AdminFooterComponent } from '../components/admin/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from '../components/admin/admin-header/admin-header.component';
import { AdminInicioComponent } from '../components/admin/admin-inicio/admin-inicio.component';
import { CalendarioReservaComponent } from '../components/cliente/calendario-reserva/calendario-reserva.component';
import { FooterComponent } from '../components/cliente/footer/footer.component';
import { FormularioReservaComponent } from '../components/cliente/formulario-reserva/formulario-reserva.component';
import { HeaderComponent } from '../components/cliente/header/header.component';
import { InitPageComponent } from '../components/cliente/init-page/init-page.component';
import { ModalPagoComponent } from '../components/cliente/modal-pago/modal-pago.component';
import { LoginModalComponent } from '../components/login-modal/login-modal/login-modal.component';
import { ModalFormularioReservaComponent } from '../components/admin/modal-reserva/modal-formulario-reserva.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MisReservasComponent } from './cliente/mis-reservas/mis-reservas.component';
import { EditarreservasComponent } from './cliente/editarreservas/editarreservas.component';
import { MisConsultasComponent } from './cliente/mis-consultas/mis-consultas.component';
import { TableReservaFilterComponent } from '../components/admin/table-reserva-filter/table-reserva-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AtraccionesComponent,
    ParquesComponent,
    PromocionesComponent,
    CumpleaniosComponent,
    ContactoComponent,
    BioseguridadComponent,
    CompraEntradasComponent,
    AdminClienteComponent,
    AdminEmpleadoComponent,
    AdminReservaComponent,
    RegistroComponent,
    AdminContactoComponent,
    AdminMenuComponent,
    AdminVentaBoletoComponent,
    AdminCalendarioComponent,
    AdminReportesComponent,
    AdminProveedoresComponent,
    AdminPaquetesComponent,
    AdminPromocionesComponent,
    PerfilComponent,
    TerminosComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminInicioComponent,
    CalendarioReservaComponent,
    FooterComponent,
    FormularioReservaComponent,
    HeaderComponent,
    InitPageComponent,
    ModalPagoComponent,
    LoginModalComponent,
    AdminLoginComponent,
    MisReservasComponent,
    EditarreservasComponent,
    MisConsultasComponent,
    ModalFormularioReservaComponent,
    TableReservaFilterComponent
  ],
  imports: [
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    RouterModule
  ],
  providers: [ReporteServiceService, { provide: MAT_DATE_LOCALE, useValue: 'es' }],
  exports: [
    AppComponent,
    HomeComponent,
    AtraccionesComponent,
    ParquesComponent,
    PromocionesComponent,
    CumpleaniosComponent,
    ContactoComponent,
    BioseguridadComponent,
    CompraEntradasComponent,
    AdminClienteComponent,
    AdminEmpleadoComponent,
    AdminReservaComponent,
    RegistroComponent,
    AdminContactoComponent,
    AdminMenuComponent,
    AdminVentaBoletoComponent,
    AdminCalendarioComponent,
    AdminReportesComponent,
    AdminProveedoresComponent,
    AdminPaquetesComponent,
    AdminPromocionesComponent,
    PerfilComponent,
    TerminosComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminInicioComponent,
    CalendarioReservaComponent,
    FooterComponent,
    FormularioReservaComponent,
    HeaderComponent,
    InitPageComponent,
    ModalPagoComponent,
    LoginModalComponent,
    BrowserAnimationsModule,
    MatMomentDateModule,
    RouterModule,
    MisReservasComponent,
    EditarreservasComponent,
    ModalFormularioReservaComponent,
    TableReservaFilterComponent
  ]
})
export class PagesModule { }
