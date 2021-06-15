import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule,Routes} from '@angular/router';

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
import { RecetaComponent } from './medico/receta/receta.component';
import { RoomComponent } from './room/room.component';
import { SocketIoModule } from "ngx-socket-io";

const routes:Routes = [
  {path: 'inicio', component: LoginComponent}
];


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
    ActualizarExpedienteComponent,
    RecetaComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot({
      url: '/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
