// 导航api
import type { XtxResponse } from '@/types/Response'
import type { Category } from '@/types/Category'
import XtxRequestManager from '@/utils/XtxRequestManager'  // 获取axios实例


export default class CategoryAPI {
    static getCategories() {
        return XtxRequestManager.instance()?.request<XtxResponse<Category[]>>({
            url: "/home/category/head"
        })
    }
}