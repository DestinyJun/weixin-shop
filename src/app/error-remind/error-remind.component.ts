import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GlobalService} from '../common/services/global.service';
import {is_wx} from '../common/tools/is_wx';
@Component({
  selector: 'app-error-remind',
  templateUrl: './error-remind.component.html',
  styleUrls: ['./error-remind.component.less']
})
export class ErrorRemindComponent implements OnInit {
  public errorMsg: any = null;
  public errorMsgStatus: boolean;
  public errorToken = true;
  public errorStatus = false;
  public is_wx = is_wx();
  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private location: Location,
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
    this.routerInfo.data.subscribe(
      (params: Params) => {
        this.errorStatus = 'status' in params;
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
    this.location.back();
  }
}
