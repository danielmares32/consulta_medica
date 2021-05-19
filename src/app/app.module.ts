import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicoComponent } from './medico/medico.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { EnfermeraComponent } from './enfermera/enfermera.component';
>>>>>>> fe74584253d011074fb0b259c7fab80dcf48b9bd

@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    LoginComponent,
    RegistroComponent,
    EnfermeraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
