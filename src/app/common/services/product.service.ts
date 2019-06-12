import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  // get goods info
  public prodGetInfo(params): Observable<any> {
    return this.http.post(`/goods/item`, params);
  }
  // get banner
  public prodGetBanner(): Observable<any> {
    return this.http.post(`/banner/getBanner`, {});
  }
  public tabGetUserInfo(params): Observable<any> {
    return this.http.post(`/member/userInfo`, {});
  }
}
