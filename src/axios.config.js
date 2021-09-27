import axios from "axios";

// 配置基础地址
axios.defaults.baseURL = 'http://localhost:3005/api'

// 使用响应拦截器将想要的数据直接返回给浏览器
axios.interceptors.response.use(res => res.data)