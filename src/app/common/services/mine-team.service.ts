import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MineTeamService {

  constructor(
    private http: HttpClient
  ) { }
  public mineTeamGetDate(params): Observable<any> {
    return this.http.post('/team/listByUserAndDate', params);
  }
  public mineTeamGetEarn(params): Observable<any> {
    return this.http.post('/team/earningsScreen', params);
  }
  // team member
  public mineTeamGetMember(params): Observable<any> {
    return this.http.post('/team/teamList', params);
  }
  // menmber detail
  public mineTeamGetMemberEarn(params): Observable<any> {
    return this.http.post('/team/teamEarningsItem', params);
  }
}
