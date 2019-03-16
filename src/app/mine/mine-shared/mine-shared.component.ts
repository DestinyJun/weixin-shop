import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {MineService} from '../../common/services/mine.service';

@Component({
  selector: 'app-mine-shared',
  templateUrl: './mine-shared.component.html',
  styleUrls: ['./mine-shared.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineSharedComponent implements OnInit {
  // header
  public headerOption: HeaderContent = {
    title: '邀请你加入团队',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '换个样式',
      color: '#86B876'
    }
  };
  public qrImgRrl: string = null;
  constructor(
    private mineSrv: MineService
  ) { }

  ngOnInit() {
    this.mineSharedInitialize();
  }
  public mineSharedInitialize (): void {
    this.mineSrv.mineGetQrImg({}).subscribe(
      (val) => {
        if (val.status === 200) {
          this.qrImgRrl = val.data.QRimage;
          console.log(this.qrImgRrl);
        }
        console.log(val);
      }
    );
  }
  public sharegHeaderRightClick() {
    this.mineSharedInitialize();
  }
}
