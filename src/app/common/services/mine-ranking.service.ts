import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MineRankingService {
  constructor(
    private http: HttpClient
  ) { }
  public mineRankingTeamTop(params): Observable<any> {
    return this.http.post(`/team/top`, params);
  }
  // order Income
  public mineRankingIncome(params): Observable<any> {
    return this.http.post(`/moayoOrder/myOrderInfo`, params);
  }
}

