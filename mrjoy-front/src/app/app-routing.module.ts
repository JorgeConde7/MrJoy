import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { InitPageComponent } from './components/layout/init-page/init-page.component';
import { BioseguridadComponent } from './pages/bioseguridad/bioseguridad.component';
import { CompraEntradasComponent } from './pages/compra-entradas/compra-entradas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CumpleaniosComponent } from './pages/cumpleanios/cumpleanios.component';
import { HomeComponent } from './pages/home/home.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { LoginComponent } from './pages/login/login.component';
import { ParquesComponent } from './pages/parques/parques.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';

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
    path: '404',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
