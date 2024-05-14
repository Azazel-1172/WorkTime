import axios from "axios";
import { useCookies } from "vue3-cookies";

let baseurl_Hostname = "mind-information-tech.com";
let baseurl = `//${baseurl_Hostname}/mon/api`;

useCookies().cookies.set("login_token", "qN$iY7SZ8[LT7^&Vd#^O");

export default {
  /* 變數 */
  default: (option) => {
    /* axiosOption */
    let axiosOption = {
      ...option,
      /* 加密 */
      withCredentials: true,
      baseURL: baseurl,
      headers: {
        /* 對應到 axiosAPI.default({ method: "GET", url: `/token`, }) */
        ...option.headers,
        /* 驗證 */
        // Authorization: useCookies().cookies.get('login_token')
        Authorization: useCookies().cookies.get("login_token"),
      },
    };
    return axios(axiosOption);
  },

  create_visitor_auth: (option) => {
    let axiosOption = {
      ...option,
      withCredentials: true,
      baseURL: baseurl,
      headers: {
        ...option.headers,
        // Authorization: useCookies().cookies.get('login_token')
        Authorization: useCookies().cookies.get("login_token"),
      },
      url: "/授權",
      method: "POST",
    };
    return axios(axiosOption);
  },
};
