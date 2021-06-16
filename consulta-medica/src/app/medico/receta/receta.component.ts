import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  idDiagnostico:number;
  contenido:string;
  constructor(private recService:RecetaService) {
    this.idDiagnostico=4; //Se recuperará de las sesiones
    this.contenido='';
  }

  ngOnInit(): void {
  }

  agregarReceta(){
    let JSON1={
      idDiagnostico:this.idDiagnostico,
      contenido:this.contenido
    }
    this.recService.receta(JSON1).subscribe((response:any)=>{
      alert(response.message);
    });
  }
}
