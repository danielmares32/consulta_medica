import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private webReqService: WebRequestService) { }

  historia(JSON: Object){
    return this.webReqService.post('getDatos',JSON);
  }
  datosPersonales(JSON: Object){
    return this.webReqService.post('getDatosPersonales',JSON);
  }
  laboratorio(JSON: Object){
    return this.webReqService.post('getResultadosLab', JSON);
  }
  descarga(JSON: Object){
    return this.webReqService.post('descargarDocumento',JSON);
  }
}
