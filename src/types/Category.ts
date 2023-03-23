import type { Goods } from './Goods'  // 导航接口 goods 类型

// 导航接口 
export interface Category {
    id: string;
    name: string;
    picture: string;
    children: Category[] | undefined; // 数据结构和Category相同
    goods: Goods[] | undefined
}