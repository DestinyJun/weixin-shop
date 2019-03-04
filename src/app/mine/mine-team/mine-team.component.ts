import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HeaderContent} from '../../common/components/header/header.model';
import {InfiniteLoaderConfig, PickerData, PickerOptions, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-mine-team',
  templateUrl: './mine-team.component.html',
  styleUrls: ['./mine-team.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class MineTeamComponent implements OnInit, AfterViewInit, OnDestroy {
  // header
  public headerOption: HeaderContent = {
    title: '我的团队',
    leftContent: {
      icon: 'fa fa-chevron-left'
    },
    rightContent: {
      title: '收益明细',
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
  public year: string[] = ['2015年', '2016年', '2017年'];
  public pickerOptions: PickerOptions = {
    cancel: '取消',
    confirm: '确认'
  };
  // chart
  options: any;

  constructor(
    private srv: PickerService
  ) {
  }

  ngOnInit() {
    const data = [1615, 2700, 3100, 3600, 4500, 5001, 5500, 5800, 6000];
    const dataName =  ['王明', '张宝', '袁晨阳', '源田鱼', '俗称非', '王二小', '王二小', '王二小', '王二小'];
    this.options = {
      tooltip: {
        show: false,
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
          name: '背景色',
          type: 'bar',
          data: [6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500],
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
          z: 1
        },
        {
          name: '蓝条',
          type: 'bar',
          data: data,
          barGap: '-100%',
          // barWidth: 35,
          itemStyle: {
            normal: {
              color: '#89C56B',
              barBorderRadius: 10,
            },
          },
          z: 2,
          label: {
            show: false,
            position: ['90%', '50%'],
            color: '#000000',
            formatter: function (param) {
              return data[param.dataIndex];
            }
          }
        },
        {
          name: '名字数据',
          show: true,
          type: 'bar',
          barGap: '-100%',
          // barWidth: '25%',
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: 'rgba(22,203,115,0.05)'
            },
          },
          z: 3,
          label: {
            normal: {
              color: '#000000',
              show: true,
              position: [10, '30%'],
              rich: { // 富文本
                white: { // 自定义颜色
                  color: '#ffffff',
                },
              },
              formatter: function (param) {
                return param.name;
              }
            }
          },
          data: [6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500],
        },
        {
          name: '数字数据',
          show: true,
          type: 'bar',
          barGap: '-100%',
          // barWidth: '25%',
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: 'rgba(22,203,115,0.05)'
            },
          },
          z: 4,
          label: {
            normal: {
              color: '#000000',
              show: true,
              position: ['90%', '30%'],
              rich: { // 富文本
                white: { // 自定义颜色
                  color: '#ffffff',
                },
              },
              formatter: function (param) {
                return data[param.dataIndex];
              }
            }
          },
          data: [6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500],
        }
      ]
    };
  }
  ngOnDestroy() {
    this.srv.destroyAll();
  }

  ngAfterViewInit() {
  }

  public onSelect() {
  }
  public selectMonthClick() {
    this.srv.showDateTime('date-ym', '', null, null, new Date()).subscribe((res: any) => {
      console.log(res);
      // this.srvRes = res.value;
    });
  }
  public selectYearClick() {
    this.srv.show(this.year, null, [this.year.length - 1], this.pickerOptions).subscribe((res: any) => {
      console.log(res);
      // this.srvRes = res.value;
    });
  }
}
