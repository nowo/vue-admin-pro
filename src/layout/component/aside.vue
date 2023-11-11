<template>
    <el-aside class="layout-aside flex flex-col" :class="{ collapse: themeState.themeConfig.isCollapse }">
        <Logo />
        <el-scrollbar class="flex-auto">
            <Vertical :menu-list="menuList" />
        </el-scrollbar>
    </el-aside>
</template>

<script setup lang="ts">
// 引入组件
const Logo = defineAsyncComponent(() => import('@/layout/other/logo.vue'))
const Vertical = defineAsyncComponent(() => import('@/layout/menu/vertical.vue'))

const userState = useUserStore()
const themeState = useThemeConfig()
console.log(userState)

const menuList = computed(() => {
    return userState.routesList[0].children || []
})
</script>

<style lang="scss" scoped>
.layout-aside {
    background: var(--co-menu-bg-color);
    box-shadow: 2px 0 6px rgb(0 21 41 / 1%);
    transition: all 0.3s ease;

    &.collapse {
        // width: fit-content;
        width: 60px;
        // transition: width 0.3s ease;
    }

}
</style>
