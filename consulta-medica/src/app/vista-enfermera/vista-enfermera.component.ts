import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-vista-enfermera',
  templateUrl: './vista-enfermera.component.html',
  styleUrls: ['./vista-enfermera.component.css']
})
export class VistaEnfermeraComponent implements OnInit {

  constructor(private logService: LoginService) { }

  ngOnInit(): void {
    this.logService.sendSesion().subscribe((response: any)=>{
      
    });
  }

}
