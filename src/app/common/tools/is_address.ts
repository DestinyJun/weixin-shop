import {areaList, zipCode} from './is_address_list';

let defaultData = [];

const mCity = {};

const mArea = {};
/**
 * 处理原始地址数据转换成专用数据
 * @param list  原始数据
 * @param init  是否初始化 如传空 已转换过不会再次转换
 * @returns boolean
 */
function parseArea(list, init) {
  if (!init && defaultData.length) {
    return true;
  }
  defaultData = list;
  defaultData.forEach(province => {
    if (province.city) {
      province.city.forEach(city => {
        if (city.name !== '其他') {
          if (!mCity[city.name]) {
            mCity[city.name] = [];
          }
          mCity[city.name].push({
            p: province.name,
            c: city.name,
            a: city.area || []
          });
        }
        if (city.area) {
          city.area.forEach(area => {
            if (area !== '其他') {
              if (!mArea[area]) {
                mArea[area] = [];
              }
              mArea[area].push({
                p: province.name,
                c: city.name
              });
            }
          });
        }
      });
    }
  });
}

/**
 * 解析邮编
 * @ param
 * @returns <array>
 */
function zipCodeFormat() {
  const list = [];
  zipCode.forEach((el) => {
    if (el.child) {
      el.child.forEach((event) => {
        if (event.child) {
          event.child.forEach(element => {
            list.push(element.zipcode);
          });
        }

      });
    }
  });
  return list;
}

// 专用数据处理
const zipCodeList = zipCodeFormat(); // 邮编
parseArea(areaList, null); // 地址

/**
 * 解析
 * @param address 任意地址字符串
 * @ returns {{name: string, mobile: string, detail: string, zip_code: string, phone: string}}
 */
