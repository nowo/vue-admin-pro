<template>
    <component :is="layoutComponent" :class="themeState.themeConfig.layout" />
</template>

<script setup lang="ts">
// 定义变量内容
const themeState = useThemeConfig()

// 相应的布局组件
const layoutComponent = computed(() => {
    const comp = themeState.themeConfig.layout
    console.log('comp', comp)
    if (comp === 'columns') {
        return defineAsyncComponent(() => import('@/layout/main/columns.vue'))
    } else if (comp === 'classic') {
        return defineAsyncComponent(() => import('@/layout/main/classic.vue'))
    } else if (comp === 'transverse') {
        return defineAsyncComponent(() => import('@/layout/main/transverse.vue'))
    } else { // 默认布局
        return defineAsyncComponent(() => import('@/layout/main/default.vue'))
    }
})

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
    // if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout)
    // const clientWidth = document.body.clientWidth
    // if (clientWidth < 1000) {
    //     themeConfig.value.isCollapse = false
    //     mittBus.emit('layoutMobileResize', {
    //         layout: 'defaults',
    //         clientWidth,
    //     })
    // } else {
    //     mittBus.emit('layoutMobileResize', {
    //         layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
    //         clientWidth,
    //     })
    // }
}
// 页面加载前
// onBeforeMount(() => {
//     onLayoutResize()
//     window.addEventListener('resize', onLayoutResize)
// })
// // 页面卸载时
// onUnmounted(() => {
//     window.removeEventListener('resize', onLayoutResize)
// })
</script>
