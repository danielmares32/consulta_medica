import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usr=';';
  constructor(private logService: LoginService) { }

  ngOnInit(): void {
    try{
      this.logService.sendSesion().subscribe((response: any)=>{
        console.log(response);
        this.usr=response.usuario;
        console.log('Respuesta en inicio: '+JSON.stringify(response));
      });
    }catch(e ){
      console.log(e);
    }
    
  }

}
