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
  // goods Item
  public orderGetGoodItem(params): Observable<any> {
    return this.http.post('/goods/item', params);
  }
  // get invoice
  public orderGetInvoice(params): Observable<any> {
    return this.http.post(`/invoice/ListFindById`, params);
  }
  // add invoice
  public orderAddInvoice(params): Observable<any> {
    return this.http.post(`/invoice/add`, params);
  }
  // delete invoice
  public orderDelInvoice(params): Observable<any> {
    return this.http.post(`/invoice/delete`, params);
  }
  // add order
  public orderPlace(params): Observable<any> {
    return this.http.post(`/moayoOrder/confirmOrder`, params);
  }
  // add order detail
  public orderGetDetail(params): Observable<any> {
    return this.http.post(`/moayoOrder/orderItem`, params);
  }
  // update invoice
  public orderUpdInvoice(params): Observable<any> {
    return this.http.post(`/invoice/update`, params);
  }
}
