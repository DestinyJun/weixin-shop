import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
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
    if (this.errorMsg.url) {
      window.location.href = this.errorMsg.url;
      return;
    }
    window.history.back();
  }
}
