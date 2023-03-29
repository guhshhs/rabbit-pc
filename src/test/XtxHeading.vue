<template>
    <render />
</template>

<script lang="ts" setup>
import { h, useSlots } from "vue";
const props = defineProps<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>();
const slot = useSlots()

// 渲染函数创建 模板
const render = () => {
    return h(`h${props.level}`, slot.default?.())
}
</script>