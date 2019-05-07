import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-registered-success',
  templateUrl: './registered-success.component.html',
  styleUrls: ['./registered-success.component.less']
})
export class RegisteredSuccessComponent implements OnInit {
  public workId: any = null;
  constructor(
    private routerInfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.routerInfo.queryParams.subscribe(
      (params: Params) => {
        this.workId = params.workId;
      }
    );
  }

}
