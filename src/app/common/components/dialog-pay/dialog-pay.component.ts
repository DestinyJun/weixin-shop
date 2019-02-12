import { Component, OnInit, Input } from '@angular/core';
class DialogPay {
  show: boolean;
  value: Array<number>;
  constructor(_show: boolean, _value: Array<number>) {
    this.show = _show;
    this.value = _value;
  }
}
@Component({
  selector: 'app-dialog-pay',
  templateUrl: './dialog-pay.component.html',
  styleUrls: ['./dialog-pay.component.less']
})

export class DialogPayComponent implements OnInit {
  @Input() config = new DialogPay(true, []);
  constructor() { }
  ngOnInit() {
    console.log(this.config);
  }

}

