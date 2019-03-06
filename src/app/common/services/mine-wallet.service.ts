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
  public getWalletAmount(params): Observable<any> {
    return this.http.post('/wallet/remainingSum', params);
  }
}