export function parse(address) {
  const parseInt: any = {};
  address = address || '';
  // 去除空格...
  address = address.replace(/\r\n/g, ' ').replace(/\n/g, ' ').replace(/\t/g, ' ');
  address = address.replace(/\s+/g, '');
  // 自定义去除关键字，可自行添加
  const search = ['地址', '收货地址', '收货人', '收件人', '收货', '邮编', '电话', '：', ':', '；', ';', '，', ',', '。'];
  search.forEach(str => {
    address = address.replace(new RegExp(str, 'g'), ' ');
  });
  // 多个空格replace为一个
  address = address.replace(/ {2,}/g, ' ');
  // 整理电话格式
  address = address.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3');

  address = address.replace(/(\d{3}) (\d{4}) (\d{4})/g, '$1$2$3');

  const mobileReg = /(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g;
  const mobile = mobileReg.exec(address);
  if (mobile) {
    parseInt['mobile'] = mobile[0];
    address = address.replace(mobile[0], ' ');
  }
  // 电话
  const phoneReg = /(([0-9]{3,4}-)[0-9]{7,8})|([0-9]{12})|([0-9]{11})|([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})/g;
  const phone = phoneReg.exec(address);
  if (phone) {
    parseInt['phone'] = phone[0];
    address = address.replace(phone[0], ' ');
  }

  // 邮编(加入门牌号；考虑到重复邮编问题；去除之前简单的六位数字校验)

  for (let index = 0; index < zipCodeList.length; index++) {
    if (address.indexOf(zipCodeList[index]) !== -1) {
      const num = address.indexOf(zipCodeList[index]);
      const code = address.slice(num, num + 6);
      parseInt['zip_code'] = code;
      address = address.replace(code, '');
    }
  }


  /*   废弃
    const zipReg = /([0-9]{6})/g;
    const zip = zipReg.exec(address);
    if (zip) {
      parse.zip_code = zip[0];
      address = address.replace(zip[0], '')
    }
  */

  address = address.replace(/ {2,}/, ' ');
  // console.log(address)

  let detail = detail_parse_forward(address.trim());
  if (!detail.city) {
    detail = detail_parse(address.trim());
    if (detail.area && !detail.city) {
      detail = detail_parse(address.trim(), {
        ignoreArea: true
      });
      console.log('smart_parse->ignoreArea（忽略区）');
    } else {
      // console.log('smart_parse');
    }
    // 这个待完善
    const list = address.replace(detail.province, '').replace(detail.city, '').replace(detail.area, '').split(' ').filter(str => str);
    // 详细住址划分关键字
    // 注意：只需要填写关键字最后一位即可：比如单元填写元即可！
    const address_detail_list = ['室', '楼', '元', '号', '幢', '门', '户'];
    if (list.length > 1) {
      list.forEach(str => {
        if (!parseInt.name || str && str.length < parseInt.name.length) {
          parseInt.name = str.trim();
        }
      });
      if (parseInt.name) {
        detail.addr = detail.addr.replace(parseInt.name, '').trim();
      }
    } else {// 若名字写在详细地址后面，根据address_detail_list进行分割；
      const key = [];
      address_detail_list.forEach((el) => {
        key.push(detail.addr.indexOf(el));
      });
      const max = key.sort(function (a, b) {
        return b - a;
      })[0];
      if (max !== -1) {
        const addrBuild = detail.addr.slice(0, max + 1);
        const addrNum = detail.addr.replace(addrBuild, '').replace(/[^0-9]+/g, '');
        const userName = detail.addr.replace(addrBuild + addrNum, '');
        detail.addr = addrBuild + addrNum;
        parseInt.name = userName;
      }
    }
  } else {
    if (detail.name) {
      parseInt.name = detail.name;
    } else {
      const list = detail.addr.split(' ').filter(str => str);
      if (list.length > 1) {
        parseInt.name = list[list.length - 1];
      }
      if (parseInt.name) {
        detail.addr = detail.addr.replace(parseInt.name, '').trim();
      }
    }
  }
  parseInt['province'] = detail.province;
  parseInt['city'] = detail.city;
  parseInt['area'] = detail.area;
  parseInt['addr'] = detail.addr;
  parseInt['result'] = detail['result'];
  return parseInt;
}

/**
 * 正向解析模式
 * 从前到后按 province city addr 逐级筛选
 * 有city的值即可说明解析成功
 * 此模式对地址顺序有要求
 * @ param address
 * @ returns province: string, city: string, area: string, addr: string
 */
function detail_parse_forward(address) {
  const parseInt = {
    province: '',
    city: '',
    area: '',
    addr: '',
    name: '',
  };

  const provinceKey = ['特别行政区', '古自治区', '维吾尔自治区', '壮族自治区', '回族自治区', '自治区', '省省直辖', '省', '市'];
  const cityKey = ['布依族苗族自治州', '苗族侗族自治州', '自治州', '州', '市', '县'];

  for (const i in defaultData) {
    if (defaultData) {
      const province = defaultData[i];
      let index = address.indexOf(province.name);
      if (index > -1) {
        if (index > 0) {
          // 省份不是在第一位，在省份之前的字段识别为名称
          parseInt.name = address.substr(0, index).trim();
        }
        parseInt.province = province.name;
        address = address.substr(index + province.name.length);
        for (const k in provinceKey) {
          if (provinceKey) {
            if (address.indexOf(provinceKey[k]) === 0) {
              address = address.substr(provinceKey[k].length);
            }
          }
        }
        for (const j in province.city) {
          if (province.city) {
            const city = province.city[j];
            index = address.indexOf(city.name);
            if (index > -1 && index < 3) {
              parseInt.city = city.name;
              address = address.substr(index + parseInt.city.length);
              for (const k in cityKey) {
                if (cityKey) {
                  if (address.indexOf(cityKey[k]) === 0) {
                    address = address.substr(cityKey[k].length);
                  }
                }
              }
              if (city.area) {
                for (const k in city.area) {
                  if (city.area) {
                    const area = city.area[k];
                    index = address.indexOf(area);
                    if (index > -1 && index < 3) {
                      parseInt.area = area;
                      address = address.substr(index + parseInt.area.length);
                      break;
                    }
                  }
                }
              }
              break;
            }
          }
        }
        parseInt.addr = address.trim();
        break;
      }
    }
  }
  return parseInt;
}

/**
 * 逆向解析 从后【县，区，旗】往前解析
 * 有地区就能大概返回地址了
 * @ param address
 * @ param ignoreArea 是否忽视区 因为地址中含有区容易导致匹配错误 例：山东省蓬莱市黄海花园东区西门宝威学堂 曲荣声收15753572456
 * @ returns {{province: string, city: string, area: string, name: string, _area: string, addr: string}}
 */
function detail_parse(address, {
  ignoreArea = false
} = {}) {
  const parseInt = {
    province: '',
    city: '',
    area: '',
    name: '',
    _area: '',
    addr: '',
  };
  let areaIndex = -1,
    cityIndex = -1;

  address = address.replace('  ', ' ');

  if (!ignoreArea && address.indexOf('县') > -1 || !ignoreArea && address.indexOf('区') > -1 || !ignoreArea && address.indexOf('旗') > -1) {
    if (address.indexOf('旗') > -1) {
      areaIndex = address.indexOf('旗');
      parseInt.area = address.substr(areaIndex - 1, 2);
    }
    if (address.indexOf('区') > -1) {
      areaIndex = address.indexOf('区');
      if (address.lastIndexOf('市', areaIndex) > -1) {
        cityIndex = address.lastIndexOf('市', areaIndex);
        parseInt.area = address.substr(cityIndex + 1, areaIndex - cityIndex);
      } else {
        parseInt.area = address.substr(areaIndex - 2, 3);
      }
    }
    if (address.indexOf('县') > -1) {
      areaIndex = address.lastIndexOf('县');
      if (address.lastIndexOf('市', areaIndex) > -1) {
        cityIndex = address.lastIndexOf('市', areaIndex);
        parseInt.area = address.substr(cityIndex + 1, areaIndex - cityIndex);
      } else {
        parseInt.area = address.substr(areaIndex - 2, 3);
      }
    }
    parseInt.addr = address.substr(areaIndex + 1);

  } else {
    if (address.indexOf('市') > -1) {
      areaIndex = address.indexOf('市');
      parseInt.area = address.substr(areaIndex - 2, 3);
      parseInt.addr = address.substr(areaIndex + 1);
    } else {
      parseInt.addr = address;
    }
  }

  if (address.indexOf('市') > -1 || address.indexOf('盟') > -1 || address.indexOf('州') > -1) {
    if (address.indexOf('市') > -1) {
      parseInt._area = address.substr(address.indexOf('市') - 2, 2);
    }
    if (address.indexOf('盟') > -1 && !mCity[parseInt._area]) {
      parseInt._area = address.substr(address.indexOf('盟') - 2, 2);
    }
    if (address.indexOf('州') > -1 && !mCity[parseInt._area]) {
      parseInt._area = address.substr(address.indexOf('州') - 2, 2);
    }
  }

  parseInt.area = parseInt.area.trim();

  if (parseInt.area && mArea[parseInt.area]) {
    if (mArea[parseInt.area].length === 1) {
      parseInt.province = mArea[parseInt.area][0].p;
      parseInt.city = mArea[parseInt.area][0].c;
    } else {
      parseInt._area = parseInt._area.trim();
      const addr = address.substr(0, areaIndex);
      const d = mArea[parseInt.area].find(item => {
        return item.p.indexOf(addr) > -1 || item.c === parseInt._area;
      });
      if (d) {
        parseInt.province = d.p;
        parseInt.city = d.c;
      } else {
        parseInt['result'] = mArea[parseInt.area];
      }
    }
  } else {
    if (parseInt._area) {
      const city = mCity[parseInt._area];
      if (city) {
        parseInt.province = city[0].p;
        parseInt.city = city[0].c;
        parseInt.addr = address.substr(address.indexOf(parseInt.city) + parseInt.city.length + 1);
        parseInt.area = '';
        for (const i in city[0].a) {
          if (city[0].a) {
            if (parseInt.addr.indexOf(city[0].a[i]) === 0) {
              parseInt.area = city[0].a[i];
              parseInt.addr = parseInt.addr.replace(city[0].a[i], '');
              break;
            }
          }
        }
      }
    } else {
      parseInt.area = '';
    }
  }
  parseInt.addr = parseInt.addr.trim();
  return parseInt;
}
