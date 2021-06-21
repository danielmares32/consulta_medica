import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ObtenerReceta {

  constructor(private webReqService: WebRequestService) {}
  ObtenerRec(JSON: Object){
    return this.webReqService.post('obtenerRec',JSON);
  }
 
}