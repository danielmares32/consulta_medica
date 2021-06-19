import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usr:string='';
  Pass:string='';
  constructor(private logService: LoginService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
       console.log('id: ', this.route.snapshot.queryParams['id']);
       
 }
  }
  respuesta:string='';
  usrConect:string='';
  usrid:string='';
  mensaje:string='';

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
      console.log('respuesta login : '+JSON.stringify(this.respuesta));
      if(this.respuesta=='True')
        this.router.navigate(['/inicio']);
      else{
        this.mensaje='Login incorrecto; revise mayúsculas en su usuario y su contraseña';
      }
      //window.location.href='localhost:4200';

    });
    
  }

}
