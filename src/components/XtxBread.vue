<template>
    <div>
        <render />
    </div>
</template>

<script setup lang="ts">
import { h, useSlots } from 'vue';
import type { VNode } from 'vue';
const slot = useSlots().default?.()

function render() {
    // 将传入的模板数据进行处理 如果不是最后一项就给它加一个i标签
    // 模板累加 reduce 中使用内联函数(累加项,初始值,下标,原数组) concat 数组拼接
    const result = slot?.reduce(
        (result: VNode[], item, index, array) =>
            result.concat(
                index < array.length - 1 ? [item, h('i', { class: 'iconfont icon-angle-right' })] : [item]
            )
        , [])
    return h('div', { class: 'xtx-bread' }, result)
}



</script>

<style scoped lang="less">
.xtx-bread {
    display: flex;
    padding: 25px 10px;
}

:deep(i) {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 20px;
}
</style>
