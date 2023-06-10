import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';

/*
import {
  //AlertModule,
  AvatarModule, 
  ButtonDirective,
  ButtonGroupModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
  WidgetModule
} from "@coreui/angular";

import {IconModule} from '@coreui/icons-angular';
*/

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule

/*    //AlertModule,
    AvatarModule,
    ButtonDirective,
    ButtonGroupModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    WidgetModule,

    IconModule*/
  ]
})
export class AuthModule { }
