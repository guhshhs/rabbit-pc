import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axios from "axios";
import useStore from '@/stores/user'
import router from "@/router";
interface XtxAxiosInstance extends AxiosInstance {
    request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}

export default class XtxRequestManager {
    // 创建单例模式 单例对象
    static _singletonInstance: XtxRequestManager

    // 创建axios实例化
    private _instance: AxiosInstance // AxiosInstance axios 实例 类型约束

    // 获取 user store
    private _userStore = useStore()

    // 初始请求地址   
    static baseURL: string = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'

    private constructor() {
        console.log(this._userStore.profile.token, 'token');
        this._instance = axios.create({
            baseURL: XtxRequestManager.baseURL
        })
        // 请求拦截器  创建拦截器的请求头    bind 改变this指向 指向当前实例对象
        this._instance.interceptors.request.use(this._addTokenToRequestHeader.bind(this))
        // 响应拦截器 返回响应的结果做出的操作 (成功，失败)
        this._instance.interceptors.response.use(this._peelOffAxiosResponse.bind(this), this._unauthorized.bind(this))
    }

    // 类初始化
    static instance() { // static  通过类名点出  
        // 是否有被创建过，无则new 实例对象   有则返回实例对象
        if (typeof XtxRequestManager._singletonInstance === 'undefined') {
            XtxRequestManager._singletonInstance = new XtxRequestManager()
        }
        return XtxRequestManager._singletonInstance
    }

    // 拦截器 配置请求头
    private _addTokenToRequestHeader(config: AxiosRequestConfig) { // AxiosRequestConfig aixos 配置类型
        if (this._userStore.profile.token) {
            config.headers = {
                Authorization: `Bearer ${this._userStore.profile.token}`
            }
        }
        return config
    }

    // 成功态  响应式请求
    private _peelOffAxiosResponse(response: AxiosResponse) {
        return response.data
    }
    // 失败态
    private _unauthorized(error: AxiosError) {
        if (error.response?.status === 401) {
            this._userStore.$reset()  // 将store 设为初始值
            router.replace('/login')
        }
    }

    // 发送请求的方法 D 约束参数类型   T返回值是 promise 的类型
    public request<D = any, T = any>(config: AxiosRequestConfig<D>): Promise<T> {
        return this._instance.request<D, T>(config)
    }
}