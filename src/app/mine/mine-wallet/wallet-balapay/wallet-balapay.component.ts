import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MaskComponent, PickerService} from 'ngx-weui';

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
  constructor(
    private srv: PickerService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public walletBalaPayTimeClick() {
    this.onShowBySrv();
  }
  public onShowBySrv() {
    this.srv.destroyAll();
    this.srv.showDateTime('date-ym', '', null, null, new Date()).subscribe((res: any) => {
      console.log(res);
      this.srvRes = res.value;
    });
  }
}
