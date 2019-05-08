import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-error-remind',
  templateUrl: './error-remind.component.html',
  styleUrls: ['./error-remind.component.less']
})
export class ErrorRemindComponent implements OnInit {
  public errorMsg: any = null;
  public errorMsgStatus: boolean;
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.errorMsgStatus = 'msg' in params;
        this.errorMsg = params;
      }
    );
  }
  public errorResetClick (): void {
    if (this.errorMsg.url.indexOf('open.weixin')) {
      window.location.href = this.errorMsg.url;
      return;
    }
    if (this.errorMsg.url) {
      this.router.navigate([this.errorMsg.url]);
      return;
    }
    window.history.back();
  }
}
