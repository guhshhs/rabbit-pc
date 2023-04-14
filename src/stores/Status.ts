// 存储分类导航数据和封装方法
import type { Category } from '@/types/Category'
import { defineStore } from "pinia";
import CategoryAPI from '@/api/CategoryAPI'
import type { Pagination } from '@/types/Response';
import type { Goods, GoodsRequestParams } from '@/types/Goods';


// 等待状态 
export type Status = "idle" | "loading" | "success" | "error";

// store 数据
interface State {
    categories: {
        headerNav: (Category & { isOpen: boolean })[];
        status: Status
        homeCategory: Category[] // 左侧数据源
    };
    topCategories: {
        result: {
            [id: string]: Category;
        };
        status: Status;
    },
    subCategoryFilters: {
        result: {
            [id: string]: Category;
        };
        status: Status;
    };
    // 二级分类商品
    categoryGoods: {
        status: Status | 'finished';
        result: Pagination<Goods>
    }
}

// 定义 Actions 对象的类型
type Actions = {
    getCategories(): Promise<void>;
    getTopCategories(id: string): Promise<void>;
    getSubCategoryFilters(id: string): Promise<void>;
    toggle(id: string, target: boolean): void;
    getCategoryGoods(id: string, params: Omit<GoodsRequestParams, 'categoryId'>): void
};
type Getters = {
    currentTop: (state: State) => (id: string) => Category | undefined,
    currentTopAndSub: (state: State) => (id1: string, id2: string) => { topCategory: Category | undefined, subCategory: Category | undefined }
}

export const useCategoryStore = defineStore<'category', State, Getters, Actions>('category', {
    state: () => ({
        categories: { headerNav: [], status: 'idle', homeCategory: [] },
        topCategories: { result: {}, status: 'idle' },
        subCategoryFilters: { result: {}, status: 'idle' },
        categoryGoods: {
            result: { page: 0, pages: 0, pageSize: 0, counts: 0, items: [], }, status: 'idle'
        }
    }),
    getters: {
        currentTop(state) {
            return function (id) {
                return state.categories.headerNav.find(i => i.id === id)
            }
        },
        currentTopAndSub: (state) => (id1, id2) => {
            const topCategory = state.categories.headerNav.find(i => i.id === id1)
            const subCategory = topCategory?.children?.find(i => i.id === id2)
            return { topCategory, subCategory }
        }
    },
    actions: {
        // 获取导航数据
        async getCategories() {
            this.categories.status = 'loading' // 等待状态
            try {
                const response = await CategoryAPI.getCategories()
                //  将isOpen缝合在一起
                this.categories.headerNav = response.result.map((category: Category) => ({ ...category, isOpen: false }));
                this.categories.homeCategory = response.result.map((i: Category) => ({ ...i, children: i.children?.slice(0, 2) }))
                this.categories.status = 'success'
            } catch (error) {
                this.categories.status = 'error'
            }
        },
        async getTopCategories(id) {
            this.topCategories.status = 'loading'
            try {
                const { result } = await CategoryAPI.getTopCategoryById(id)
                this.topCategories.result[result.id] = result;
                this.topCategories.status = 'success'
            } catch (error) {
                this.topCategories.status = 'error'
            }
        },
        async getSubCategoryFilters(id) {
            this.subCategoryFilters.status = 'loading'
            try {
                const { result } = await CategoryAPI.getSubCategoryFilters(id)
                this.subCategoryFilters.result[result.id] = result;
                this.subCategoryFilters.status = 'success'
            } catch (error) {
                this.subCategoryFilters.status = 'error'
            }
        },
        async getCategoryGoods(categoryId: string, reqParams: Omit<GoodsRequestParams, 'categoryId'>) {
            if (this.categoryGoods.status === 'finished') return;
            // 更新加载状态
            this.categoryGoods.status = "loading";
            // 捕获错误
            try {
                // 发送请求获取二级分类商品数据
                let response = await CategoryAPI.getCategoryGoods(
                    categoryId,
                    reqParams
                );
                // 重新在本地存储分页数据以及商品数据
                if (reqParams?.page === 1) {
                    // 存储状态
                    this.categoryGoods.result = response.result;
                } else {
                    // 累加状态
                    this.categoryGoods.result = {
                        ...response.result,
                        items: [
                            ...this.categoryGoods.result.items,
                            ...response.result.items,
                        ],
                    };
                }
                // 如果当前请求页已经是最后一页或者服务端没有商品数据
                if (reqParams?.page === response.result.pages || response.result.pages === 0) {
                    // 更新加载状态
                    this.categoryGoods.status = "finished";
                } else {
                    // 更新加载状态
                    this.categoryGoods.status = "success";
                }
            } catch (e) {
                // 更新加载状态
                this.categoryGoods.status = "error";
            }
        },
        toggle(id: string, target: boolean) {
            // 找到目标
            const category = this.categories.headerNav.find((category) => category.id === id);
            // 如果目标分类存在, 设置它的 isOpen 属性值为 target
            if (category) category.isOpen = target;

        }
    },
    // persist: true,
})