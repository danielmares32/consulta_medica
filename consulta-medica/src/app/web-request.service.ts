import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://10.10.10.8:8081";
   }
   get (uri: string){
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }
   post (uri: string, payload: Object){
     console.log(payload);
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload);
  }
  patch (uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`,payload);
  }
  delete (uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
}
