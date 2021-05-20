import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EnfermeraComponent } from './enfermera/enfermera.component';
import { MedicoComponent } from './medico/medico.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'login-component', component: LoginComponent },
  { path: 'enfermera-component', component: EnfermeraComponent },
  { path: 'medico-component', component: MedicoComponent },
  { path: 'registro-component', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
