<!-- src/views/category/components/SubCategorySort.vue -->
<template>
    <div class="sub-sort">
        <div class="sort">
            <a href="javascript:" @click="updateSortParams({ sortField: '' })"
                :class="{ active: sortParams.sortField === '' }">默认排序</a>
            <a href="javascript:" @click="updateSortParams({ sortField: 'publishTime' })"
                :class="{ active: sortParams.sortField === 'publishTime' }">最新商品</a>
            <a href="javascript:" @click="updateSortParams({ sortField: 'orderNum' })"
                :class="{ active: sortParams.sortField === 'orderNum' }">最高人气</a>
            <a href="javascript:" @click="updateSortParams({ sortField: 'evaluate' })"
                :class="{ active: sortParams.sortField === 'evaluate' }">评论最多</a>
            <a href="javascript:" @click="updateSortParams({ sortField: 'price' })">
                价格排序
                <i class="arrow up" :class="{ active: sortParams.sortMethod == 'asc' }"></i>
                <i class="arrow down" :class="{ active: sortParams.sortMethod == 'desc' }"></i>
            </a>
        </div>
        <div class="check">
            <XtxCheckbox :checked="sortParams.inventory" @change="updateSortParams({ inventory: $event })">仅显示有货商品
            </XtxCheckbox>
            <XtxCheckbox :checked="sortParams.onlyDiscount" @change="updateSortParams({ onlyDiscount: $event })">
                仅显示特惠商品
            </XtxCheckbox>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GoodsRequestParams } from '@/types/Goods';
import { onBeforeRouteUpdate } from 'vue-router';
type SortParams = Pick<GoodsRequestParams, "sortField" | "sortMethod" | "inventory" | "onlyDiscount">;
const emit = defineEmits<{ (e: 'onChange', target: SortParams): void }>()

// 排序条件默认
let initialSortParams: SortParams = {
    sortField: "",  // 默认排序
    sortMethod: '', // 价格
    inventory: false,  // 是否有货
    onlyDiscount: false // 是否是特惠商品
}

// 排序条件
let sortParams = ref<SortParams>({ ...initialSortParams });

const updateSortParams = (target: Partial<SortParams>) => {
    sortParams.value = { ...sortParams.value, ...target }
    if (target.sortField === 'price') {
        sortParams.value = { ...sortParams.value, sortMethod: sortParams.value.sortMethod === "desc" ? "asc" : "desc", }
    } else if (target.sortField === "" ||
        target.sortField === "publishTime" ||
        target.sortField === "orderNum" ||
        target.sortField === "evaluate") sortParams.value = { ...sortParams.value, sortMethod: sortParams.value.sortMethod = '' };
    emit('onChange', sortParams.value)
}

onBeforeRouteUpdate(() => {
    sortParams.value = { ...initialSortParams }
})

</script>

<style scoped lang="less">
.sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sort {
        display: flex;

        a {
            height: 30px;
            line-height: 28px;
            border: 1px solid #e4e4e4;
            padding: 0 20px;
            margin-right: 20px;
            color: #999;
            border-radius: 2px;
            position: relative;
            transition: all 0.3s;

            &.active {
                background: @xtxColor;
                border-color: @xtxColor;
                color: #fff;
            }

            .arrow {
                position: absolute;
                border: 5px solid transparent;
                right: 8px;

                &.up {
                    top: 3px;
                    border-bottom-color: #bbb;

                    &.active {
                        border-bottom-color: #27ba9b;
                    }
                }

                &.down {
                    top: 15px;
                    border-top-color: #bbb;

                    &.active {
                        border-top-color: #27ba9b;
                    }
                }
            }
        }
    }

    .check {
        .xtx-checkbox {
            margin-left: 20px;
            color: #999;
        }
    }
}
</style>