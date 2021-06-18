import { Component, OnInit } from '@angular/core';
import { RegistroPService } from '../registroP.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
 nombre:string="";
 fecha_nacimiento:string="";
 telefono:string="";
 disp:number=0;
  constructor(private RegPService: RegistroPService) { }

  ngOnInit(): void {
  }
  crearReg(){
    let JSON;
    JSON={
      
        nombre:this.nombre,fecha_nacimiento:this.fecha_nacimiento,telefono:this.telefono,disponibilidad:this.disp
      
    }
    this.RegPService.crearRegistro(JSON).subscribe((response: any)=>{
      console.log(response);  
      alert(response.message);
    });
    
  } 

}
