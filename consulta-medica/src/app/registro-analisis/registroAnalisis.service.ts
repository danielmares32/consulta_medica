import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroAnalisis {

  constructor(private webReqService: WebRequestService) {}
  registrarDB(JSON: Object){
    return this.webReqService.post('registrarAnalisisDB',JSON);
  }
  postFile(fileToUpload: File, idPaciente:string): any {
    const formData: FormData = new FormData();
    formData.append('archivo', fileToUpload, idPaciente+'-'+fileToUpload.name);
    return this.webReqService.post('registrarAnalisis',formData);
  }
}