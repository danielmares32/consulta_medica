import { Component, OnInit } from '@angular/core';
import { ObtenerReceta } from './obtenerReceta.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  recet: Array<Recetas>;

  constructor(private ObtRec: ObtenerReceta) { 
    this.recet=new Array< Recetas>();
  }

  ngOnInit(): void {
    let JSON1={};

    this.ObtRec.ObtenerRec(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        let rec=new Recetas(iterator.paciente, iterator.fecha,iterator.rec,iterator.diagnostico);
        this.recet.push(rec);
      }
    });
  }

}

class Recetas{
  paciente:string="";
  fecha: string="";
  receta: string="";
  diagnostico:string="";
    constructor( pac: string, fecha: string, rec: string, diag: string){
      this.paciente=pac;
      this.fecha=fecha;
      this.receta=rec;
      this.diagnostico=diag;
    }
}
