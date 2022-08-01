import axios from "axios";

// 基础URL
const BaseURL = "";

//使用create方法创建axios实例
export const Service = axios.create({
    timeout: 7000,
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});
//请求拦截器

//响应拦截器
