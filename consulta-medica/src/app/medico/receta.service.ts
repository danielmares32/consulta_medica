import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private webReqService: WebRequestService) { }
  receta(JSON: Object):any{
    console.log(JSON);
    return this.webReqService.post('agregarReceta',JSON);
  }
}
