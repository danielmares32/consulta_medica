import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicoComponent } from './medico/medico.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonalComponent } from './personal/personal.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { VistaEnfermeraComponent } from './vista-enfermera/vista-enfermera.component';
import { HisorialConsultasComponent } from './medico/hisorial-consultas/hisorial-consultas.component';
import { ConsultasDisponiblesComponent } from './medico/consultas-disponibles/consultas-disponibles.component';
import { ActualizarExpedienteComponent } from './medico/actualizar-expediente/actualizar-expediente.component';
@NgModule({
  declarations: [
    AppComponent,
    MedicoComponent,
    LoginComponent,
    RegistroComponent,
    InicioComponent,
    PersonalComponent,
    RegistroPacienteComponent,
    ConsultaComponent,
    VistaEnfermeraComponent,
    HisorialConsultasComponent,
    ConsultasDisponiblesComponent,
    ActualizarExpedienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
