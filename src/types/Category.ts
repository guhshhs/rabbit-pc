import type { Brands } from './Brands';
import type { Goods } from './Goods'  // 导航接口 goods 类型

// 导航接口 
export interface Category {
    id: string;
    name: string;
    picture: string;
    saleInfo: string;
    children: Category[] | undefined; // 数据结构和Category相同
    goods: Goods[] | undefined;
    saleProperties: SaleProperty[] | undefined;
    brands: Brands[] | undefined;
    // 添加属性
    layer: number;
    parent: Category | undefined;
}

export interface SaleProperty {
    id: string;
    name: string;
    properties: Omit<SaleProperty, "properties">[];
}
