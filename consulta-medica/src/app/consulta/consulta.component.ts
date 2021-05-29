import { Component, OnInit } from '@angular/core';
import { RegistroCService } from '../registroC.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
 ID:number=0;
peso:string="";
talla:string="";
temperatura:number=0;
presion_arterial:number=0;
pulso_cardiaco:number=0;
fecha:string="";

  constructor(private RegCService: RegistroCService) { }

  ngOnInit(): void {
  }
  crearReg(){
    let JSON;
    JSON={
      
        id_paciente:this.ID,peso:this.peso,talla:this.talla,temperatura:this.temperatura,presion_arterial:this.presion_arterial,pulso_cardiaco:this.pulso_cardiaco, fecha:this.fecha
      
    }
    this.RegCService.crearRegistro(JSON).subscribe((response: any)=>{
      console.log(response);
    });
  } 

}
