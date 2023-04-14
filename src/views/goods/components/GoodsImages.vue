<template>
    <div class="goods-image">
        <div class="large" v-show="!isOutside" :style="{
            backgroundImage: `url(${mainPictures[current]})`, backgroundPositionX: bgPosition.x + 'px',
                backgroundPositionY: bgPosition.y + 'px', }"></div>
        <div class="middle" ref="middleElement">
            <img :src="mainPictures[current]" alt="" />
            <div class="layer" :style="{ left: layerPosition.left + 'px', top: layerPosition.top + 'px' }"
                v-show="!isOutside"></div>
        </div>
        <ul class="small">
            <li :class="{ active: i === current }" v-for="(item, i) in mainPictures" :key="i" @mouseenter="current = i">
                <img :src="item" alt="" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { GoodsStore } from '@/stores/GoodsStore'
const store = GoodsStore()
const { mainPictures } = storeToRefs(store)
let current = ref(0)
const middleElement = ref()
// isOutside 鼠标是否在元素的外部
const { isOutside, elementX, elementY } = useMouseInElement(middleElement)
// 镜片位置
const layerPosition = reactive({ left: 0, top: 0 });
// 大镜片位置
const bgPosition = reactive({ x: 0, y: 0 });
watchEffect(() => {
    layerPosition.left = elementX.value - 100;
    layerPosition.top = elementY.value - 100;
    // 控制横向镜头
    if (layerPosition.left < 0) {
        layerPosition.left = 0
    } else if (layerPosition.left > 200) {
        layerPosition.left = 200
    }
    // 控制纵向镜头
    if (layerPosition.top < 0) {
        layerPosition.top = 0
    } else if (layerPosition.top > 200) {
        layerPosition.top = 200
    }
    // 记录大图位置
    bgPosition.x = -layerPosition.left * 2;
    bgPosition.y = -layerPosition.top * 2;
})



</script>



<style scoped lang="less">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
        position: relative;
        cursor: move;

        .layer {
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.2);
            left: 0;
            top: 0;
            position: absolute;
        }
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid @xtxColor;
            }
        }
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }
}
</style>