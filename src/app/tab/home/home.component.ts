import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public tradeStatistics = [
    {bgColor: '#FF6565', timeTag: '今天', amount: '7', money: '1,762.00', dateStart: '2018年12月25日', dateEnd: null},
    {bgColor: '#65D2FF', timeTag: '本月', amount: '23', money: '69,762.00', dateStart: '2018年1月1日', dateEnd: '2018年1月30日'},
    {bgColor: '#7E65FF', timeTag: '本年', amount: '219', money: '3111,762.00', dateStart: '2018年1月1日', dateEnd: '2018年10月25日'},
    ];
  constructor() { }

  ngOnInit() {
    if (this.tradeStatistics[0].dateEnd) {
      console.log('1');
    }
  }

}
