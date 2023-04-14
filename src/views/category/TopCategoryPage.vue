<template>
    <div class="container">
        <!-- 导航 -->
        <xtx-bread>
            <XtxBreadItem path="/">首页</XtxBreadItem>
            <transition name="fade-right" mode="out-in">
                <XtxBreadItem :key="target?.id">{{ target?.name }}</XtxBreadItem>
            </transition>
        </xtx-bread>

        <!-- 轮播图 -->
        <XtxCarousel v-if="banner.status === 'success'" :carousels="banner.result" style="height: 500px">
            <template v-for="(item, index) in banner.result" :key="item.id" v-slot:[`default-${index}`]>
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" :alt="item.imgUrl" />
                </RouterLink>
            </template>
        </XtxCarousel>

        <!-- 分类组件 -->
        <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
                <li v-for="i in target.children" :key="i.id">
                    <a href="javascript:">
                        <img :src="i.picture" alt="" />
                        <p>{{ i.name }}</p>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 二级分类商品  -->
            <RecommendsGoods/>

    </div>
</template>


<script setup lang="ts">
import { useCategoryStore } from '@/stores/Status';
import useHomeStore from '@/stores/brandStore'
const categoryStore = useCategoryStore()
const target = computed(() => categoryStore.currentTop(useRoute().params.id as string))
const { banner } = storeToRefs(useHomeStore());


</script>

<style lang="less" scoped>
.sub-list {
    margin-top: 20px;
    background-color: #fff;

    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;

        li {
            width: 168px;
            height: 160px;

            a {
                text-align: center;
                display: block;
                font-size: 16px;

                img {
                    width: 100px;
                    height: 100px;
                }

                p {
                    line-height: 40px;
                }

                &:hover {
                    color: @xtxColor;
                }
            }
        }
    }
}
</style>