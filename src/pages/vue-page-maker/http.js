import axios from 'axios'
import qs from 'qs'
import router from './router.js'
import {Loading, Message, MessageBox} from 'element-ui'

let dlg = null;

axios.auth = function auth(code) {
  let url = axios.defaults.baseURL + "/auth?code=" + Math.random().toString(36).substr(3,4);
  let times = 0;
  let timer = setInterval(() => {
      if (times++ > 60) {
          clearInterval(timer);
          document.querySelector(".el-message-box .el-button--default").click();
          return setTimeout(() => {
            auth(code);
          }, 1000)
      }
      axios.get(url + "&check=" + Math.random).then((data) => {
          if (typeof data != "object" || typeof data["sign"] != "string") return;
          localStorage.setItem("profile", JSON.stringify(data));
          clearInterval(timer);
          document.querySelector(".el-message-box .el-button--default").click();
          Message({type:"success", message:"验证成功"});
          if (code == 999) {
            window.location.reload(true);
          }
      });
  }, 5000);

  MessageBox({
      dangerouslyUseHTMLString: true,
      title: "请微信扫码登录",
      message: "<img src='" + url + "' width='200'>",
      duration: 0,
      showClose: false,
      showConfirmButton: false,
      showCancelButton: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
      center: true,
      roundButton: true,
  });

  localStorage.removeItem("profile");
}

axios.interceptors.request.use((config) => {
  dlg = config.method == "get" ? Message({message:"加载中，请稍候 …", duration:0}) : Loading.service({ fullscreen: true, text: "请稍候 …" });
  
  let header = (typeof config.data == "object" && config.data instanceof FormData) ? {"Content-Type": "multipart/form-data"} : {"Content-Type": "application/x-www-form-urlencoded"};
  config.headers = Object.assign(config.headers, header, {"x-requested-with": "xmlhttprequest"});
  
  let profile = localStorage.getItem("profile");
  if (profile !== null){
    config.headers['token'] = btoa(profile);
  }
  
  config.paramsSerializer = function (params) {
    return qs.stringify(params, {arrayFormat: "repeat"});
  };
  config.transformRequest = [function (data, headers) {
    if (data instanceof FormData)
      return data;
    return qs.stringify(data,  {arrayFormat: "brackets"});
  }];

  config.url += (config.url.indexOf("?") > -1 ? "&" : "?") + "rnd=" + Math.random();

  return config;
});

axios.interceptors.response.use((response) => {
  dlg.close();

  if (response.status !== 200 || typeof response.data.rtn != "number"){
    Message({type: "error", message: "服务异常，请重试！", duration: 10000});
    return Promise.reject(response.data);
  }

  if (response.data.rtn == 999 || response.data.rtn == 998){
    Message({type: "warning", message: "授权已失效！", duration: 10000});
    auth(response.data.rtn);
    return Promise.reject(response.data);
  }

  if (response.data.rtn == 9){
    router.push({
      path: '/error',
      query: {msg: response.data.msg},
    });
    return Promise.reject(response.data);
  }

  if (response.data.rtn != 0){
    Message({type: "error", message: response.data.msg, duration: 0, showClose: true});
    return Promise.reject(response.data);
  }

  response.data.msg.length > 4 && Message({type: "success", message: response.data.msg});
  return Promise.resolve(response.data.data);

}, error => {

  Message({type: "warning", message: "网络请求错误，请重试！", duration: 5000});
  console.error("网络错误：", error);

});

export default axios
