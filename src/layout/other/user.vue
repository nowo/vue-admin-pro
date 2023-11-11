<template>
    <div class="layout-user h100% flex items-center pr15px">
        <!-- :style="{ flex: layoutUserFlexNum }" -->
        <div class="layout-user-item" @click="onSearchClick">
            <i class="i-ep-search" />
        </div>
        <template v-if="onOff">
            <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" class="h100%"
                @command="onComponentSizeChange">
                <div class="layout-user-item">
                    <i class="i-ic:sharp-text-fields" title="组件大小" />
                    <!-- <i class="i-ic:sharp-text-format" title="组件大小" /> -->
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="large" :disabled="themeConfig.globalComponentSize === 'large'">
                            大型
                        </el-dropdown-item>
                        <el-dropdown-item command="default" :disabled="themeConfig.globalComponentSize === 'default'">
                            默认
                        </el-dropdown-item>
                        <el-dropdown-item command="small" :disabled="themeConfig.globalComponentSize === 'small'">
                            小型
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <div class="layout-user-item" @click="onLayoutSettingClick">
                <i class="i-ep-operation" title="布局配置" />
            </div>
        </template>

        <el-popover placement="bottom" :width="300" trigger="click">
            <template #reference>
                <div class="layout-user-item">
                    <el-badge :is-dot="state.isDot">
                        <i class="i-ep-bell block" title="消息" />
                    </el-badge>
                </div>
            </template>
            <UserNews :list="[]" @update="setNewsState" />
        </el-popover>

        <div class="layout-user-item mr10px" @click="onScreenFullClick">
            <i :class="state.isScreenFull ? 'i-ep-copy-document' : 'i-ep-full-screen'"
                :title="state.isScreenFull ? '关全屏' : '开全屏'" />
        </div>
        <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
            <span class="flex items-center">
                <el-avatar v-if="userInfo?.photo" :src="userInfo.photo" :size="32" class="mr5px" />
                <el-avatar v-else :size="32" class="mr5px">
                    <i class="i-ep:user-filled text-20px" />
                </el-avatar>
                {{ userInfo?.username === '' ? 'common' : userInfo?.username }}
                <i class="i-ep:arrow-down ml5px" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="/home">
                        首页
                    </el-dropdown-item>
                    <el-dropdown-item divided command="password">
                        修改密码
                    </el-dropdown-item>
                    <el-dropdown-item command="/404">
                        404
                    </el-dropdown-item>
                    <el-dropdown-item command="/401">
                        401
                    </el-dropdown-item>
                    <el-dropdown-item divided command="logout">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <Search ref="searchRef" />
        <!-- <Password ref="passwordRef" /> -->
    </div>
</template>

<script setup lang="ts" name="layoutBreadcrumbUser">
import { computed, defineAsyncComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import { storeToRefs } from 'pinia'
import { Local, Session } from '@/utils/storage'

const Search = defineAsyncComponent(() => import('@/layout/other/search.vue'))
const UserNews = defineAsyncComponent(() => import('@/layout/other/userNews.vue'))

// 定义变量内容

const router = useRouter()
const stores = useUserStore()
const storesThemeConfig = useThemeConfig()
const { userInfo, onOff } = storeToRefs(stores)
const { themeConfig, isDrawer } = storeToRefs(storesThemeConfig)
const searchRef = ref<InstanceType<typeof Search>>()
const state = reactive({
    isScreenFull: false,
    isDot: true,
})

// 设置分割样式
const layoutUserFlexNum = computed(() => {
    let num: string | number = ''
    const { layout, isClassicSplitMenu } = themeConfig.value
    const layoutArr: string[] = ['default', 'columns']
    if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1'
    else num = ''
    return num
})

// 全屏点击时
const { isSupported, isFullscreen, toggle } = useFullscreen()
const onScreenFullClick = () => {
    if (!isSupported) return ElMessage.warning('暂不不支持全屏')
    toggle() // 全屏切换
    state.isScreenFull = !isFullscreen.value
}

// 布局配置 icon 点击时
const onLayoutSettingClick = () => {
    isDrawer.value = true
}
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
    if (path === 'logout') {
        ElMessageBox({
            closeOnClickModal: false,
            closeOnPressEscape: false,
            title: '提示',
            message: '此操作将退出登录, 是否继续?',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            buttonSize: 'default',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true
                    instance.confirmButtonText = '退出中'
                    setTimeout(() => {
                        done()
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                        }, 300)
                    }, 700)
                } else {
                    done()
                }
            },
        }).then(async () => {
            // 清除缓存/token等
            Session.clear()
            // 使用 reload 时，不需要调用 resetRoute() 重置路由
            window.location.reload()
        }).catch(() => { })
    } else if (path === 'password') {
        // 修改密码
        // passwordRef.value?.openDialog()
    } else {
        router.push(path)
    }
}
// 菜单搜索点击
const onSearchClick = () => {
    searchRef.value?.openSearch()
}
// 组件大小改变
const onComponentSizeChange = (size: ThemeConfigGlobalComponentSize) => {
    Local.remove('themeConfig')
    themeConfig.value.globalComponentSize = size
    Local.set('themeConfig', themeConfig.value)

    window.location.reload()
}

// 更新状态（已读）
const setNewsState = () => {
    state.isDot = false
}
</script>

<style scoped lang="scss">
.layout-user {
    height: 100%;

    .layout-user-item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        height: 100%;
        transform: all 0.3s ease;
        color: var(--el-text-color-regular);

        &:hover {
            background-color: var(--el-fill-color-light);
        }
    }
}
</style>
