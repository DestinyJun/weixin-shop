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
  public tabGetPersonIncome(params): Observable<any> {
    return this.http.post(`/moayoOrder/myOrderInfo`, params);
  }
  public tabGetTeamTop(params): Observable<any> {
    return this.http.post(`/team/top`, params);
  }
  public tabGetClientAdrs(params): Observable<any> {
    return this.http.post(`/address/ListFindById`, params);
  }
}
