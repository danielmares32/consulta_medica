import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usr:string='';
  Pass:string='';
  constructor(private logService: LoginService) { }

  ngOnInit(): void {
  }
  respuesta:string='';
  usrConect:string='';
  usrid:string='';
  login(){
    let JSON1;
    JSON1={
      
       usuario:this.usr,contrasena:this.Pass
      
    }
    this.logService.login(JSON1).subscribe((response: any)=>{
      //console.log(response);
      this.respuesta=response;
      this.respuesta=response.message;
      this.usrConect=response.usr;
      this.usrid=response.idusr;
      console.log(this.respuesta);
      console.log('respuesta: '+JSON.stringify(this.respuesta));
    });
    
  }

}
