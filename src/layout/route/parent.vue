<template>
    <div class="layout-parent">
        <router-view v-slot="{ Component }">
            <transition :name="setTransitionName" mode="out-in">
                <keep-alive :include="getKeepAliveNames">
                    <component :is="Component" v-show="!isIframePage" :key="state.refreshRouterViewKey" class="w100%" />
                </keep-alive>
            </transition>
        </router-view>
        <!-- <transition :name="setTransitionName" mode="out-in">
            <IframeView v-show="isIframePage" class="w100%" :refresh-key="state.iframeRefreshKey" :name="setTransitionName"
                :list="state.iframeList" />
        </transition> -->
    </div>
</template>

<script setup lang="ts">
// 引入组件
// const IframeView = defineAsyncComponent(() => import('@/layout/route/iframe.vue'))

// 定义变量内容
const route = useRoute()
const themeState = useThemeConfig()

const state = reactive({
    refreshRouterViewKey: '', // 非 iframe tagsView 右键菜单刷新时
    iframeRefreshKey: '', // iframe tagsView 右键菜单刷新时
    keepAliveNameList: [],
    iframeList: [],
})

// 设置主界面切换动画
const setTransitionName = computed(() => {
    return themeState.themeConfig.animation
})
// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
    return []
    // return themeConfig.value.isTagsView ? cachedViews.value : state.keepAliveNameList
})
// 设置 iframe 显示/隐藏
const isIframePage = computed(() => {
    return route.meta.isIframe
})
</script>
