import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {GlobalService} from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private globalSrv: GlobalService,
    private router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
   /* if (this.globalSrv.wxSessionGetObject('token')) {
      return true;
    }
    this.router.navigate(['/error'], {queryParams: {msg: '您还未登陆，请您登陆后在访问', url: '//www.baidu.com', btn: '点击登陆'}});
    return false;*/
  }
}
