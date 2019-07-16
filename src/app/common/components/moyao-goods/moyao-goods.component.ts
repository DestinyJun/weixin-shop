import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-moyao-goods',
  templateUrl: './moyao-goods.component.html',
  styleUrls: ['./moyao-goods.component.less']
})
export class MoyaoGoodsComponent implements OnInit, OnChanges {
  @Input() goodsList: any;
  @Output() numChange = new EventEmitter();
  @Output() blurChange = new EventEmitter();
  @Output() routerChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(): void {
    if (this.goodsList) {
      if (!(this.goodsList instanceof Array)) {
        this.goodsList = [this.goodsList];
      }
    }
  }
  public numsChange(mun, i) {
    this.numChange.emit({i: i, num: mun});
  }
  public onBlurChange(): void {
    this.blurChange.emit();
  }
}
