import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MedicoComponent } from './medico/medico.component';
import { PersonalComponent } from './personal/personal.component';
import  { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { VistaEnfermeraComponent } from './vista-enfermera/vista-enfermera.component';
import { HisorialConsultasComponent } from './medico/hisorial-consultas/hisorial-consultas.component';
import { ConsultasDisponiblesComponent } from './medico/consultas-disponibles/consultas-disponibles.component';
import { ActualizarExpedienteComponent } from './medico/actualizar-expediente/actualizar-expediente.component';
import { RecetaComponent } from './medico/receta/receta.component';
import { RoomComponent } from './room/room.component';
import { RegistroAnalisisComponent } from './registro-analisis/registro-analisis.component';
import { RecetasComponent } from './recetas/recetas.component';

const routes: Routes = [
  { path: 'inicio', component:InicioComponent },
  { path: 'registro', component:RegistroComponent },
  { path: 'login', component:LoginComponent },
  { path: 'medico', component:MedicoComponent },
  { path: 'personal', component:PersonalComponent },
  { path: 'registroP', component:RegistroPacienteComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: 'vistaE', component: VistaEnfermeraComponent},
  { path: 'historialConsultas', component: HisorialConsultasComponent },
  { path: 'consultasDisponibles', component: ConsultasDisponiblesComponent },
  { path: 'actualizarExpediente/:idConsulta', component: ActualizarExpedienteComponent },
  { path: 'receta/:idConsulta', component:RecetaComponent },
  { path: 'room/:idConsulta', component:RoomComponent },
  {path: 'registroLab', component: RegistroAnalisisComponent},
  {path: 'Recetas', component: RecetasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
