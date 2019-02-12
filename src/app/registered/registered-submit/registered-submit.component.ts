import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-registered-submit',
  templateUrl: './registered-submit.component.html',
  styleUrls: ['./registered-submit.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class RegisteredSubmitComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }

  public onSendCode(): Observable<boolean> {
    return timer(1000).pipe(map((v, i) => {
      console.log(v);
      console.log(i);
      return false;
    }));
  }


}
