import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  // goods list
  public orderGetGoods(params): Observable<any> {
    return this.http.post('/goods/list', params);
  }
  // get invoice
  public orderGetInvoice(params): Observable<any> {
    return this.http.post(`/invoice/ListFindById`, params);
  }
  // add invoice
  public orderAddInvoice(params): Observable<any> {
    return this.http.post(`/invoice/add`, params);
  }
  // add order
  public orderPlace(params): Observable<any> {
    return this.http.post(`/moayoOrder/confirmOrder`, params);
  }
  // add order detail
  public orderGetDetail(params): Observable<any> {
    return this.http.post(`/moayoOrder/orderItem`, params);
  }
}
