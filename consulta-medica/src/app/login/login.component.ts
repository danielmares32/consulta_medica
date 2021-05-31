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

  login(){
    let JSON;
    JSON={
      
       usuario:this.usr,contrasena:this.Pass
      
    }
    this.logService.login(JSON).subscribe((response: any)=>{
      console.log(response);
    });
  }

}
