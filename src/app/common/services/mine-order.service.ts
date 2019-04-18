import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MineOrderService {

  constructor(
    public http: HttpClient
  ) { }
  // order
  public getMineOrderList(params): Observable<any> {
    return this.http.post(`/moayoOrder/selectOrder`, params);
  }
  // mine order detail
  public mineOrdGetDetail(params): Observable<any> {
    return this.http.post(`/moayoOrder/orderItem`, params);
  }
  // get order number
  public mineOrdGetNum(): Observable<any> {
    return this.http.post('/moayoOrder/selectOrderNum', {});
  }
}
