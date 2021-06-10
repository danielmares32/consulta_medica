import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListaPacientes {

  constructor(private webReqService: WebRequestService) {}
  listapacientes(JSON: Object):any {
    console.log(JSON);
    return this.webReqService.post('ListaPacientes',JSON);
  }
}