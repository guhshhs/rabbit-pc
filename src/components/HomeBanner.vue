<!-- 轮播图组件 -->
<template>
    <div class="home-banner">
        <XtxCarousel :carousels="banner.result" v-if="banner.status === 'success'">
            <template v-for="(item, index) in banner.result" :key="index" v-slot:[`default-${index}`]>
                <RouterLink :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt="" />
                </RouterLink>
            </template>
        </XtxCarousel>
    </div>
</template>



<script setup lang="ts">
import useHomeStore from '@/stores/brandStore'
const homeStore = useHomeStore()
homeStore.getBanner(1)
const { banner } = homeStore
</script>



<style scoped lang="less">
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    .xtx-carousel {
        :deep(.carousel-btn.prev) {
            left: 270px;
        }

        :deep(.carousel-indicator) {
            padding-left: 250px;
        }
    }
}
</style>