import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent, PickerService} from 'ngx-weui';
import {MineWalletService} from '../../../common/services/mine-wallet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet-balapay',
  templateUrl: './wallet-balapay.component.html',
  styleUrls: ['./wallet-balapay.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletBalapayComponent implements OnInit, OnDestroy {
  // mask
  @ViewChild('maskContent') maskContent: MaskComponent;
  // date picker
  srvRes: any = '';
  // header
  public headerOption: HeaderContent = {
    title: '收支明细',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      icon: 'fa fa-address-card-o',
      color: '#39A12D'
    }
  };
  // data
  public balapayList: any = [];
  constructor(
    private srv: PickerService,
    private mineWalletSrv: MineWalletService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.walletBalaPayInit({currentPage: '1', createddate: '2019-05'});
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public walletBalaPayInit(params): void {
    this.mineWalletSrv.mineWalletBalaPay(params).subscribe(
      (val) => {
        console.log(val);
        if (val.status === 200) {
          this.balapayList = val.datas;
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `服务器处理失败,错误代码：${val.status}！`,
            url: null,
            btn: '请重试',
          }});
      }
    );
  }
  public walletBalaPayTimeClick() {
    this.onShowBySrv();
  }
  public onShowBySrv() {
    this.srv.destroyAll();
    this.srv.showDateTime('date-ym', '', null, null, new Date()).subscribe((res: any) => {
      console.log(res);
      // this.srvRes = res.value;
      this.walletBalaPayInit({currentPage: '1', createddate: res.formaValue});
    });
  }
}
