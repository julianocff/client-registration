import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomneComponent } from './homne/homne.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RegistrationComponent,
    HomneComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
