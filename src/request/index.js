import axios from "axios";

let service = axios.create({
    baseURL: 'https://kw-api.cenguigui.cn/',  // 请求地址
    timeout: 5000  // 请求超时时间
})

export default service;  // 导出service实例