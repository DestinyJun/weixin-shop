import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor(
    private http: HttpClient
  ) {}
  public tabGetClientList(): Observable<any> {
    return this.http.post(`/contacts/list`, {});
  }
  public tabDeleteClient(id): Observable<any> {
    return this.http.post(`/contacts/delete`, {id: id});
  }
  public tabSearchClientList(params): Observable<any> {
    return this.http.post(`/contacts/nameLike`, params);
  }
  public tabGetClientAdrs(params): Observable<any> {
    return this.http.post(`/address/ListFindById`, params);
  }
  // get user info
  public tabGetUserInfo(): Observable<any> {
    return this.http.post(`/member/userInfo`, {});
  }
  // get banner
  public tabGetBanner(): Observable<any> {
    return this.http.post(`/banner/getBanner`, {});
  }
}
