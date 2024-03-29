import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ListaPacientes } from './lista-pacientes.service';
import { ListaDoctores } from './lista-doctores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-enfermera',
  templateUrl: './vista-enfermera.component.html',
  styleUrls: ['./vista-enfermera.component.css']
})
export class VistaEnfermeraComponent implements OnInit {

  tipo:String="";
  pacientes:Array<paciente>;
  doctores: Array<Doctor>;
  constructor(private listP: ListaPacientes,private listD: ListaDoctores,private logService: LoginService, private router:Router) {
    this.pacientes=new Array<paciente>();
    this.doctores= new Array<Doctor>();
   }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response: any)=>{
     
        console.log(JSON.stringify(response));
        this.tipo= response.tipo;
        console.log(this.tipo);
    });

      let JSON1={};

      this.listP.listapacientes(JSON1).subscribe((response:any)=>{
        for (const iterator of response) {
          let Paciente=new paciente(iterator.nombre,iterator.id_paciente);
          this.pacientes.push(Paciente);
        }
      });


      let JSON2={};

      this.listD.listadoctores(JSON2).subscribe((response:any)=>{
        for (const iterator of response) {
          let doctor=new Doctor(iterator.nombre,iterator.id);
          this.doctores.push(doctor);
        }
      });
    
  }

  responder(idCons:string){
    this.router.navigate([`room/${idCons}`]);
  }

}

class paciente{
    nombreP:String="";
    idPaciente:number=0;
    constructor(nombrePa: String, idP: number){
      this.nombreP=nombrePa;
      this.idPaciente=idP;
    }
}

class Doctor{
  nombreD: String="";
  idDiagnostico: string="";
  constructor(nombreDo: string, idDiagnostico: string){
    this.nombreD=nombreDo;
    this.idDiagnostico=idDiagnostico;
  }

}
