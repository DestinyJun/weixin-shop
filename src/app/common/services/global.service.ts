import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public remindEvent = new EventEmitter<any>();
  public addressEvent: any;
  constructor() { }
}
