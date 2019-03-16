import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MineService {

  constructor(
    private http: HttpClient
  ) { }
  public mineGetQrImg(params): Observable<any> {
    return this.http.post('/member/qrCode', params);
  }
}
