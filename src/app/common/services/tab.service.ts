import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor(
    private http: HttpClient
  ) {}
  public tabGetClientList(): Observable<any> {
    return this.http.post(`${environment.dev_test_url}/contacts/list`, {});
  }
  public tabDeleteClient(id): Observable<any> {
    return this.http.post(`${environment.dev_test_url}/contacts/delete`, {id: id});
  }
}
