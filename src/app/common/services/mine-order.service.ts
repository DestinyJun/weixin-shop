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
  // finish order
  public mineOrdFinish(params): Observable<any> {
    return this.http.post('/moayoOrder/finishOrder', params);
  }
  // order return
  public mineOrdReturn(params): Observable<any> {
    return this.http.post('/moayoOrder/refund', params);
  }
  // order return image upload
  public mineOrdImgUpload(params): Observable<any> {
    return this.http.post('/imageFileUpload', params);
  }
  // order delete
  public mineOrdCancel(params): Observable<any> {
    return this.http.post('/moayoOrder/canceled', params);
  }
  // order cancel
  public mineOrdDelete(params): Observable<any> {
    return this.http.post('/moayoOrder/deleteOrder', params);
  }
}
