import axios from 'axios'
import store from '../store/index'
import router from '../router'

// Add a request interceptor  请求拦截
axios.interceptors.request.use((config) => {

    store.dispatch("setLoadingAsync", true);

    if (localStorage.getItem("jwtToken")) {
        config.headers.Authorization = localStorage.jwtToken;
    }
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor  响应拦截
axios.interceptors.response.use((response) => {
    // Do something with response data
    store.dispatch("setLoadingAsync", false);

    return response;
}, (error) => {
    store.dispatch("setLoadingAsync", false);
    const { status } = error.response;
    if (status == 401) {
        //提示
        alert("token值失效，请重新登录");
        //清除ls
        localStorage.removeItem("jwtToken");

        //vuex状态初始化
        store.dispatch("setIsLoginAsync", false);
        store.dispatch("setProfileAsync", null);
        store.dispatch("setUserAsync", null);

        router.push("/login");
    }
    return Promise.reject(error);
});

export default axios;
