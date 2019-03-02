import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wallet-success',
  templateUrl: './wallet-success.component.html',
  styleUrls: ['./wallet-success.component.less']
})
export class WalletSuccessComponent implements OnInit {
  public successStatus: number;
  constructor(
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeInfo.params.subscribe(
      (val) => {
        this.successStatus = val.status;
      }
    );
  }

}
