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
  // Referrer
  public verifyReferrer(params): Observable<any> {
    return this.http.post(`/member/recommenderWorkId`, params);
  }
  // registered
  public regSignin(params): Observable<any> {
    return this.http.post(`/member/signin`, params);
  }
  // Landing
  public regLanding(params): Observable<any> {
    return this.http.post(`/login`, params);
  }
  // SMS code
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
