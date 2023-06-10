import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import {IconModule, IconSetService} from "@coreui/icons-angular";
// import {ButtonModule} from "@coreui/angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

    // IconModule,
    // ButtonModule
  ],
  //providers: [/*IconSetService*/],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
