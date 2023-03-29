// 数据懒加载 当移动视图到可视区发现目标时，目标才开始加载
export type apiAction = () => Promise<void>

export default function useLazyLoad(apiAction: apiAction) {
    const target = ref<HTMLElement>() //  目标值
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            stop()
            apiAction()
        }
    },
        { threshold: 0 }) 
    return target
}
