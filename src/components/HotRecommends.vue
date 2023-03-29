<!-- 人气推荐 -->
<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <div class="relative">
            <ul class="goods-list" ref="target">
                <Transition name="fade">
                    <HomeSkeleton v-if="hotRecommends.state === 'loading'" />
                </Transition>
                <li v-for="item in hotRecommends.result" :key="item.id">
                    <RouterLink to="/">
                        <img :src="item.picture" alt="" />
                        <p class="name">{{ item.title }}</p>
                        <p class="desc">{{ item.alt }}</p>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </HomePanel>
</template>

<script setup lang="ts">
import useHomeStore from '@/stores/brandStore'
import useLazyLoad from '@/logics/useLazyLoad';
const store = useHomeStore()
const { hotRecommends } = store
const target = useLazyLoad(store.getHotRecommends)



</script>

<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
        width: 306px;
        height: 406px;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
        }

        .desc {
            color: #999;
            font-size: 18px;
        }
    }
}
</style>