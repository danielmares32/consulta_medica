import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultasDisponiblesService {

  constructor(private webReqService: WebRequestService) {}
    consultasdisponibles(JSON: Object):any {
      console.log(JSON);
      return this.webReqService.post('consultasDisponibles',JSON);
    }
}

