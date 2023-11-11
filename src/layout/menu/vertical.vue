<template>
    <el-menu class="menu-box" router :default-active="defaultActive" background-color="transparent" :collapse="isCollapse"
        :unique-opened="getThemeConfig.isUniqueOpened" :collapse-transition="false">
        <template v-for="val in menuLists">
            <el-sub-menu v-if="val.children && val.children.length > 0" :key="val.path" :index="val.path">
                <template #title>
                    <SvgIcon :name="val.meta!.icon" />
                    <span>{{ val.meta?.title }}</span>
                </template>
                <SubItem :child="val.children" />
            </el-sub-menu>
            <template v-else>
                <el-menu-item :key="setRoutePath(val)" :index="setRoutePath(val)">
                    <SvgIcon :name="val.meta!.icon" />
                    <template v-if="!val.meta?.isLink || (val.meta.isLink && val.meta.isIframe)" #title>
                        <!-- <el-badge :value="12" class="menu-badge">
                            <span>{{ val.meta?.title }}</span>
                        </el-badge> -->
                        <span>{{ val.meta?.title }}
                            <!-- <el-tag v-if="setTipsTag(val)" type="danger" size="small" effect="dark" round
                                disable-transitions>
                                {{ setTipsTag(val) }}
                            </el-tag> -->
                        </span>
                    </template>
                    <template v-else #title>
                        <a :href="val.meta.isLink" target="_blank" rel="opener" class="w100">{{ val.meta.title }}</a>
                    </template>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts" setup>
import type { RouteLocation, RouteRecordRaw } from 'vue-router'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

// import { getParentId } from '@/utils/common/tree';
// import { useMenuNumberState, useRoutesList } from '@/stores/routesList';

const props = defineProps<{
    menuList: RouteRecordRaw[]
}>()

const SubItem = defineAsyncComponent(() => import('@/layout/menu/SubItem.vue'))

// const stores = useRoutesList();
const storesThemeConfig = useThemeConfig()
// const { routesList } = storeToRefs(stores);
const { themeConfig } = storeToRefs(storesThemeConfig)

const route = useRoute()

const state = reactive({
    // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
    defaultActive: route.meta.isDynamic ? (route.meta.isDynamicPath as string) : route.path,
    // defaultActive: route.meta.isDynamic ? (route.meta.isDynamicPath as string) : setRoutePath(route),
    isCollapse: false,
})
// 获取父级菜单数据
const menuLists = computed(() => {
    return props.menuList
})
// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value
})

// 设置路由链接地址带参数
const setRoutePath = (param: RouteRecordRaw) => {
    if (param.meta?.query) {
        let url = ''
        const obj: any = param.meta?.query ?? {}
        for (const i in obj) {
            url += `&${i}=${obj[i]}`
        }
        const a = url.slice(1) //  ?  .slice(1)  将前一个字符串除以后的部分取出来
        return `${param.path}?${a}`
    }
    return param.path
}
// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute: RouteLocation) => {
    const param = setRoutePath(currentRoute as any)
    return param

    // return currentRoute
}

// 设置菜单的收起/展开
watch(
    themeConfig.value,
    () => {
        document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = themeConfig.value.isCollapse)
    },
    {
        immediate: true,
    },
)
// 页面加载时
onMounted(() => {
    state.defaultActive = setParentHighlight(route)
})
// 路由更新时
onBeforeRouteUpdate((to) => {
    // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
    state.defaultActive = setParentHighlight(to)
    const clientWidth = document.body.clientWidth
    if (clientWidth < 1000) themeConfig.value.isCollapse = false
})

const { defaultActive, isCollapse } = toRefs(state)
</script>

<style lang="scss" scoped>
.menu-box {
    // width: var(--el-aside-width);
    --el-menu-icon-width: 18px;
    --el-menu-text-color: var(--co-menu-text-color);
    border-right: 0;

    // .el-menu-item * {
    //     vertical-align: middle;

    //     .el-tag {
    //         padding: 0 5px;
    //     }
    // }

    // .el-menu-item,
    // .el-sub-menu {

    //     .iconfont,
    //     .fa {
    //         width: var(--el-menu-icon-width);
    //     }
    // }
}
</style>
