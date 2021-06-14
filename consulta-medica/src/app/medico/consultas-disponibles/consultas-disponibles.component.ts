import { Component, OnInit } from '@angular/core';
import { ConsultasDisponiblesService } from '../consultas-disponibles.service';
import {Router} from "@angular/router";
import { LoginService } from '../../login.service'

@Component({
  selector: 'app-consultas-disponibles',
  templateUrl: './consultas-disponibles.component.html',
  styleUrls: ['./consultas-disponibles.component.css']
})


export class ConsultasDisponiblesComponent implements OnInit {
  consultas:Array<Consulta>;
  idMedico:number=0;
  constructor(private consDisService:ConsultasDisponiblesService,private router: Router,private logService: LoginService) {
    this.consultas=new Array<Consulta>();
  }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response: any)=>{
      console.log(JSON.stringify(response));
      this.idMedico= Number.parseInt(response.idu) ;
      console.log(this.idMedico);
    });


    let JSON1;
    JSON1={};
    this.consDisService.consultasdisponibles(JSON1).subscribe((response:any)=>{
      for (const iterator of response) {
        let consulta=new Consulta(iterator.id,iterator.id_paciente,iterator.nombre,iterator.peso,iterator.talla,iterator.temperatura,iterator.presion_arterial,iterator.pulso_cardiaco,new Date(iterator.fecha));
        this.consultas.push(consulta);
      }
    });
  }

  createRoom(idCons:number){
    let JSON2={
      idConsulta:idCons,
      idMedico:this.idMedico
    };
    this.consDisService.llamandoPaciente(JSON2);
    this.router.navigate([`/${idCons}`]);

  }

}
class Consulta {
  idConsulta:number;
  idPaciente:number;
  nombrePaciente:string;
  peso:number;
  talla:number;
  temperatura:number;
  presion:number;
  pulso:number;
  fecha:Date;
  constructor(idConsulta: number, idPaciente: number, nombrePaciente:string, peso: number, talla: number, temperatura: number, presion: number, pulso: number, fecha: Date) {
    this.idConsulta=idConsulta;
    this.idPaciente=idPaciente;
    this.nombrePaciente=nombrePaciente;
    this.peso=peso;
    this.talla=talla;
    this.temperatura=temperatura;
    this.presion=presion;
    this.pulso=pulso;
    this.fecha=fecha;
  }
}