import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    public http: HttpClient
  ) { }
  // add
  public clientAdd(params): Observable<any> {
    return this.http.post(`/contacts/add`, params);
  }
  public clientSearchName(params): Observable<any> {
    return this.http.post(`/contacts/nameLike`, params);
  }
  public clientSearchInfo(params): Observable<any> {
    return this.http.post(`/contacts/findById`, params);
  }
  public clientNameUpdate(params): Observable<any> {
    return this.http.post(`/contacts/update`, params);
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
  public clientGetAddressItem(params): Observable<any> {
    return this.http.post(`/address/item`, params);
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

