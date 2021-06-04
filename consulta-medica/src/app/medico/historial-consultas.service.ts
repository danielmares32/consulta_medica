import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialConsultasService {

  constructor(private webReqService: WebRequestService) { }
  historialConsultas(JSON: Object):any{
    console.log(JSON);
    return this.webReqService.post('historialConsultas', JSON);
  }
}
