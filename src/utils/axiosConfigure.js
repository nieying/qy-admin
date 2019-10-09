import axios from "axios";
import qs from "qs";
import { message } from "antd";
import { createHashHistory } from "history";

const axiosConfigure = () => {
  // 拦截request,设置全局请求为ajax请求
  axios.interceptors.request.use(
    function(config) {
      if (localStorage.getItem("token")) {
        config.headers = {
          "X-Admin-Token": localStorage.getItem("token")
        };
      }
      // config.url = `https://api.deyushiyuan.cn/litemall/admin${config.url}`;
      config.url = `http://oms.deyushiyuan.cn/litemall/admin${config.url}`;
      //配置发送请求的信息
      // let { accessToken, appId } = localStorage;
      // let timestamp = Date.parse(new Date());
      // let jsons = { accessToken, appId, timestamp };
      // if (config.method === "get" && !config.dropXtoken) {
      //   config.params = Object.assign(jsons, config.params);
      // }
      // if (config.method === "post" && !config.dropXtoken) {
      //   config.data = qs.stringify(Object.assign(jsons, config.data));
      // }
      // if (config.method === "post") {
      //   config.data = qs.stringify(config.data);
      // }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  // 拦截响应response，并做一些错误处理
  axios.interceptors.response.use(
    response => {
      const data = response.data;
      if (data.errno === 0) {
        return Promise.resolve(data.data);
      } else {
        message.error(data.errmsg);
      }
    },
    err => {
      // 这里是返回状态码不为200时候的错误处理
      // if (err.status && err.status !== 200 && err.status !== 206 && err.status !== 304) {
      //     message.error.error('网络异常，请稍后再试', 4);
      // }
      message.error("网络异常，请稍后再试");
      return Promise.reject(err);
    }
  );
};
export default axiosConfigure;
