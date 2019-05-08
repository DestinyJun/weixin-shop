import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MineSettingService {

  constructor(
    private http: HttpClient
  ) { }
  // SMS code
  public mineSetSendSMS(params): Observable<any> {
    return this.http.post(`/member/sendSMS`, params);
  }
  // SMS verify
  public mineSetVerifySMS(params): Observable<any> {
    return this.http.post(`/member/verifySMS`, params);
  }
  // update phone
  public mineSetUpdatePhone(params): Observable<any> {
    return this.http.post(`/member/setUserName`, params);
  }
  // get user info
  public mineSetUserInfo(): Observable<any> {
    return this.http.post(`/member/userInfo`, {});
  }
}
