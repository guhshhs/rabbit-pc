// 获取品牌接口的api
import type { Brands } from '@/types/Brands'
import XtxRequestManager from '@/utils/XtxRequestManager'  // 获取axios实例
import type { XtxResponse } from '@/types/Response'

export default class HomeAPI {
    static async getHotBrands(limit: number) {
        return XtxRequestManager.instance().request<XtxResponse<Brands[]>>({ url: '/home/brand', params: { limit } })
    }
}