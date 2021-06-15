import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroLab {

  constructor(private webReqService: WebRequestService) {}
  registrolab(JSON: Object):any {
    console.log(JSON);
    return this.webReqService.post('RegistroLab',JSON);
  }
}