import XtxRequestManager from '@/utils/XtxRequestManager'  // 获取axios实例
import type { Goods } from '@/types/Goods'
import type { XtxResponse } from '@/types/Response'

export default class GoodsAPI {
    static getGoodsInfo(id: string) {
        return XtxRequestManager.instance().request<XtxResponse<Goods>>({ url: '/goods', params: { id } })
    }
}