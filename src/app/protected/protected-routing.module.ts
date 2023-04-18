import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MpProcDisciplinComponent } from './mp-proc-disciplin/mp-proc-disciplin.component';
import { PjProcDisciplinComponent } from './pj-proc-disciplin/pj-proc-disciplin.component';
import { PjRegDeudoresComponent } from './pj-reg-deudores/pj-reg-deudores.component';
import { SenInfoFinancieraComponent } from './sen-info-financiera/sen-info-financiera.component';
import { SenSancionadosOsceComponent } from './sen-sancionados-osce/sen-sancionados-osce.component';
import { SerSancionesComponent } from './ser-sanciones/ser-sanciones.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'seninfofin', component: SenInfoFinancieraComponent},
      {path: 'sensanosce', component: SenSancionadosOsceComponent},
      {path: 'pjprocdisc', component: PjProcDisciplinComponent},
      {path: 'pjregdudo', component: PjRegDeudoresComponent},
      {path: 'mpprocdisc', component: MpProcDisciplinComponent},
      {path: 'sersanciones', component: SerSancionesComponent},
      {path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
