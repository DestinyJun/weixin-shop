import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {

  constructor(
    private http: HttpClient
  ) { }
  public verifyReferrer(params): Observable<any> {
    return this.http.post(`${environment.dev_test_url}/member/recommenderWorkId`, params);
  }
  public verifyPhone(params): Observable<any> {
    return this.http.post(`${environment.dev_test_url}/member/sendSMS`, params);
  }
  public verifyCode(params): Observable<any> {
    return this.http.post(`${environment.dev_test_url}/member/verifySMS`, params);
  }
}
