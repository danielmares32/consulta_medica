import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webReqService: WebRequestService) { }
  login(JSON: Object) {
    console.log(JSON);
     return this.webReqService.post('login',JSON); 
  }
}
