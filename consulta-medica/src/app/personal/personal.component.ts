import { Component, OnInit } from '@angular/core';
import { RegistroPerService } from '../registroPer.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  nombre:string="";
  usuario:string="";
  contrasena:string="";
  correo:string="";
  tipo:string="";

  constructor(private RegPerService: RegistroPerService) { }

  ngOnInit(): void {
  }

  crearReg(){
    let JSON;
    JSON={
      
        nombre:this.nombre,usuario:this.usuario,contraseña:this.contrasena,correo:this.correo,tipo:this.tipo
      
    }
    this.RegPerService.crearRegistro(JSON).subscribe((response: any)=>{
      console.log(response);
    });
  } 

}
