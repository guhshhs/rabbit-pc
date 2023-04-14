<template lang="">
    <div v-if="topCategories.result[route.params.id as string]">
        <div class="ref-goods" v-for="data in topCategories.result[route.params.id as string].children" :key="data.id">
            <div class="head">
                <h3>- {{ data.name }} -</h3>
                <p class="tag">温暖柔软，品质之选</p>
                <XtxMore />
            </div>
            <div class="body">
                <GoodsItems v-for="i in data.goods" :data="i" :key="i.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/Status';
import { onBeforeRouteUpdate } from 'vue-router';
const route = useRoute()
const categoryStore = useCategoryStore()
const { topCategories } = storeToRefs(useCategoryStore())
categoryStore.getTopCategories(useRoute().params.id as string)
onBeforeRouteUpdate((to) => {
    categoryStore.getTopCategories(to.params.id as string)
})



</script>

<style lang="less" scoped>
.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .head {
        .xtx-more {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .tag {
            text-align: center;
            color: #999;
            font-size: 20px;
            position: relative;
            top: -20px;
        }
    }

    .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
    }
}
</style>