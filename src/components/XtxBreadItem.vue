<!-- src/components/XtxBreadItem.vue -->

<template>
    <div class="xtx-bread-item">
        <RouterLink v-if="path" :to="path">
            <slot></slot>
        </RouterLink>
        <span v-else>
            <slot></slot>
        </span>
    </div>
</template>


<script setup lang="ts">
import { h, useSlots } from "vue";
const props = defineProps<{ path?: string }>();
const slots = useSlots()

function render() {

}

</script>

<style lang="less" scoped>
.xtx-bread-item {
    a {
        color: #666;
        transition: all 0.4s;

        &:hover {
            color: @xtxColor;
        }
    }
}
</style>