import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  idDiagnostico:number;
  contenido:string;
  constructor(private route: ActivatedRoute,private recService:RecetaService,private router: Router) {
    this.idDiagnostico=0;
    this.contenido='';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.idDiagnostico=params.idConsulta;
    });
  }

  agregarReceta(){
    let JSON1={
      idDiagnostico:this.idDiagnostico,
      contenido:this.contenido
    }
    this.recService.receta(JSON1).subscribe((response:any)=>{
      alert(response.message);
    });
    setTimeout(()=>{
      this.router.navigate(['inicio']);
    },100);
  }
}
