import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import {map} from 'rxjs/internal/operators/map';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public http: HttpClient
  ) { }
  // client
  public clientAdd(params): Observable<any> {
    return this.http.post(`/contacts/add`, params);
  }
  public clientSearchName(params): Observable<any> {
    console.log(params);
    return this.http.post(`/contacts/nameLike`, params);
  }
  // address
  public clientAddAddress(params): Observable<any> {
    return this.http.post(`/address/add`, params);
  }
  public clientDelAddress(params): Observable<any> {
    return this.http.post(`/address/delete`, params);
  }
  public clientUpdateAddress(params): Observable<any> {
    return this.http.post(`/address/update`, params);
  }
  public clientGetAddress(params): Observable<any> {
    return this.http.post(`/address/ListFindById`, params);
  }
  // invoice
  public clientAddInvoice(params): Observable<any> {
    return this.http.post(`/invoice/add`, params);
  }
  public clientDelInvoice(params): Observable<any> {
    return this.http.post(`/invoice/delete`, params);
  }
  public clientUpdateInvoice(params): Observable<any> {
    return this.http.post(`/invoice/update`, params);
  }
  public clientGetInvoice(params): Observable<any> {
    return this.http.post(`/invoice/ListFindById`, params);
  }
}

