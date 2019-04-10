import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public remindEvent = new EventEmitter<boolean>();
  public token: any = null;
  public addressEvent: any = null;
  public invoiceEvent: any = null;
  public orderPlaceInfo: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.orderPlaceInfo = sessionStorage;
    this.token = sessionStorage;
  }
  // orderPlaceInfo
  public orderPlaceSetObject(key: string, value: any): void {
    this.orderPlaceInfo[key] = JSON.stringify(value);
  }
  public orderPlaceGetObject(key: string): any {
    return JSON.parse(this.orderPlaceInfo[key] || 0);
  }
  public orderPlaceRemove(key: string): any {
    this.orderPlaceInfo.removeItem(key);
  }
  public orderPlaceDel(): any {
    this.orderPlaceInfo.clear();
  }
  // token
  public tokenSetObject(key: string, value: any): void {
    this.token[key] = JSON.stringify(value);
  }
  public tokenGetObject(key: string): any {
    return JSON.parse(this.token[key] || 0);
  }
  public tokenRemove(key: string): any {
    this.token.removeItem(key);
  }
  public tokenDel(): any {
    this.token.clear();
  }
}
