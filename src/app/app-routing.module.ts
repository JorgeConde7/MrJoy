import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component';
import { FooterComponent } from './components/cliente/footer/footer.component';
import { InitPageComponent } from './components/cliente/init-page/init-page.component';
import { AdminClienteComponent } from './pages/admin/admin-cliente/admin-cliente.component';
import { AdminReservaComponent } from './pages/admin/admin-reserva/admin-reserva.component';
import { AdminEmpleadoComponent } from './pages/admin/admin-empleado/admin-empleado.component';
import { BioseguridadComponent } from './pages/cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/cliente/compra-entradas/compra-entradas.component';
import { ContactoComponent } from './pages/cliente/contacto/contacto.component';
import { CumpleaniosComponent } from './pages/cliente/cumpleanios/cumpleanios.component';
import { HomeComponent } from './pages/cliente/home/home.component';
import { ParquesComponent } from './pages/cliente/parques/parques.component';
import { AtraccionesComponent } from './pages/cliente/atracciones/atracciones.component';
import { PromocionesComponent } from './pages/cliente/promociones/promociones.component';
import { RegistroComponent } from './pages/cliente/registro/registro.component';
import { AdminContactoComponent } from './pages/admin/admin-contacto/admin-contacto.component';
import { AdminMenuComponent } from './pages/admin/admin-menu/admin-menu.component';
import { AdminVentaBoletoComponent } from './pages/admin/admin-venta-boleto/admin-venta-boleto.component';
import { AdminCalendarioComponent } from './pages/admin/admin-calendario/admin-calendario.component';
import { AdminReportesComponent } from './pages/admin/admin-reportes/admin-reportes.component';
import { AdminProveedoresComponent } from './pages/admin/admin-proveedores/admin-proveedores.component';
import { AdminPaquetesComponent } from './pages/admin/admin-paquetes/admin-paquetes.component';
import { AdminPromocionesComponent } from './pages/admin/admin-promociones/admin-promociones.component';
import { PerfilComponent } from './pages/cliente/perfil/perfil.component';
import { TerminosComponent } from './pages/cliente/terminos/terminos.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { MisReservasComponent } from './pages/cliente/mis-reservas/mis-reservas.component';
import { EditarreservasComponent } from './pages/cliente/editarreservas/editarreservas.component';
import { MisConsultasComponent } from './pages/cliente/mis-consultas/mis-consultas.component';

const routes: Routes = [
  {
    path: '',
    component: InitPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'atracciones',
        component: AtraccionesComponent
      },
      {
        path: 'parques',
        component: ParquesComponent
      },
      {
        path: 'cumpleanios',
        component: CumpleaniosComponent
      },
      {
        path: 'promociones',
        component: PromocionesComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'compra-entradas',
        component: CompraEntradasComponent
      },
      {
        path: 'bioseguridad',
        component: BioseguridadComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'terminos',
        component: TerminosComponent
      },
      {
        path: 'mis-reservas',
        component: MisReservasComponent
      },
      {
        path: 'editar-misreservas/:id',
        component: EditarreservasComponent
      },
      {
        path: 'mis-consultas',
        component: MisConsultasComponent
      },


      {
        path: 'index/:id',
        component: HomeComponent
      },
      {
        path: 'registro/:id',
        component: RegistroComponent
      },
      {
        path: 'parques/:id',
        component: AtraccionesComponent
      },
      {
        path: 'horarios/:id',
        component: ParquesComponent
      },
      {
        path: 'cumpleanios/:id',
        component: CumpleaniosComponent
      },
      {
        path: 'promociones/:id',
        component: PromocionesComponent
      },
      {
        path: 'contacto/:id',
        component: ContactoComponent
      },
      {
        path: 'compra-entradas/:id',
        component: CompraEntradasComponent
      },
      {
        path: 'bioseguridad/:id',
        component: BioseguridadComponent
      },
      {
        path: 'perfil/:id',
        component: PerfilComponent
      },
      {
        path: 'terminos/:id',
        component: TerminosComponent
      },
    ]
  },

  {
    path: 'admin',
    component: AdminInicioComponent,
    children: [
      {
        path: 'clientes',
        component: AdminClienteComponent
      }, {
        path: 'reservas',
        component: AdminReservaComponent
      },
      {
        path: 'empleados',
        component: AdminEmpleadoComponent
      },
      {
        path: 'contacto',
        component: AdminContactoComponent
      },
      {
        path: 'menu',
        component: AdminMenuComponent
      },
      {
        path: 'ventaBoletos',
        component: AdminVentaBoletoComponent
      },
      {
        path: 'calendario',
        component: AdminCalendarioComponent
      },
      {
        path: 'reporte',
        component: AdminReportesComponent
      },
      {
        path: 'proveedores',
        component: AdminProveedoresComponent
      },
      {
        path: 'paquetes',
        component: AdminPaquetesComponent
      },
      {
        path: 'promociones',
        component: AdminPromocionesComponent
      }
    ]
  },
  {
    path: 'login',
    component: AdminLoginComponent,
  },
  {
    path: '404',
    component: FooterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
