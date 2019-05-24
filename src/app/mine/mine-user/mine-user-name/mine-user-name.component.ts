import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderContent} from '../../../common/components/header/header.model';
import {MineService} from '../../../common/services/mine.service';
import {ToastComponent} from 'ngx-weui';
import {timer} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-mine-user-name',
  templateUrl: './mine-user-name.component.html',
  styleUrls: ['./mine-user-name.component.less']
})
export class MineUserNameComponent implements OnInit {
  // toast
  @ViewChild('success') successToast: ToastComponent;
  // header
  public headerOption: HeaderContent = {
    title: '更改名字',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '保存',
      icon: '',
      color: '#39A12D'
    }
  };
  // data
  public nikeName = {
    nikeName: ''
  };
  public updateNicMsg: string;
  constructor(
    private mineSrv: MineService
  ) { }

  ngOnInit() {
  }
  public mineUserNicUpdate(): void {
    this.mineSrv.mineUpdateUserName(this.nikeName).subscribe(
      (val) => {
        if (val.status === 200) {
          this.updateNicMsg = '修改成功';
          this.onToastShow('success');
          timer(1000).subscribe(
            (time) => {
              window.history.back();
            }
          );
          return;
        }
        this.updateNicMsg = `修改失败，错误代码：${val.status}`;
        this.onToastShow('success');
      }
    );
  }
  public onToastShow(type: 'success' | 'loading') {
    (<ToastComponent>this[`${type}Toast`]).onShow();
  }
}
