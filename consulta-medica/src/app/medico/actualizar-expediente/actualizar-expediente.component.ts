import { Component, OnInit } from '@angular/core';
import { ActualizarExpedienteService } from '../actualizar-expediente.service';

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
  constructor(private actService: ActualizarExpedienteService) { 
    this.idDiagnostico=4; //Se recopilará de las sesiones
    this.idMedico=2; //Se recopilará de las sesiones
    this.enfermedad='';
    this.descripcion='';
  }

  ngOnInit(): void {
  }

  agregarConsulta(){
    let JSON1;
    JSON1={
      idDiagnostico:this.idDiagnostico,
      idMedico:this.idMedico,
      enfermedad:this.enfermedad,
      descripcion:this.descripcion
    }
    this.actService.actualizarExpediente(JSON1).subscribe((response:any)=>{
      alert(response.message);
    })
  }

}
