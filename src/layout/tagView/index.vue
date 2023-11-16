<template>
    <div class="layout-tag-view" :class="{ 'layout-navbar-tagsView-shadow': getThemeConfig.layout === 'classic' }">
        <el-scrollbar ref="scrollbarRef">
            <ul ref="tagsUlRef" class="layout-navbar-tagsView-ul" :class="setTagsStyle">
                <li v-for="(v, k) in tagViewState.tagViewRoutes" :key="k" ref="tagsRef" class="layout-tag-view-item" :class="{ 'is-active': isActive(v) }"
                    @click="onTagClick(v)">
                    {{ v.meta?.title }}
                </li>
                <!-- <li v-for="(v, k) in state.tagsViewList" :key="k" :ref="(el: any) => { if (el) tagsRefs[k] = el; }
                    " class="layout-navbar-tagsView-ul-li" :data-url="v.url" :class="{ 'is-active': isActive(v) }"
                    @contextmenu.prevent="onContextmenu(v, $event)" @click="onTagsClick(v, k)">
                    <i v-if="isActive(v)" class="layout-navbar-tagsView-ul-li-iconfont" />
                    <SvgIcon v-if="!isActive(v) && getThemeConfig.isTagsViewIcon" :name="v.meta.icon" class="pr5" />
                    <span class="layout-tagsView-name">{{ setTagsViewNameI18n(v) }}</span>
                    <template v-if="isActive(v)">
                        <SvgIcon name="ele-RefreshRight" class="layout-navbar-tagsView-ul-li-refresh ml5"
                            @click.stop="refreshCurrentTagsView($route.fullPath)" />
                        <SvgIcon v-if="!v.meta.isAffix" name="ele-Close"
                            class="layout-navbar-tagsView-ul-li-icon layout-icon-active"
                            @click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)" />
                    </template>
                    <SvgIcon v-if="!v.meta.isAffix" name="ele-Close"
                        class="layout-navbar-tagsView-ul-li-icon layout-icon-three"
                        @click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)" />
                </li> -->
            </ul>
        </el-scrollbar>
        <Teleport to="#app">
            <Contextmenu ref="contextmenuRef" :dropdown="state.dropdown" />
            <!-- <TagFullClose v-if="!themeConfig.isLockScreen" /> -->
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Session } from '@/utils/storage'

// import Contextmenu from '@/layout/navBars/tagsView/contextmenu.vue';
// import TagFullClose from '@/layout/navBars/breadcrumb/closeFull.vue';

const Contextmenu = defineAsyncComponent(() => import('@/layout/tagView/contextmenu.vue'))
// const TagFullClose = defineAsyncComponent(() => import('@/layout/navBars/breadcrumb/closeFull.vue'))

interface RouteParams {
    path: string
    url: string
    query: object
    params: object
}

const tagsRef = ref<HTMLLIElement[]>([])
const scrollbarRef = ref<ComponentInstance['ElScrollbar']>()
const contextmenuRef = ref<InstanceType<typeof Contextmenu>>()
const tagsUlRef = ref<HTMLUListElement>()

const storesThemeConfig = useThemeConfig()
const tagViewState = useTagViewRoutes()
const { themeConfig } = storeToRefs(storesThemeConfig)
const { tagViewRoutes } = storeToRefs(tagViewState)
const storesKeepALiveNames = useKeepAliveNames()
const route = useRoute()
const router = useRouter()

const state = reactive({
    routeActive: '',
    routePath: route.path,
    dropdown: { x: 0, y: 0 },
    sortable: '',
    tagsRefsIndex: 0,
    tagsViewList: [] as RouteRecordCustom[],
    tagsViewRoutesList: [],
})
// 动态设置 tagsView 风格样式
const setTagsStyle = computed(() => {
    return themeConfig.value.tagsStyle
})
// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value
})
// 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
// const setTagsViewNameI18n = computed(() => {
//     return (v: any) => {
//         return setTagsViewNameI18n(v);
//     };
// });
// 设置 tagsView 高亮
const isActive = (v: RouteParams) => {
    if (getThemeConfig.value.isShareTagsView) {
        return v.path === state.routePath
    } else {
        if ((v.query && Object.keys(v.query).length) || (v.params && Object.keys(v.params).length)) {
            // 普通传参
            return v.url ? v.url === state.routeActive : v.path === state.routeActive
        } else {
            // 通过 name 传参，params 取值，刷新页面参数消失
            // https://gitee.com/lyt-top/vue-next-admin/issues/I51RS9
            return v.path === state.routePath
        }
    }
}
// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
const addBrowserSetSession = (tagsViewList: Array<object>) => {
    Session.set('tagsViewList', tagsViewList)
}
// 获取 vuex 中的 tagsViewRoutes 列表
const getTagsViewRoutes = async () => {
    // state.routeActive = await setTagsViewHighlight(route)
    // state.routePath = (await route.meta.isDynamic) ? route.meta.isDynamicPath : route.path
    // state.tagsViewList = []
    // state.tagsViewRoutesList = tagViewRoutes.value

    initTagsView()
}
// vuex 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
const initTagsView = async () => {
    const list = Session.get<RouteRecordCustom[]>('tagViewRoutes')
    if (list && getThemeConfig.value.isCacheTagsView) {
        state.tagsViewList = list
    } else {
        // await state.tagsViewRoutesList.forEach((v: any) => {
        //     if (v.meta.isAffix && !v.meta.isHide) {
        //         v.url = setTagsViewHighlight(v)
        //         state.tagsViewList.push({ ...v })
        //         storesKeepALiveNames.addCachedView(v)
        //     }
        // })
        // await addTagsView(route.path, route)
    }
    // 初始化当前元素(li)的下标
    // getTagsRefsIndex(getThemeConfig.value.isShareTagsView ? state.routePath : state.routeActive)
}

