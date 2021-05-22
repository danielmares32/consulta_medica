import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MedicoComponent } from './medico/medico.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  { path: 'inicio', component:InicioComponent },
  { path: 'registro', component:RegistroComponent },
  { path: 'login', component:LoginComponent },
  { path: 'medico', component:MedicoComponent },
  { path: 'personal', component:PersonalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
