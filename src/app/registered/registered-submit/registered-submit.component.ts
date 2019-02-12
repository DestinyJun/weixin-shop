import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {DialogComponent, DialogConfig, SkinType, InputType, DialogService, ToastService} from 'ngx-weui';

@Component({
  selector: 'app-registered-submit',
  templateUrl: './registered-submit.component.html',
  styleUrls: ['./registered-submit.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredSubmitComponent implements OnInit, OnDestroy {
  public submitStatus: boolean;
  public headerOption: HeaderContent = {
    title: '注册',
    leftContent: {
      icon: 'fa fa-times'
    },
    rightContent: {
      icon: 'fa fa-ellipsis-h'
    }
  };
  public submitPhone: number;
  public submitCode: number;

  private DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '弹窗标题',
    content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    cancel: '辅助操作',
    confirm: '主操作',
    inputPlaceholder: '必填项',
    inputError: '请填写或选择项',
    inputRequired: true,
    inputAttributes: {
      maxlength: 140,
      cn: 2
    },
    inputOptions: [
      { text: '请选择' },
      { text: '杜蕾斯', value: 'durex', other: 1 },
      { text: '杰士邦', value: 'jissbon' },
      { text: '多乐士', value: 'donless' },
      { text: '处男', value: 'first' }
    ]
  };

  // agreeDialog组件
  @ViewChild('agreeDialog') iosAgreeDialog: DialogComponent;
  public configAgreeDialog: DialogConfig = {};

  // payDialog组件
  @ViewChild('payDialog') iosPayDialog: DialogComponent;
  public configPayDialog: DialogConfig = {};

  constructor(private srv: DialogService, private toastService: ToastService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.srv.destroyAll();
  }
  public onSendCode(): Observable<boolean> {
    return timer(1000).pipe(map((v, i) => {
      this.submitStatus = true;
      setTimeout(() => {
        this.submitStatus = false;
      }, 3000);
      console.log(v);
      console.log(i);
      return this.submitStatus;
    }));
  }
  public dialogAgreeShow(type: SkinType) {
    this.configAgreeDialog = Object.assign({}, <DialogConfig>{
      cancel: null,
      confirm: '同意',
      content: '都会发生记得发货时间快点恢复数据返回数据' +
        '收到附件是风景还是看花费时间客户反馈撒旦解放和' +
        '技术开发会尽快答复函数的积分和捷克首都和封建时代' +
        '回复精神科大夫'
    });
    setTimeout(() => {
      (<DialogComponent>this[`${type}AgreeDialog`]).show().subscribe((res: any) => {
        console.log('type', res);
      });
    }, 10);
    return false;
  }
}
