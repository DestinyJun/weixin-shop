import { Component, OnInit } from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mine-wallet',
  templateUrl: './mine-wallet.component.html',
  styleUrls: ['./mine-wallet.component.less']
})
export class MineWalletComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit() {
  }
  public balapayClick(): void {
    this.router.navigate(['/mine/wallet/balapay']);
  }
}
