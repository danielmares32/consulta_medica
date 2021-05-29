import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MedicoComponent } from './medico/medico.component';
import { PersonalComponent } from './personal/personal.component';
import  { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import {ConsultaComponent} from './consulta/consulta.component';
import {VistaEnfermeraComponent} from './vista-enfermera/vista-enfermera.component';

const routes: Routes = [
  { path: 'inicio', component:InicioComponent },
  { path: 'registro', component:RegistroComponent },
  { path: 'login', component:LoginComponent },
  { path: 'medico', component:MedicoComponent },
  { path: 'personal', component:PersonalComponent },
  { path: 'registroP', component:RegistroPacienteComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: 'vistaE', component: VistaEnfermeraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
