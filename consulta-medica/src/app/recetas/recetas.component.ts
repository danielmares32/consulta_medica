import { Component, OnInit } from '@angular/core';
import { ObtenerReceta } from './obtenerReceta.service';
import { CrearPDF } from './crearPDF.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  recet: Array<Recetas>;

  constructor(private ObtRec: ObtenerReceta, private CrearPdf: CrearPDF) { 
    this.recet=new Array< Recetas>();
  }

  ngOnInit(): void {
    let JSON1={};

    this.ObtRec.ObtenerRec(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        let rec=new Recetas(iterator.paciente, iterator.fecha,iterator.rec,iterator.diagnostico, parseInt(iterator.idPac));
        this.recet.push(rec);
      }
    });
  }


  crearPDF(id: number){
    let conten;
        for (let index = 0; index < this.recet.length; index++) {
              if (this.recet[index].id_paciente=id) {
                conten='<div>'+'<h1>Salud Por Mexico</h1>'+'<h2>'+this.recet[index].paciente+'</h2>'+'<h3>Fecha:'+this.recet[index].fecha+'</h3>'+'<p>'+this.recet[index].diagnostico+'</p>'+'<p>'+this.recet[index].receta+'</p>'+'</div>';
              }
          
        }

    let JSON;
    JSON={
      
        contenidoA:conten
      
    }
    this.CrearPdf.ObtenerPDF(JSON).subscribe((response: any)=>{ 
      alert(response.message); 
     
     
    });
    window.open('file:///C://Users//zkril//Desktop//WEB//ProyectoFinal2_0//consulta_medica//html-pdf.pdf',"Receta");
  } 
    
  }



class Recetas{
  paciente:string="";
  id_paciente:number=0;
  fecha: string="";
  receta: string="";
  diagnostico:string="";
    constructor( pac: string, fecha: string, rec: string, diag: string, id: number){
      this.paciente=pac;
      this.fecha=fecha;
      this.receta=rec;
      this.diagnostico=diag;
      this.id_paciente=id;
    }
}
