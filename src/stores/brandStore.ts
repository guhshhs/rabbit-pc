// 主页 store
import HomeAPI from '@/api/HomeAPI'
import { defineStore } from "pinia";
import type { Brands } from '@/types/Brands'
import type { Banner } from '@/types/Banner';
import type { Goods } from '@/types/Goods'
import type { Category } from '@/types/Category'
import type { HotRecommends } from '@/types/HotRecommends'
import type { Special } from '@/types/Special'



export type Status = "idle" | "loading" | "success" | "error";
type State = {
    brands: {
        result: Brands[],  // 数据
        status: Status  // 状态
    },
    banner: {
        result: Banner[],
        status: Status
    },
    fresh: {
        result: Goods[],
        state: Status
    },
    hotRecommends: {
        result: HotRecommends[],
        state: Status
    },
    goods: {
        result: Category[],
        state: Status
    },
    special: {
        result: Special[],
        status: Status
    }

}

type Getters = {}

type Actions = {
    getBrands(limit: number): Promise<void>
    getBanner(distributionSite: 1 | 2): Promise<void>
    getFresh(limit?: number): Promise<void>
    getHotRecommends(): Promise<void>
    getGoods(): Promise<void>
    getSpecial(limit?: number): Promise<void>

}

export default defineStore<'useHomeStore', State, Getters, Actions>('useHomeStore', {
    state: () => (
        {
            brands: { result: [], status: 'idle' },
            banner: { result: [], status: 'idle' },
            fresh: { result: [], state: 'idle' },
            hotRecommends: { result: [], state: 'idle' },
            goods: { result: [], state: 'idle' },
            special: { result: [], status: 'idle' }
        }),

    actions: {
        async getBrands(limit: number) {
            this.brands.status = 'loading'
            try {
                const response: any = await HomeAPI.getHotBrands(limit)
                this.brands.result = response.result;
                this.brands.status = 'success'
            } catch (error) {
                this.brands.status = 'error'
            }
        },

        async getBanner(distributionSite) {
            this.banner.status = 'loading'
            try {
                const response = await HomeAPI.gerHotBanner(distributionSite)
                this.banner.result = response.result
                this.banner.status = 'success'
            } catch (error) {
                this.banner.status = 'error'
            }
        },

        async getFresh(limit: number = 4) {
            this.fresh.state = 'loading'
            try {
                const response = await HomeAPI.getFreshGoods(limit)
                this.fresh.result = response.result
                this.fresh.state = 'success'
            } catch (error) {
                this.fresh.state = 'error'
            }
        },

        async getHotRecommends() {
            this.hotRecommends.state = 'loading'
            try {
                const { result } = await HomeAPI.getHotRecommends()
                this.hotRecommends.result = result
                this.hotRecommends.state = 'success'
            } catch (e) {
                this.hotRecommends.state = 'error'
            }
        },

        async getGoods() {
            this.goods.state = 'loading'
            try {
                const { result } = await HomeAPI.getGoods()
                this.goods.result = result
                this.goods.state = 'success'
            } catch (e) {
                this.goods.state = 'error'
            }
        },

        async getSpecial(limit: number) {
            this.special.status = 'loading'
            try {
                const response: any = await HomeAPI.getSpecial(limit)
                this.special.result = response.result;
                this.special.status = 'success'
            } catch (error) {
                this.special.status = 'error'
            }
        },
    },
    persist: true
})