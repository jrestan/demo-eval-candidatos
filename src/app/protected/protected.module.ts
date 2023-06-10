import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';

//Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UpMenuComponent } from './pages/up-menu/up-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { SenInfoFinancieraComponent } from './pages/sen-info-financiera/sen-info-financiera.component';
import { SenSancionadosOsceComponent } from './pages/sen-sancionados-osce/sen-sancionados-osce.component';
import { PjProcDisciplinComponent } from './pages/pj-proc-disciplin/pj-proc-disciplin.component';
import { PjRegDeudoresComponent } from './pages/pj-reg-deudores/pj-reg-deudores.component';
import { MpProcDisciplinComponent } from './pages/mp-proc-disciplin/mp-proc-disciplin.component';
import { SerSancionesComponent } from './pages/ser-sanciones/ser-sanciones.component';

//Cambiar el locale de la app
import localeEsPe from '@angular/common/locales/es-PE';
//import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import { SenListaRestricComponent } from './pages/sen-lista-restric/sen-lista-restric.component';
import { UsersComponent } from './pages/users/users.component'
registerLocaleData(localeEsPe);
//registerLocaleData(localeFr);

/*
import { ImgModule } from '@coreui/angular'
import { GridModule } from '@coreui/angular'
import { TableModule } from '@coreui/angular'
import { UtilitiesModule } from '@coreui/angular'
import { AppComponent } from '../app.component';
*/

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
    SerSancionesComponent,
    SenListaRestricComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule

    /*ImgModule,
    GridModule,
    TableModule,
    UtilitiesModule*/
  ],
  providers: [DatePipe, {provide: LOCALE_ID, useValue: 'es-PE' }],
})
export class ProtectedModule { }
