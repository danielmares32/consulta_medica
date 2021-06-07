import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';


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
  constructor(private logService: LoginService) { }

  ngOnInit(): void {
    try{
      this.logService.sendSesion().subscribe((response: any)=>{
        console.log(response);
        this.usr=response.usuario;
      });
    }catch(e ){
      console.log(e);
    }
    
  }
  

  
}
