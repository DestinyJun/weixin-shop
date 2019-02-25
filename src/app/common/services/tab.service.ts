import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor(
    private http: HttpClient
  ) {}
  /*public tabGetClient(): Observable<any> {
    return this.http.post<any>(`${environment.dev_test_url}/contacts/list`, {}, httpOptions);
  }

  private handleError(addHero: string, hero: any) {
    console.log(hero);
    return undefined;
  }*/
}
