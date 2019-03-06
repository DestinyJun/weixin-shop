import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {

  constructor(
    private http: HttpClient
  ) { }
  public verifyReferrer(params): Observable<any> {
    return this.http.post(`/member/recommenderWorkId`, params);
  }
  public verifyPhone(params): Observable<any> {
    return this.http.post(`/member/sendSMS`, params);
  }
  public verifyCode(params): Observable<any> {
    return this.http.post(`/member/verifySMS`, params);
  }
}
