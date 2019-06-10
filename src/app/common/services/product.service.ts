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
  // get banner
  public prodGetInfo(params): Observable<any> {
    return this.http.post(`/goods/item`, params);
  }
}
