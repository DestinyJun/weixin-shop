import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-success',
  templateUrl: './registered-success.component.html',
  styleUrls: ['./registered-success.component.less']
})
export class RegisteredSuccessComponent implements OnInit {
  public user = '100101';
  constructor() { }

  ngOnInit() {
  }

}
