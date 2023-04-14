<template>
    <div class="container">
        <!-- 导航 -->
        <XtxBread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <XtxBreadItem :key="target.topCategory?.id">{{ target.topCategory?.name }}</XtxBreadItem>
            <transition name="fade-right" mode="out-in">
                <XtxBreadItem :key="target.subCategory?.id">{{ target.subCategory?.name }}</XtxBreadItem>
            </transition>
        </XtxBread>

        <!-- 索引导航 -->
        <sub-category-filter @onChange="sortData" />

        <!-- 排序组件 -->
        <div class="goods-list">
            <SubCategorySort @onChange="fileData" />
            <goods-list :items="categoryGoods.result.items" />
            <XtxInfiniteLoading @infinite="loadMore" :loading="categoryGoods.status === 'loading' ? true : false"
                :finished="categoryGoods.status === 'finished' ? true : false" />
        </div>


    </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/Status';
import type { GoodsRequestParams } from '@/types/Goods';
import { onBeforeRouteUpdate } from 'vue-router';
const store = useCategoryStore()
const route = useRoute()
const target = computed(() => store.currentTopAndSub(route.params.top as string, route.params.sub as string))

// 用于存储排序条件
let sortParams = {};
// 用于存储筛选条件
let filterParams = {};
// 用于存储分页数据
let pageParams = { page: 1, pageSize: 2 };

const sortData = (target: Partial<GoodsRequestParams>) => {
    sortParams = target
    sendRequest()
}
const fileData = (target: Partial<GoodsRequestParams>) => {
    filterParams = target
    sendRequest()
}
const getReqParams = () => ({ ...sortParams, ...filterParams, ...pageParams })
const { getCategoryGoods } = store
const { categoryGoods } = storeToRefs(store)
const sendRequest = () => {
    // 合并请求参数
    const reqParams = getReqParams();
    // 发送请求获取商品列表
    getCategoryGoods(route.params.sub as string, reqParams);
    // 筛选条件、排序条件发生变化 重置页码
    pageParams.page = 1;
    // 重置请求状态
    categoryGoods.value.status = "loading";
}

const loadMore = () => {
    const reqParams = getReqParams();
    pageParams.page += 1
    getCategoryGoods(route.params.sub as string, reqParams as GoodsRequestParams);
}

sendRequest()

onBeforeRouteUpdate(() => {
    sortParams = {};
    filterParams = {};
    // 重置页码
    pageParams.page = 1;
    // 重置请求加载状态
    categoryGoods.value.status = "loading";
    const reqParams = getReqParams();
    getCategoryGoods(route.params.sub as string, reqParams as GoodsRequestParams);
})


</script>

<style scoped lang="less">
.goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;
}
</style>
