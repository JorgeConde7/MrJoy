import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component';
import { FooterComponent } from './components/cliente/footer/footer.component';
import { InitPageComponent } from './components/cliente/init-page/init-page.component';
import { AdminClienteComponent } from './pages/admin/admin-cliente/admin-cliente.component';
import { AdminReservaComponent } from './pages/admin/admin-reserva/admin-reserva.component';
import { BioseguridadComponent } from './pages/cliente/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/cliente/compra-entradas/compra-entradas.component';
import { ContactoComponent } from './pages/cliente/contacto/contacto.component';
import { CumpleaniosComponent } from './pages/cliente/cumpleanios/cumpleanios.component';
import { HomeComponent } from './pages/cliente/home/home.component';
import { HorariosComponent } from './pages/cliente/horarios/horarios.component';
import { LoginComponent } from './pages/cliente/login/login.component';
import { ParquesComponent } from './pages/cliente/parques/parques.component';
import { PromocionesComponent } from './pages/cliente/promociones/promociones.component';


const routes: Routes = [
  {
    path: '',
    component: InitPageComponent,
    children: [
      {
        path: 'index',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'parques',
        component: ParquesComponent
      },
      {
        path: 'horarios',
        component: HorariosComponent
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

    ]
  },
  {
    path: 'admin',
    component: AdminInicioComponent,
    children:[
      {
        path: 'clientes',
        component: AdminClienteComponent
      },  {
        path: 'reservas',
        component: AdminReservaComponent
      }
    ]
  },
  {
    path: '404',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
