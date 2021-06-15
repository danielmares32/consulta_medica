import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ListaDoctores {

  constructor(private webReqService: WebRequestService) {}
  listadoctores(JSON: Object):any {
    console.log(JSON);
    return this.webReqService.post('ListaDoctores',JSON);
  }
}