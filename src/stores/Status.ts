// 存储分类导航数据和封装方法
import type { Category } from '@/types/Category'
import { defineStore } from "pinia";
import CategoryAPI from '@/api/CategoryAPI'


// 等待状态 
export type Status = "idle" | "loading" | "success" | "error";

// store 数据
interface State {
    categories: {
        headerNav: (Category & { isOpen: boolean })[];
        status: Status;
        homeCategory: Category[] // 左侧数据源
    };
}

// 定义 Actions 对象的类型
type Actions = {
    getCategories(): Promise<void>;
    toggle(id: string, target: boolean): void
};
type Getters = {

}

export const useCategoryStore = defineStore<'category', State, Getters, Actions>('category', {
    state: () => ({
        categories: { headerNav: [], status: 'idle', homeCategory: [] }
    }),
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
        toggle(id: string, target: boolean) {
            // 找到目标
            const category = this.categories.headerNav.find((category) => category.id === id);
            // 如果目标分类存在, 设置它的 isOpen 属性值为 target
            if (category) category.isOpen = target;

        }
    }
})