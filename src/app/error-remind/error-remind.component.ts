import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalService} from '../common/services/global.service';
@Component({
  selector: 'app-error-remind',
  templateUrl: './error-remind.component.html',
  styleUrls: ['./error-remind.component.less']
})
export class ErrorRemindComponent implements OnInit {
  public errorMsg: any = null;
  public errorMsgStatus: boolean;
  public errorToken = true;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    if (!this.globalService.wxSessionGetObject('token')) {
    this.errorToken = false;
    }
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.errorMsgStatus = 'msg' in params;
        this.errorMsg = params;
      }
    );
  }
  public errorResetClick (): void {
    if (this.errorMsg.url) {
      if (this.errorMsg.url.indexOf('open.weixin')) {
        window.location.href = this.errorMsg.url;
        return;
      }
      this.router.navigate([this.errorMsg.url]);
      return;
    }
    window.history.back();
  }
}
