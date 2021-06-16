import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  nombre:string='';
  usr:string='';
  Pass:string='';
  disp:number=0;
  mail:string='';
  coPass:string='';
  constructor(private RegService: RegistroService) { }

  ngOnInit(): void {
  }
  crearReg(){
    let JSON;
    JSON={
        nombre:this.nombre,usuario:this.usr,contrasena:this.Pass,disponibilidad:this.disp,correo:this.mail
    }
    this.RegService.crearRegistro(JSON).subscribe((response: any)=>{
      console.log(response);
    });
  }

}
