<template>
    <div class="xtx-goods-page">
        <div class="container" v-if="goods.status === 'success'">
            <!-- 面包屑 -->
            <XtxBread>
                <XtxBreadItem path="/">首页</XtxBreadItem>
                <XtxBreadItem :path="`/category/${goods.result.categories[1].id}`">{{ goods.result.categories[1].name }}
                </XtxBreadItem>
                <XtxBreadItem :path="`/category/sub/${goods.result.categories[1].id}/${goods.result.categories[0].id}`">
                    {{ goods.result.categories[0].name }}</XtxBreadItem>
                <XtxBreadItem>{{ goods.result.name }}</XtxBreadItem>
            </XtxBread>
            <!-- 商品信息 -->
            <div class="goods-info">
                <!-- 左侧 -->
                <div class="media">
                    <GoodsImages />
                    <GoodsSales />
                </div>
                <!-- 右侧 -->
                <div class="spec">
                    <GoodsInfo />
                    <GoodsSku :specs="goods.result.specs" />
                </div>
            </div>
            <!-- 同类商品 -->
            <!-- 商品详情 -->
            <div class="goods-footer">
                <div class="goods-article">
                    <!-- 商品+评价 -->
                    <div class="goods-tabs"></div>
                </div>
                <!-- 24热榜 -->
                <div class="goods-aside"></div>
            </div>
        </div>
        <div class="container loading-container">
            <img src="@/assets/images/loading.gif" v-if="goods.status === 'loading'" alt="" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { GoodsStore } from '@/stores/GoodsStore'
import { onBeforeRouteUpdate } from 'vue-router';
const store = GoodsStore()
const { goods } = storeToRefs(store)
store.getGoods(useRoute().params.id as string)

onBeforeRouteUpdate((to) => {
    store.getGoods(to.params.id as string)
})

console.log(goods);





</script>

<style scoped lang="less">
.goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
    }

    .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
    }
}

.goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
        width: 940px;
        margin-right: 20px;
    }

    .goods-aside {
        width: 280px;
        min-height: 1000px;
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;
}

.goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    background: #fff;
}
</style>