import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-registered-camera',
  templateUrl: './registered-camera.component.html',
  styleUrls: ['./registered-camera.component.less']
})
export class RegisteredCameraComponent implements OnInit {
  public constrains = {video: {width: {min: 1280}, height: {min: 720}}};
  @ViewChild('video') public videos: ElementRef;
  constructor() {
  }

  ngOnInit() {
    this.videoCamrea();
  }
  public videoCamrea() {
    const that = this;
    if (navigator.mediaDevices === undefined) {
      console.log('你的浏览器不支持访问用户媒体设备');
      return;
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      console.log('你的浏览器不支持访问用户媒体设备');
      return;
    }
    navigator.mediaDevices.getUserMedia(this.constrains)
      .then(function(stream) {
        const video = that.videos.nativeElement;
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
          console.log(e);
          video.play();
        };
      })
      .catch(function(err) {
        console.log('访问用户媒体设备失败');
        console.log(err);
      });
  }
  public goBack (): void {
    window.history.back();
  }
}
