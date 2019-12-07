import axios from "axios";
// import qs from "qs";
import { message } from "antd";
import { createHashHistory } from "history";
const history = createHashHistory();

const axiosConfigure = () => {
  // 拦截request,设置全局请求为ajax请求
  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token")) {
        config.headers = {
          "X-Admin-Token": localStorage.getItem("token"),
        };
      }
      // config.url = `https://api.deyushiyuan.cn/litemall/admin${config.url}`;
      config.url = `https://api.talkiin.cn/app/admin${config.url}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // 拦截响应response，并做一些错误处理
  axios.interceptors.response.use(
    response => {
      const res = response.data;
      if (response.headers['content-type'].includes('ms-excel')) {
        window.location.href = response.request.responseURL
      } else {
        if (res.errno === 0) {
          return Promise.resolve(res.data ? res.data : res);
        } else {
          if (res.errno === 501) {
            message.error(res.errmsg);
            history.push("/login");
          } else {
            message.error(res.errmsg);
          }
        }
      }
    },
    err => {
      // 这里是返回状态码不为200时候的错误处理
      // if (err.status && err.status !== 200 && err.status !== 206 && err.status !== 304) {
      //     message.error.error('网络异常，请稍后再试', 4);
      // }
      message.error(err.message);
      history.push("/login");
      return Promise.reject(err);
    }
  );
};
export default axiosConfigure;
