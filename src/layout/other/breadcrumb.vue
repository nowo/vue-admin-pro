<template>
    <div v-if="isShowBreadcrumb" class="layout-breadcrumb">
        <div class="h100% w40px flex-center cursor-pointer" @click="onThemeConfigChange">
            <i class="text-18px" :class="themeConfig.isCollapse ? 'i-ep-expand' : 'i-ep-fold'" />
        </div>
        <!-- <SvgIcon class="layout-breadcrumb-expand" :name="themeConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'" :size="16"
            @click="onThemeConfigChange" /> -->
        <el-breadcrumb class="layout-breadcrumb-hide">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.path">
                    <span v-if="k === breadcrumbList.length - 1" class="layout-breadcrumb-span">
                        <SvgIcon v-if="themeConfig.isBreadcrumbIcon" :name="v.meta?.icon" class="layout-breadcrumb-icon" />
                        <div v-if="!v.meta?.tagsViewName">{{ v.meta?.title }}</div>
                        <div v-else>{{ v.meta?.tagsViewName }}</div>
                    </span>
                    <a v-else @click.prevent="onBreadcrumbClick(v)">
                        <SvgIcon v-if="themeConfig.isBreadcrumbIcon" :name="v.meta?.icon" class="layout-breadcrumb-icon" />
                        {{
                            v.meta?.title }}
                    </a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getParentNode } from '@/utils/common/tree'

// 定义变量内容
const userState = useUserStore()

const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const route = useRoute()
const router = useRouter()
const state = reactive({
    breadcrumbList: [],
    routeSplit: [],
    routeSplitFirst: '',
    routeSplitIndex: 1,
})

// 动态设置经典、横向布局不显示
const isShowBreadcrumb = computed(() => {
    // initRouteSplit(route.path)
    const { layout, isBreadcrumb } = themeConfig.value
    if (layout === 'classic' || layout === 'transverse') return false
    else return !!isBreadcrumb
})
// 面包屑点击时
const onBreadcrumbClick = (v: RouteRecordCustom) => {
    router.push(v.path)
    // const { redirect, path } = v
    // if (redirect) router.push(redirect)
    // else router.push(path)
}
// 展开/收起左侧菜单点击
const onThemeConfigChange = () => {
    themeConfig.value.isCollapse = !themeConfig.value.isCollapse
    storesThemeConfig.saveThemeConfig()
}

// 面包屑导航
const breadcrumbList = computed(() => {
    // console.log(userState.menuList)
    // return []
    // 首页
    const home = getParentNode(userState.menuList, '/', 'path')

    const list = getParentNode(userState.menuList, route.path, 'path')
    if (list.length === 1) {
        list.unshift(home[0])
    } else if (list[0].meta?.title === list[1]?.meta?.title) {
        // 一级菜单标题和二级菜单标题一致时，删除一个（首页）
        list.shift()
    }
    console.log(list)
    return list
})
</script>

<style scoped lang="scss">
.layout-breadcrumb {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;

    .layout-breadcrumb-expand {
        cursor: pointer;
        font-size: 18px;
        color: var(--next-bg-topBarColor);
        height: 100%;
        width: 40px;
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }

    .layout-breadcrumb-span {
        display: flex;
        opacity: 0.7;
        color: var(--next-bg-topBarColor);
    }

    .layout-breadcrumb-icon {
        font-size: 14px;
        margin-right: 5px;
    }

    :deep(.el-breadcrumb__separator) {
        opacity: 0.7;
        color: var(--next-bg-topBarColor);
    }

    :deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
        font-weight: unset !important;
        color: var(--next-bg-topBarColor);

        &:hover {
            color: var(--el-color-primary) !important;
        }
    }
}
</style>
