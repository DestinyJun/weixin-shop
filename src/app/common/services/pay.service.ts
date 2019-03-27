import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    public http: HttpClient
  ) { }
  // mine order detail
  public payOrdGetDetail(params): Observable<any> {
    return this.http.post(`/moayoOrder/orderItem`, params);
  }
  // pay order detail
  public payPwdVerify(params): Observable<any> {
    return this.http.post(`/orderPay/payPwd`, params);
  }
  // wallet pay
  public payWalletVerify(params): Observable<any> {
    return this.http.post(`/orderPay/orderWalletPay`, params);
  }
}
