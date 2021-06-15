import { Component, OnInit } from '@angular/core';
import { RegistroLab } from './registroLab.service';

@Component({
  selector: 'app-exam-lab',
  templateUrl: './exam-lab.component.html',
  styleUrls: ['./exam-lab.component.css']
})
export class ExamLabComponent implements OnInit {
IDP: number=0;
nombre_a:string="";
fecha:string="";
tipo:string="";
  constructor(private RegistroL:RegistroLab) { }

  ngOnInit(): void {
  }

  crearReg(){
    let JSON;
    JSON={
      
        nombre:this.nombre_a,fecha:this.fecha,id_paciente:this.IDP,tipo:this.tipo
      
    }
    this.RegistroL.registrolab(JSON).subscribe((response: any)=>{
      console.log(response);
    });
  } 
}
