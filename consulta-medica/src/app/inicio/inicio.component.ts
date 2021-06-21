import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usr='';
  constructor(private logService: LoginService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    try{
      this.logService.sendSesion().subscribe((response: any)=>{
        console.log ('Respuesta en inicio: '+response);
        this.usr=response.usuario;
        console.log(JSON.stringify(response.rl));
        if(response.rl){
          console.log(response.rl);
          window.location.reload();
          response.rl=false;
          
          this.logService.reloadSes('{"rl":"false"}').subscribe((response2: any)=>{
            console.log(JSON.stringify(response2));
          });
        }
        console.log('Respuesta en inicio: '+JSON.stringify(response));
       
      });
    }catch(e ){
      console.log(e);
    }
    console.log('Hola bienvenido a Confirmacion de cuenta');
    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.queryParams.id) {
        console.log('id: ', this.route.snapshot.queryParams.id);
        
  }
    });
   
    
  }


  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    console.log(currentUrl);
    });
    }

}
