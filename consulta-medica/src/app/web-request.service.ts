import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class WebRequestService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
   }
   get (uri: string){
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }
   post (uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  patch (uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  delete (uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
}
