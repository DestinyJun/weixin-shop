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
  public mineBalance: any = {
    balance: '0.00',
    withdraw: '0.00',
  };
  // header
  public headerOption: HeaderContent = {
    title: '我的钱包',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '收支明细',
      color: '#86B876'
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
          this.mineBalance.balance = val['remainingSum'];
          this.mineBalance.withdraw = val['remainingSum'];
        }
      }
    );
  }
  public balapayClick(): void {
    this.router.navigate(['/mine/wallet/balapay']);
  }
}