// 点击标签页
const onTagClick = (row: RouteRecordCustom) => {
    router.push(row)
}

// 页面加载前
onBeforeMount(() => {

})
// 页面卸载时
onUnmounted(() => {

})
// 页面更新时
onBeforeUpdate(() => {
    tagsRef.value = []
})
// 页面加载时
onMounted(() => {
    // 初始化 pinia 中的 tagsViewRoutes 列表
    getTagsViewRoutes()
})

// 监听路由的变化，动态赋值给 tagsView
// watch(tagViewRoutes, (val) => {
//     if (val.length === state.tagsViewRoutesList.length) return false
//     getTagsViewRoutes()
// })

onBeforeRouteUpdate((val) => {
    console.log(val)
    tagViewState.addTagViewRoutes(val as unknown as RouteRecordCustom)
})

// // 监听路由的变化，动态赋值给 tagsView
// watch(pinia.state, (val) => {
//     if (val.tagsViewRoutes.tagsViewRoutes.length === state.tagsViewRoutesList.length) return false;
//     getTagsViewRoutes();
// }, {
//     deep: true,
// });
</script>

<style scoped lang="scss">
.layout-tag-view {
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--next-border-color-light);
    position: relative;

    .layout-tag-view-item {
        &.is-active,
        &:hover {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
            border-color: var(--el-color-primary-light-5);
        }
    }
}

.layout-tagsView-name {
    // max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.layout-navbar-tagsView {
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--next-border-color-light);
    position: relative;
    // z-index: 4;

    ::v-deep(.el-scrollbar__wrap) {
        overflow-x: auto !important;
    }

    &-ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 34px;
        display: flex;
        align-items: center;
        color: var(--el-text-color-regular);
        font-size: 12px;
        white-space: nowrap;
        padding: 0 15px;

        &-li {
            height: 26px;
            line-height: 26px;
            display: flex;
            align-items: center;
            border: 1px solid var(--el-border-color-lighter);
            padding: 0 15px;
            margin-right: 5px;
            border-radius: 2px;
            position: relative;
            z-index: 0;
            cursor: pointer;
            justify-content: space-between;

            &:hover {
                background-color: var(--el-color-primary-light-9);
                color: var(--el-color-primary);
                border-color: var(--el-color-primary-light-5);
            }

            &-iconfont {
                position: relative;
                left: -5px;
                font-size: 12px;
            }

            &-icon {
                border-radius: 100%;
                position: relative;
                height: 14px;
                width: 14px;
                text-align: center;
                line-height: 14px;
                right: -5px;

                &:hover {
                    color: var(--el-color-white);
                    background-color: var(--el-color-primary-light-3);
                }
            }

            .layout-icon-active {
                display: block;
            }

            .layout-icon-three {
                display: none;
            }
        }

        .is-active {
            color: var(--el-color-white);
            background: var(--el-color-primary);
            border-color: var(--el-color-primary);
            transition: border-color 3s ease;
        }
    }

    // 风格4
    .tags-style-four {
        .layout-navbar-tagsView-ul-li {
            margin-right: 0 !important;
            border: none !important;
            position: relative;
            border-radius: 3px !important;

            .layout-icon-active {
                display: none;
            }

            .layout-icon-three {
                display: block;
            }

            &:hover {
                background: none !important;
            }
        }

        .is-active {
            background: none !important;
            color: var(--el-color-primary) !important;
        }
    }

    // 风格5
    .tags-style-five {
        align-items: flex-end;

        .tags-style-five-svg {
            --mask-image-bg: url("data:image/svg+xml,<svg width='68' height='34' viewBox='0 0 68 34' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m27,0c-7.99582,0 -11.95105,0.00205 -12,12l0,6c0,8.284 -0.48549,16.49691 -8.76949,16.49691l54.37857,-0.11145c-8.284,0 -8.60908,-8.10146 -8.60908,-16.38546l0,-6c0.11145,-12.08445 -4.38441,-12 -12,-12l-13,0z' fill='%23409eff'/></svg>") 12 27 15;
            -webkit-mask-box-image: var(--mask-image-bg);
            mask-image: var(--mask-image-bg);
        }

        .layout-navbar-tagsView-ul-li {
            padding: 0 5px;
            border-width: 15px 27px 15px;
            border-style: solid;
            border-color: transparent;
            margin: 0 -15px;

            .layout-icon-active,
            .layout-navbar-tagsView-ul-li-iconfont,
            .layout-navbar-tagsView-ul-li-refresh {
                display: none;
            }

            .layout-icon-three {
                display: block;
            }

            &:hover {
                @extend .tags-style-five-svg;
                background: var(--el-color-primary-light-9);
                color: unset;
            }
        }

        .is-active {
            @extend .tags-style-five-svg;
            background: var(--el-color-primary-light-9) !important;
            color: var(--el-color-primary) !important;
            z-index: 1;
            font-weight: bold;
        }
    }
}

.layout-navbar-tagsView-shadow {
    box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>
