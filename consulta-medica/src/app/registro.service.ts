import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private webReqService: WebRequestService) { }

  crearRegistro(JSON: Object) {
    console.log(JSON);
     return this.webReqService.post('registroMedico',JSON); 
  }
}
