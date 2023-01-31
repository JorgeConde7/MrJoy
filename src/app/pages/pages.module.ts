import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
import { AdminVentaBoletoComponent } from './admin/admin-venta-boleto/admin-venta-boleto.component';
import { BioseguridadComponent } from './cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './cliente/compra-entradas/compra-entradas.component';
import { ContactoComponent } from './cliente/contacto/contacto.component';
import { CumpleaniosComponent } from './cliente/cumpleanios/cumpleanios.component';
import { HomeComponent } from './cliente/home/home.component';
import { HorariosComponent } from './cliente/horarios/horarios.component';
import { ParquesComponent } from './cliente/parques/parques.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParquesComponent,
    HorariosComponent,
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
  ],
  imports: [
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    NgxChartsModule,
  ],
  providers: [ReporteServiceService],
  exports: [
    AppComponent,
    HomeComponent,
    ParquesComponent,
    HorariosComponent,
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
  ]
})
export class PagesModule { }
