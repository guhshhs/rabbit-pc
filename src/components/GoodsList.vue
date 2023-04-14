<template>
    <ul>
        <li v-for="i in items" :key="i.id">
            <GoodsItems :data="i" />
        </li>
    </ul>
</template>
 
<script setup lang="ts">
import type { Goods } from "@/types/Goods";

const props = defineProps<{ items: Goods[] }>()

</script>

<style scoped lang="less">
ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>