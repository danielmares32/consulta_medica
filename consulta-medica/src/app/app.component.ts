import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'consulta-medica';
  public isMenuCollapsed=true;
  public isFirst=true;
  public usr=';';
  public SesActiva=false;
  constructor(private logService: LoginService,private router:Router) { }

  ngOnInit(): void {
    console.log('Hola Bienvenido a root');
    try{
      this.logService.sendSesion().subscribe((response: any)=>{
        console.log('REspuesta en root'+response);
        this.usr=response.usuario;
       this.SesActiva=response.Activo;
        //this.router.navigate(['/inicio']);

     
      });
    }catch(e ){
      console.log(e);
    }
    
  }
  

  
}
