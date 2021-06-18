import { Component, OnInit } from '@angular/core';
import { ActualizarExpedienteService } from '../actualizar-expediente.service';
import { LoginService } from 'src/app/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-expediente',
  templateUrl: './actualizar-expediente.component.html',
  styleUrls: ['./actualizar-expediente.component.css']
})
export class ActualizarExpedienteComponent implements OnInit {
  idDiagnostico:number;
  idMedico:number;
  enfermedad:string;
  descripcion:string;
  constructor(private route: ActivatedRoute,private actService: ActualizarExpedienteService, private logService: LoginService,private router: Router) { 
    this.idDiagnostico=0;
    this.idMedico=0;
    this.enfermedad='';
    this.descripcion='';
  }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response:any)=>{
      this.idMedico=response.idu;
    });
    this.route.params.subscribe((params:any)=>{
      this.idDiagnostico=params.idConsulta;
    });
  }

  agregarConsulta(){
    let JSON1;
    JSON1={
      idDiagnostico:this.idDiagnostico,
      idMedico:this.idMedico,
      enfermedad:this.enfermedad,
      descripcion:this.descripcion
    };
    this.actService.actualizarExpediente(JSON1).subscribe((response:any)=>{
      alert(response.message);
    });
    setTimeout(()=>{
      this.router.navigate([`receta/${this.idDiagnostico}`]);
    },100);
  }

}
