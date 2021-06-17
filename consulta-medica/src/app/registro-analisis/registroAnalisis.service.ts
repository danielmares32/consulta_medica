import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroAnalisis {

  constructor(private webReqService: WebRequestService) {}
  registrarAnalisis(JSON: Object):any {
    console.log(JSON);
    return this.webReqService.post('registrarAnalisis',JSON);
  }
}