import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-registered-camera',
  templateUrl: './registered-camera.component.html',
  styleUrls: ['./registered-camera.component.less']
})
export class RegisteredCameraComponent implements OnInit {
  // public navigator: Navigator;
  constructor(
    private el: ElementRef,
  ) {
  }

  ngOnInit() {
    console.log(this.el.nativeElement.childNodes[0].childNodes[0]);
    console.log(window.navigator);
    if (window.navigator.mediaDevices.getUserMedia || window.navigator.getUserMedia) {
      // 调用用户媒体设备，访问摄像头
      this.getUserMedia({
        video: {
          facingMode: {exact: 'environment'},
          width: {min: 1920},
          // height: {min: 400},
        }
      }, this.success, this.error);
    } else {
      alert('你的浏览器不支持访问用户媒体设备');
    }
  }

  // 访问用户媒体设备的兼容方法
  public getUserMedia(constrains, success, error) {
    if (window.navigator.mediaDevices.getUserMedia) {
      // 最新标准API
      window.navigator.mediaDevices.getUserMedia(constrains)
        .then(success)
        .catch(error);
    } else if ( window.navigator.webkitGetUserMedia) {
      // webkit内核浏览器
      window.navigator.webkitGetUserMedia(constrains)
        .then(success)
        .catch(error);
    } else if (window.navigator.mozGetUserMedia) {
      // Firefox浏览器
      window.navigator.mozGetUserMedia(constrains)
        .then(success)
        .catch(error);
    }
  }

  // 成功的回调函数
  public success(stream) {
    // 兼容webkit内核浏览器
    const CompatibleURL = window.URL || window.webkitURL;
    // 将视频流设置为video元素的源
    this.el.nativeElement.childNodes[0].childNodes[0].src = CompatibleURL.createObjectURL(stream);
    // 播放视频
    this.el.nativeElement.childNodes[0].childNodes[0].play();
  }

  // 异常的回调函数
  public error(error) {
    // window.alert(error);
    console.log('访问用户媒体设备失败：', error.name, error.message);
  }
}
