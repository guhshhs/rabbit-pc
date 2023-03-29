// 获取品牌接口的api
import type { Brands } from '@/types/Brands'
import type { Banner } from '@/types/Banner'
import type { Goods } from '@/types/Goods'
import type { XtxResponse } from '@/types/Response'
import type { HotRecommends } from '@/types/HotRecommends'
import type { Category } from '@/types/Category'
import type { Special } from '@/types/Special'
import XtxRequestManager from '@/utils/XtxRequestManager'  // 获取axios实例


export default class HomeAPI {
    static getHotBrands(limit: number) {
        return XtxRequestManager.instance().request<XtxResponse<Brands[]>>({ url: '/home/brand', params: { limit } })
    }

    // distributionSite 1为首页 2为分类
    static gerHotBanner(distributionSite: 1 | 2) {
        return XtxRequestManager.instance().request<XtxResponse<Banner>>({ url: 'home/banner', params: { distributionSite } })
    }

    static getFreshGoods(limit: number) {
        return XtxRequestManager.instance().request<XtxResponse<Goods>>({ url: 'home/new', params: { limit } })
    }

    static getHotRecommends() {
        return XtxRequestManager.instance().request<XtxResponse<HotRecommends>>({ url: 'home/hot' })
    }

    static getGoods() {
        return XtxRequestManager.instance().request<XtxResponse<Category[]>>({ url: 'home/goods' })
    }

    static getSpecial(limit: number) {
        return XtxRequestManager.instance().request<XtxResponse<Special[]>>({ url: 'home/special', params: { limit } })
    }
}
