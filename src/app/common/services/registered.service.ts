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
  public regRegister(params): Observable<any> {
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
  // SMS verify
  public regVerifySMS(params): Observable<any> {
    return this.http.post(`/member/verifySMS`, params);
  }
  // get wx user info
  public regGetWxUserInfo(params): Observable<any> {
    console.log(params);
    return this.http.get(`/wx/userinfo?access_token=${params.access_token}&openid=${params.openid}`);
  }
}
