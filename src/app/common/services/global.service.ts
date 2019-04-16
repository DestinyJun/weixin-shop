import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public remindEvent = new EventEmitter<boolean>();
  public addressEvent: any = null;
  public invoiceEvent: any = null;
  public wxSessionStore: any;
  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.wxSessionStore = sessionStorage;
  }
  // orderPlaceInfo
  public wxSessionSetObject(key: string, value: any): void {
    this.wxSessionStore[key] = JSON.stringify(value);
  }
  public wxSessionGetObject(key: string): any {
    return JSON.parse(this.wxSessionStore[key] || 0);
  }
  public wxSessionRemove(key: string): any {
    this.wxSessionStore.removeItem(key);
  }
  public wxSessionPlaceDel(): any {
    this.wxSessionStore.clear();
  }
}
