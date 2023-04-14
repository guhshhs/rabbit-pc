<!-- src/components/XtxCheckbox.vue -->
<template>
    <div class="xtx-checkbox" @click="toggle">
        <i class="iconfont icon-checked" v-if="isChecked"></i>
        <i class="iconfont icon-unchecked" v-else></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{ modelValue?: boolean; checked?: boolean }>(),
    { modelValue: undefined }
);
// const isChecked = useVModel(props,'checked',emit)  
const isChecked = ref(false)

const emit = defineEmits<{
    (e: "change", checked: boolean): void
}>()

const toggle = () => {
    isChecked.value = !isChecked.value
    emit('change', isChecked.value)
}


</script>

<style scoped lang="less">
.xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
        color: @xtxColor;

        ~span {
            color: @xtxColor;
        }
    }

    i {
        position: relative;
        top: 1px;
    }

    span {
        margin-left: 2px;
    }
}
</style>