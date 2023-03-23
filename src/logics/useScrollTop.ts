// 获取滚动的方法

import { ref, onMounted, onUnmounted } from "vue"
export default function useScrollTop() {
    const scrollTop = ref<number>(0)
    // 封装获取滚动的方法
    const onScrollHandler = () => {
        scrollTop.value = document.documentElement.scrollTop
    }

    // 组件挂载完成后
    onMounted(() => {
        // 为 window 添加滚动事件
        window.addEventListener("scroll", onScrollHandler);
    });

    // 组件卸载完成后
    onUnmounted(() => {
        // 为 window 移除滚动事件
        window.removeEventListener("scroll", onScrollHandler);
    });

    return scrollTop
}