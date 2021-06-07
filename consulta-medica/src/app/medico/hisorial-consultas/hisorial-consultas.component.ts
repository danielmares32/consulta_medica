import { Component, OnInit } from '@angular/core';
import { HistorialConsultasService } from '../historial-consultas.service';

@Component({
  selector: 'app-hisorial-consultas',
  templateUrl: './hisorial-consultas.component.html',
  styleUrls: ['./hisorial-consultas.component.css']
})
export class HisorialConsultasComponent implements OnInit {
  idMedico:number;
  consultas:Array<Consulta>;
  constructor(private hist:HistorialConsultasService) {
    this.idMedico=2; //Se recopilará de las sesiones
    this.consultas=new Array<Consulta>();
  }

  ngOnInit(): void {
    let JSON1={
      idMedico:this.idMedico
    };
    this.hist.historialConsultas(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        let consulta=new Consulta(iterator.id,iterator.id_paciente,iterator.nombre,iterator.enfermedad,iterator.descripcion,iterator.peso,iterator.talla,iterator.temperatura,iterator.presion_arterial,iterator.pulso_cardiaco,new Date(iterator.fecha));
        this.consultas.push(consulta);
      }
    })
  }

}

class Consulta {
  idConsulta:number;
  idPaciente:number;
  nombrePaciente:string;
  enfermedad:string;
  descripcion:string;
  peso:number;
  talla:number;
  temperatura:number;
  presion:number;
  pulso:number;
  fecha:Date;
  constructor(idConsulta: number, idPaciente: number, nombrePaciente:string, enfermedad:string, descripcion:string, peso: number, talla: number, temperatura: number, presion: number, pulso: number, fecha: Date) {
    this.idConsulta=idConsulta;
    this.idPaciente=idPaciente;
    this.nombrePaciente=nombrePaciente;
    this.enfermedad=enfermedad;
    this.descripcion=descripcion;
    this.peso=peso;
    this.talla=talla;
    this.temperatura=temperatura;
    this.presion=presion;
    this.pulso=pulso;
    this.fecha=fecha;
  }
}