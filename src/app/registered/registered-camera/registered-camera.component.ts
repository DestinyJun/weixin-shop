import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
declare const qrcode: any;
@Component({
  selector: 'app-registered-camera',
  templateUrl: './registered-camera.component.html',
  styleUrls: ['./registered-camera.component.less']
})
export class RegisteredCameraComponent implements OnInit {
  public constrains = { video: {
      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 776, ideal: 720, max: 1080 },
      facingMode: 'environment'
  }};
  @ViewChild('video') public videos: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('scan') public scan: ElementRef;
  public imgUrl: any = null;
  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    console.log(qrcode);
    console.log(this.scan.nativeElement.getBoundingClientRect());
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
  public canvasCamera() {
    console.log('点击');
    const that = this;
    const canvas = that.canvas.nativeElement;
    const context = canvas.getContext('2d');
    context.drawImage(
      this.videos.nativeElement,
      0,
      0,
      this.scan.nativeElement.getBoundingClientRect().width,
      this.scan.nativeElement.getBoundingClientRect().width
    );
    const canvasImg = canvas.toDataURL('image/png');
    const canvasImgFile = this.dataURLtoFile(canvasImg, 'test.png');
    const canvasImgFileURL = window.URL.createObjectURL(canvasImgFile);
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(canvasImgFileURL);
    qrcode.decode(window.URL.createObjectURL(canvasImgFile));
    qrcode.callback = function (imgMsg) {
      window.alert(imgMsg);
      console.log(imgMsg);
    };
  }
  public goBack (): void {
    window.history.back();
  }
  // dataUrl转file
  public dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
    // return new Blob([u8arr], {type: mime});
  }
}
