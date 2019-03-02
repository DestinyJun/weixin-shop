import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {Router} from '@angular/router';
import {MaskComponent} from 'ngx-weui';

@Component({
  selector: 'app-wallet-recharge',
  templateUrl: './wallet-recharge.component.html',
  styleUrls: ['./wallet-recharge.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WalletRechargeComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '余额充值',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      color: ''
    }
  };
  // mask
  @ViewChild('rechargeMask') rechargeMask: MaskComponent;
  public rechargeAmount: number;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  public rechargePayClick() {
    this.rechargeMask.hide();
    this.router.navigate(['/mine/wallet/success/1']);
  }
}
