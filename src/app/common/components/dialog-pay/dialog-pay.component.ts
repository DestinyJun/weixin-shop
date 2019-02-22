import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ComponentRef} from '@angular/core';
export class DialogPay {
  show?: boolean;
  value?: Array<string>;
  inputDisabled?: boolean;
  btnShow?: boolean;
  pwdShow?: boolean;
  constructor(_show?: boolean, _value?: Array<string>, _inputDisabled?: boolean, _btnShow?: boolean, _pwdShow?: boolean) {
    this.show = _show;
    this.value = _value;
    this.inputDisabled = _inputDisabled;
    this.btnShow = _btnShow;
    this.pwdShow = _pwdShow;
  }
}
@Component({
  selector: 'app-dialog-pay',
  templateUrl: './dialog-pay.component.html',
  styleUrls: ['./dialog-pay.component.less']
})

export class DialogPayComponent implements OnInit {
  @Input() config = new DialogPay(true, ['', '', '', '', '', ''], true, false, false);
  @Output() dialogPayClick: EventEmitter<{}> = new EventEmitter();
  @Output() dialogPayDestroy: EventEmitter<{}> = new EventEmitter();
  @ViewChild('password') passwordInput: ElementRef;
  public inputShow = false;
  public inputPws: any;
  constructor() { }
  ngOnInit() {}
  public onInput(event): void {
    if (event.target.value.length > 6) {
      event.target.value =  this.inputPws;
      return;
    }
    this.config.value = ['', '', '', '', '', ''];
    this.config.inputDisabled = false;
    this.inputPws = event.target.value;
    for (let i = 0; i < this.inputPws.length; i++) {
      this.config.value[i] = '❂';
    }
    if (this.inputPws.length === 6) {
      this.inputShow = true;
      this.config.inputDisabled = true;
      setTimeout(() => {
        this.inputShow = false;
      }, 50);
    }
  }
  public onSubmit(): void {
    this.inputShow = false;
    this.passwordInput.nativeElement.value = '';
    this.config.value = ['', '', '', '', '', ''];
    this.config.inputDisabled = false;
    this.dialogPayClick.emit({
      show: false,
      password: this.inputPws
    });
  }
  public onSelfDestroy(): void {
    this.dialogPayDestroy.emit({
      show: false,
      password: 'destroy'
    });
  }
}

