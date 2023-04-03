import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PmvServiceService {

  constructor(public http: HttpClient) { }

  public getMessage(): Observable<any>{
    debugger
    return this.http.get('http://localhost:8082/displayCurrent');
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/sendMessage', message);
  }
  sendEmergency(message: any): Observable<any> {
    return this.http.post<any>('http://localhost:8082/sendEmergency', message);
  }
}
