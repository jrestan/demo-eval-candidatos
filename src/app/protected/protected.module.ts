import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpMenuComponent } from './up-menu/up-menu.component';
import { HomeComponent } from './home/home.component';
import { SenInfoFinancieraComponent } from './sen-info-financiera/sen-info-financiera.component';
import { SenSancionadosOsceComponent } from './sen-sancionados-osce/sen-sancionados-osce.component';
import { PjProcDisciplinComponent } from './pj-proc-disciplin/pj-proc-disciplin.component';
import { PjRegDeudoresComponent } from './pj-reg-deudores/pj-reg-deudores.component';
import { MpProcDisciplinComponent } from './mp-proc-disciplin/mp-proc-disciplin.component';
import { SerSancionesComponent } from './ser-sanciones/ser-sanciones.component';

import { ImgModule } from '@coreui/angular'
import { GridModule } from '@coreui/angular'
import { TableModule } from '@coreui/angular'
import { UtilitiesModule } from '@coreui/angular'


@NgModule({
  declarations: [
    DashboardComponent,
    UpMenuComponent,
    HomeComponent,
    SenInfoFinancieraComponent,
    SenSancionadosOsceComponent,
    PjProcDisciplinComponent,
    PjRegDeudoresComponent,
    MpProcDisciplinComponent,
    SerSancionesComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ImgModule,
    GridModule,
    TableModule,
    UtilitiesModule
  ]
})
export class ProtectedModule { }
