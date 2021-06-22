import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private webReqService: WebRequestService,private http: HttpClient) { }

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
    return this.http.post(`https://10.10.10.8:8081/descargarDocumento`,JSON,{responseType:`blob`});
  }
}
