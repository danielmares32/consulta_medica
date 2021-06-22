import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CrearPDF {

  constructor(private webReqService: WebRequestService) {}
  ObtenerPDF(JSON: Object){
    return this.webReqService.post('crearPdf',JSON);
  }
 
}