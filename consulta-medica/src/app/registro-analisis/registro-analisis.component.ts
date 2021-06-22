import { Component, OnInit } from '@angular/core';
import { RegistroAnalisis } from './registroAnalisis.service';

@Component({
  selector: 'app-registro-analisis',
  templateUrl: './registro-analisis.component.html',
  styleUrls: ['./registro-analisis.component.css']
})
export class RegistroAnalisisComponent implements OnInit {
  idPaciente:string='';
  fecha:string='';
  tipoAnalisis:string='';
  ruta:string='';
  fileToUpload: File = new File([new Blob()],'');
  constructor(private RegAnalisis:RegistroAnalisis) { }

  ngOnInit(): void {  }

  handleFileInput(element:any) {
    let file=element.target.files.item(0);
    this.fileToUpload = file;
  }

  registrar(): void {
    this.ruta='/analisisPacientes/'+this.idPaciente+'-'+this.fileToUpload.name;
    let JSON1={
      idPaciente:this.idPaciente,
      fecha:this.fecha,
      tipoAnalisis:this.tipoAnalisis,
      ruta:this.ruta
    };
    this.RegAnalisis.registrarDB(JSON1).subscribe((response:any)=>{
      alert(response.message);
    });
    this.RegAnalisis.postFile(this.fileToUpload,this.idPaciente).subscribe((response:any)=>{
      alert(response.message);
    });
  }
  
}
