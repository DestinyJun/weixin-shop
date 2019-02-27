import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {HeaderContent} from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  @Input() public option =  new HeaderContent();
  @Input () public leftShow = true;
  @Input () public rightShow = true;
  @Output() public headerLeftClick = new EventEmitter<any>();
  @Output() public headerCenterClick = new EventEmitter<any>();
  @Output() public headerRightClick = new EventEmitter<any>();
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {}
  public leftClick (): void {
    window.history.back();
    this.headerLeftClick.emit({});
  }
  public centerClick (): void {
    this.headerCenterClick.emit({});
  }
  public rightClick (): void {
    this.headerRightClick.emit({});
  }
}

