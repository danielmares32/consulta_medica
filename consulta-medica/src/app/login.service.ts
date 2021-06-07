import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webReqService: WebRequestService) { }
   login(JSON: Object):any {
    console.log(JSON);
    
     return this.webReqService.post('loginMedico',JSON); 
  }

  sendSesion(){
    return this.webReqService.get('');
  }

  reloadSes(JSON1: Object):any{
    console.log(JSON);
    
    return this.webReqService.post('rl',JSON); 
  }

}
