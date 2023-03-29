<!-- home 内容模板 -->
<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 左侧标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
                <!-- 右侧查看更多 -->
                <slot name="right"></slot>
            </div>
            <!-- 内容插槽占位 -->
            <slot name="default"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title?: string, subTitle: string }>(), {
    title: '',
    subTitle: ''
})

</script>


<style scoped lang="less">
.home-panel {
    background-color: #fff;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>