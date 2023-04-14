// 导航api
import type { Pagination, XtxResponse } from '@/types/Response'
import type { Category } from '@/types/Category'
import XtxRequestManager from '@/utils/XtxRequestManager'  // 获取axios实例
import type { Goods, GoodsRequestParams } from '@/types/Goods';


export default class CategoryAPI {
    static getCategories() {
        return XtxRequestManager.instance()?.request<XtxResponse<Category[]>>({
            url: "/home/category/head"
        })
    }

    static getTopCategoryById(id: string) {
        return XtxRequestManager.instance().request<XtxResponse<Category>>({
            url: "/category",
            params: { id },
        });
    }

    static getSubCategoryFilters(id: string) {
        return XtxRequestManager.instance().request<XtxResponse<Category>>({ url: '/category/sub/filter', params: { id } })
    }

    static getCategoryGoods(categoryId: GoodsRequestParams['categoryId'], reqParms: Partial<Omit<GoodsRequestParams, 'categoryId'>>) {
        return XtxRequestManager.instance().request<XtxResponse<Pagination<Goods>>>({
            url: '/category/goods',
            method: 'post',
            data: {
                categoryId,
                ...reqParms
            }
        })
    }
}