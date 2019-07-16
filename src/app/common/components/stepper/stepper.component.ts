import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.less']
})
export class StepperComponent implements OnInit {
  @Input() max: number;
  @Input() min: number;
  @Output() blurChange = new EventEmitter();
  @Output() numChange = new EventEmitter();
  public num = 0;
  constructor() { }

  ngOnInit() {}
  public minusNums(): void {
    if (this.num <= 0) {
      this.num = 0;
    } else {
      this.num = this.num - 1;
    }
    this.numChange.emit(this.num);
  }
  public plusNums(): void {
    if (this.num >= this.max) {
      this.num = this.max;
      return;
    } else {
      this.num = this.num + 1;
    }
    this.numChange.emit(this.num);
  }
  public blueNums(): void {
    if (this.num <= 0) {
      this.num = 0;
    }
    if (this.num >= this.max) {
      this.num = this.max;
    }
    this.numChange.emit(this.num);
    this.blurChange.emit();
  }
}
