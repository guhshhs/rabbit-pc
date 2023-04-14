import GoodsAPI from "@/api/GoodsAPI";
import type { Goods } from "@/types/Goods";
import type { Status } from "./Status";

type state = {
    goods: {
        result: Goods,
        status: Status
    }
}

type getters = {
    mainPictures(): string[],
    baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
}

type actions = {
    getGoods(id: string): Promise<void>
}

export const GoodsStore = defineStore<'Goods', state, getters, actions>('Goods', {
    state: () => ({
        goods: {
            result: {
                id: "",
                name: "",
                desc: "",
                price: "",
                picture: "",
                discount: null,
                orderNum: null,
                spuCode: "",
                oldPrice: "",
                inventory: 0,
                brand: [],
                salesCount: 0,
                commentCount: 0,
                collectCount: 0,
                mainVideos: [],
                videoScale: 0,
                mainPictures: [],
                specs: [],
                skus: [],
                categories: [],
                details: {
                    pictures: [],
                    properties: [],
                },
                isPreSale: false,
                isCollect: false,
                userAddresses: null,
                similarProducts: [],
                hotByDay: [],
                evaluationInfo: null,
            }, status: 'idle'
        }
    }),
    getters: {
        mainPictures() {
            return this.goods.result.mainPictures
        },
        baseInfo() {
            const { name, desc, price, oldPrice } = this.goods.result
            return { name, desc, price, oldPrice }
        }
    },
    actions: {
        async getGoods(id: string) {
            this.goods.status = 'loading'
            try {
                const { result } = await GoodsAPI.getGoodsInfo(id)
                this.goods.result = result
                this.goods.status = 'success'
            } catch (e) {
                this.goods.status = 'error'
            }
        }
    }
})