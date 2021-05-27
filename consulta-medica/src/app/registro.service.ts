import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private webReqService: WebRequestService) { }

  crearRegistro(title: string) {
    this.webReqService.post('/registro', {title}); 
  }
}
