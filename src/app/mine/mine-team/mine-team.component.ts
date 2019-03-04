import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderConfig} from 'ngx-weui';
import {graphic} from 'echarts';

declare const require: any;

@Component({
  selector: 'app-mine-team',
  templateUrl: './mine-team.component.html',
  styleUrls: ['./mine-team.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineTeamComponent implements OnInit, AfterViewInit {
  // header
  public headerOption: HeaderContent = {
    title: '我的团队',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '',
      color: '#86B876'
    }
  };
  // scroll
  public infiniteloaderConfig: InfiniteLoaderConfig = {
    height: '100%'
  };
  // date picker
  DT: any = {
    min: new Date(2015, 1, 5),
    max: new Date()
  };
  res: any = {
    city: '310105',
    date: new Date()
  };
  // chart
  options: any;

  constructor() {
  }

  ngOnInit() {
    const data = [1615, 2700, 3100, 3600, 4500, 5001, 5500, 5800, 6000];
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '1%',
        left: '-10%',
        right: '-5%',
        containLabel: true
      },
      xAxis: {
        show: false,
        type: 'value',
        boundaryGap: [0, 0],
      },
      yAxis: {
        show: false,
        type: 'category',
        data: ['王明', '张宝', '袁晨阳', '源田鱼', '俗称非', '王二小', '王二小', '王二小', '王二小'],
        // max: 7
      },
      series: [
        {
          type: 'bar',
          data: [6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500],
          itemStyle: {
            normal: {
              color: '#ddd'
            }
          },
          silent: true,
          // barWidth: 35,
          barGap: '-100%',
          // barCategoryGap: '-5%',
          label: {
            show: false,
            /* position: ['90%', '30%'],
             color: '#000000',
             formatter: function (param) {
               return data[param.dataIndex];
             }*/
          },
          itemStyle: {
            normal: {
              color: '#DAEBD1',
              barBorderRadius: 10,
            },
          },
        },
        {
          name: '2012年',
          type: 'bar',
          data: data,
          // barWidth: 35,
          itemStyle: {
            normal: {
              color: '#89C56B',
              barBorderRadius: 10,
            },
          },
          label: {
            show: true,
            position: ['90%', '30%'],
            color: '#000000',
            formatter: function (param) {
              return data[param.dataIndex];
            }
          }
        },
      ]
    };
  }

  ngAfterViewInit() {
  }

  public onSelect() {
  }
}
