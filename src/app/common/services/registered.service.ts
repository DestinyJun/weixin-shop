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
  public regSendSMS(params): Observable<any> {
    return this.http.post(`/member/sendSMS`, params);
  }
  public regVerifySMS(params): Observable<any> {
    return this.http.post(`/member/verifySMS`, params);
  }
  public regVerifyPayCode(params): Observable<any> {
    return this.http.post(`/member/setPayPwd`, params);
  }
}
