import HomeAPI from '@/api/HomeAPI'
import type { Brands } from '@/types/Brands'
import { defineStore } from "pinia";
export type Status = "idle" | "loading" | "success" | "error";
type State = {
    brands: {
        result: Brands[],  // 数据
        status: Status  // 状态
    }
}

type Getters = {}

type Actions = {
    getBrands(limit: number): Promise<void>
}

export default defineStore<'useHomeStore', State, Getters, Actions>('useHomeStore', {
    state: () => ({ brands: { result: [], status: 'idle' } }),
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
        }
    }
})