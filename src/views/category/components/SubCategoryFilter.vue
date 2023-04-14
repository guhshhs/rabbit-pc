<!-- src/views/category/components/SubCategoryFilter.vue -->
<template >
    <!-- 骨架屏 -->
    <div class="sub-filter" v-if="subCategoryFilters.status === 'loading'">
        <XtxSkeleton class="item" width="800px" height="25px" />
        <XtxSkeleton class="item" width="800px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
        <XtxSkeleton class="item" width="600px" height="25px" />
    </div>
    <div class="sub-filter" v-else>
        <div class="sub-filter" v-if="subCategoryFilters.status === 'success'">
            <div class="item">
                <div class="head">品牌：</div>
                <div class="body">
                    <a :class="{ active: selectFilters.brandId === undefined }" href="javascript:"
                        @click="onSelectedFiltersChanged({ brandId: undefined })">全部</a>
                    <a href="javascript:" :class="{ active: selectFilters.brandId === i.id }"
                        v-for="i in subCategoryFilters.result[route.params.sub as string].brands" :key="i.id"
                        @click="onSelectedFiltersChanged({ brandId: i.id })">{{ i.name }}</a>
                </div>
            </div>
            <div class="item" v-for="(item, index) in subCategoryFilters.result[route.params.sub as string].saleProperties"
                :key="index">
                <div class="head">{{ item.name }}</div>
                <div class="body">
                    <a :class="{ active: selectFilters[item.name] === undefined }"
                        @click="onSelectedFiltersChanged({ [item.name]: undefined })" href="javascript:">全部</a>
                    <a href="javascript:" :class="{ active: selectFilters[item.name] === i.name }"
                        v-for="i in item.properties" :key="i.id"
                        @click="onSelectedFiltersChanged({ [item.name]: i.name })">{{ i.name
                        }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/Status'
import { onBeforeRouteUpdate } from 'vue-router'
import type { GoodsRequestParams } from '@/types/Goods';
import { omitBy, transform } from 'lodash';
const { subCategoryFilters } = useCategoryStore()
const route = useRoute()
const emit = defineEmits<{ (e: 'onChange', params: FilterParams): void }>()
useCategoryStore().getSubCategoryFilters(useRoute().params.sub as string)
onBeforeRouteUpdate((to) => {
    useCategoryStore().getSubCategoryFilters(to.params.sub as string)
    selectFilters.value = {}
    target = {}
})

type FilterParams = Partial<Pick<GoodsRequestParams, 'brandId' | 'attrs'>>

type SelectFilter = {
    brandId: string;
    [groupName: string]: string
}

let selectFilters = ref<Partial<SelectFilter>>({});
let target: any = reactive({})



function onSelectedFiltersChanged(filters: Partial<SelectFilter>) {
    selectFilters.value = { ...selectFilters.value, ...filters };
    target = transform(omitBy(selectFilters.value, value => value === undefined), (result: FilterParams, value, key) => {
        if (key === 'brandId') {
            result[key] = value
        } else {
            if (!result.attrs) result.attrs = []
            result.attrs.push({ groupName: key, propertyName: value! })
        }
        return result
    }, {})
    emit('onChange', target)
}

// onBeforeRouteUpdate(() => {
//     emit('onChange', {})
// })

</script>


<style scoped lang="less">
.sub-filter {
    background: #fff;
    padding: 25px;

    .item {
        display: flex;
        line-height: 40px;

        .head {
            width: 80px;
            color: #999;
        }

        .body {
            flex: 1;

            a {
                margin-right: 36px;
                transition: all 0.3s;
                display: inline-block;

                &.active,
                &:hover {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>