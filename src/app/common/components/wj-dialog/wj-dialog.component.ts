import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';

export class WjDialogPay {
  show?: boolean;
  title?: string;
  btnShow?: boolean;
  btnDisabled?: boolean;

  constructor(_show?: boolean, _title?: string, _btnShow?: boolean, _btnDisabled?: boolean ) {
    this.show = _show;
    this.title = _title;
    this.btnShow = _btnShow;
    this.btnDisabled = _btnDisabled;
  }
}
@Component({
  selector: 'app-wj-dialog',
  templateUrl: './wj-dialog.component.html',
  styleUrls: ['./wj-dialog.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WjDialogComponent implements OnInit {
  @Input() config = new WjDialogPay(true, '弹窗标题', true, true, );
  @Output() dialogPayClick: EventEmitter<{}> = new EventEmitter();
  @Output() dialogPayDestroy: EventEmitter<{}> = new EventEmitter();
  @ViewChild('password') passwordInput: ElementRef;
  public inputShow = false;
  constructor() { }
  ngOnInit() {}
  public onSubmit(): void {
    this.inputShow = false;
    this.dialogPayClick.emit({
      show: false,
    });
  }
  public onSelfDestroy(): void {
    this.dialogPayDestroy.emit({
      show: false,
    });
  }
}
