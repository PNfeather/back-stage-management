const u = navigator.userAgent;
const ua = u.toLowerCase();
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
const isWeixin = (ua.match(/MicroMessenger/i) == 'micromessenger');
const isQQ = (ua.match(/QQ/i) == 'qq') && !(u.indexOf('MQQBrowser') > -1);
const WEB = {
  isAndroid: isAndroid,
  isIos: isIos,
  isWeixin: isWeixin,
  isQQ: isQQ
};

export default WEB;
