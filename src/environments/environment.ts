// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: '开发环境中.........................',
  dev_test_url: 'http://1785s28l17.iask.in',
  // dev_test_url: 'http://192.168.0.134',
  // dev_test_url: 'http://www.sjcqdjk.com',
  wx_redirect_uri: 'http://1785s28l17.iask.in/moyaoView/login',
  // wx_redirect_uri: 'http://192.168.0.134',
  // wx_redirect_uri: 'http://www.sjcqdjk.com/moyaoView',
  wx_appid: 'wxbacad0ba65a80a3d',
  wx_secret: '3dff3ec9e534c308e3b2d5916b4f35e8',
  wx_grant_type: 'authorization_code',
  wx_auth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbacad0ba65a80a3d&redirect_uri=http://www.sjcqdjk.com/moyaoView/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
