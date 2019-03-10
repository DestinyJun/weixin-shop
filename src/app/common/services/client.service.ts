import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public http: HttpClient
  ) { }
  public clientAdd(params): Observable<any> {
    return this.http.post(`/contacts/add`, params);
  }
  public clientAddAddress(params): Observable<any> {
    return this.http.post(`/address/add`, params);
  }
}
