import { Component, OnInit } from '@angular/core';
import { ConsultasDisponiblesService } from '../consultas-disponibles.service';

@Component({
  selector: 'app-consultas-disponibles',
  templateUrl: './consultas-disponibles.component.html',
  styleUrls: ['./consultas-disponibles.component.css']
})


export class ConsultasDisponiblesComponent implements OnInit {
  consultas:Array<Consulta>;
  constructor(private consDisService:ConsultasDisponiblesService) {
    this.consultas=new Array<Consulta>();
  }

  ngOnInit(): void {
    let JSON1;
    JSON1={}
    this.consDisService.consultasdisponibles(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        let consulta=new Consulta(iterator.id,iterator.id_paciente,iterator.peso,iterator.talla,iterator.temperatura,iterator.presion_arterial,iterator.pulso_cardiaco,new Date(iterator.fecha));
        this.consultas.push(consulta);
      }
    });
  }

}
class Consulta {
  idConsulta:number;
  idPaciente:number;
  peso:number;
  talla:number;
  temperatura:number;
  presion:number;
  pulso:number;
  fecha:Date;
  constructor(idConsulta: number, idPaciente: number, peso: number, talla: number, temperatura: number, presion: number, pulso: number, fecha: Date) {
    this.idConsulta=idConsulta;
    this.idPaciente=idPaciente;
    this.peso=peso;
    this.talla=talla;
    this.temperatura=temperatura;
    this.presion=presion;
    this.pulso=pulso;
    this.fecha=fecha;
  }
}