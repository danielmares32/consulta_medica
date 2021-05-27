import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private RegService: RegistroService) { }

  ngOnInit(): void {
  }
  crearReg(title: string){
    this.RegService.crearRegistro
  }

}
