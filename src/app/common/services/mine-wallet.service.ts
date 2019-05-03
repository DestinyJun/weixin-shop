import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MineWalletService {

  constructor(
    private http: HttpClient
  ) { }
  // get money
  public getWalletAmount(params): Observable<any> {
    return this.http.post('/wallet/remainingSum', params);
  }
  // recharge money
  public mineWalletRecharge(params): Observable<any> {
    console.log(params);
    return this.http.post('/moayoOrder/topUp', params);
  }
  // verify password
  public mineWalletVerifyPwd(params): Observable<any> {
    return this.http.post(`/orderPay/payPwd`, params);
  }
  // weixin pay
  public mineWalletWxVerify(params): Observable<any> {
    window.alert(JSON.stringify(params));
    return this.http.post(`/orderPay/orderWxPay`, params);
  }
}
