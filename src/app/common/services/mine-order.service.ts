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
  // order 订单状态（'':全部订单，pendingPayment:待付款订单，shipped:发货订单，completed:已完成订单）
  public getMineOrderList(params): Observable<any> {
    return this.http.post(`/moayoOrder/selectOrder`, params);
  }
}
