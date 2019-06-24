import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }
  // get openid
  public loginGetOpenid(param): Observable<any> {
    return this.http.get('/wx/getOauth', {params: param});
  }
  // get ticket
  public loginGetTicket(param): Observable<any> {
    return this.http.get('/wx/getticket', {params: param});
  }
  // login auth
  public loginAuth(params): Observable<any> {
    return this.http.post('/login', params);
  }
}
