import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarExpedienteService {

  constructor(private webReqService: WebRequestService) { }
  actualizarExpediente(JSON: Object):any{
    console.log(JSON);
    return this.webReqService.post('actualizarExpediente',JSON);
  }
}
