import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';
import {MineWalletService} from '../../common/services/mine-wallet.service';

@Component({
  selector: 'app-mine-wallet',
  templateUrl: './mine-wallet.component.html',
  styleUrls: ['./mine-wallet.component.less']
})
export class MineWalletComponent implements OnInit {
  public mineBalance: any = {};
  public mineWalletOrderInfo: any = null;
  // header
  public headerOption: HeaderContent = {
    title: '我的钱包',
    leftContent: {
      icon: 'icon iconfont icon-fanhui'
    },
    rightContent: {
      title: '收支明细',
      color: '#75B1F3'
    }
  };
  constructor(
    private router: Router,
    private mineWalletSrv: MineWalletService
  ) { }

  ngOnInit() {
    this.mineWalletSrv.getWalletAmount({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.mineBalance['balance'] = val.data['remainingSum'] + '.00';
          this.mineBalance['withdraw'] = val.data['remainingSum'] + '.00';
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `获取数据失败，错误码${val.status}`,
            url: null,
            btn: '请重试'
          }
        });
      }
    );
    this.mineWalletSrv.mineWalletIncome({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.mineWalletOrderInfo = val.dataObject;
          console.log(val);
          return;
        }
        this.router.navigate(['/error'], {
          queryParams: {
            msg: `获取数据失败，错误码${val.status}`,
            url: null,
            btn: '请重试'
          }
        });
      }
    );
  }
  public balapayClick(): void {
    this.router.navigate(['/mine/wallet/balapay']);
  }
}
