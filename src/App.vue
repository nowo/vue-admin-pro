<template>
    <el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
        <el-button class="fixed bottom-0 right-0 z-10" @click="onRemove">
            clear
        </el-button>
        <router-view />
        <Settings />
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { Local, Session } from '@/utils/storage'

const Settings = defineAsyncComponent(() => import('@/layout/other/settings.vue'))

const themeState = useThemeConfig()

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    const clientWidth = document.body.clientWidth
    return clientWidth < 1000 ? 'small' : themeState.themeConfig.globalComponentSize
})

const onRemove = () => {
    Session.clear()
    location.reload()
}

// 页面加载时
onMounted(() => {
    nextTick(() => {
        // 获取缓存中的布局配置
        const localTheme = Local.get<IThemeConfigState>('themeConfig')

        if (localTheme) {
            themeState.setThemeConfig(localTheme)
            document.documentElement.style.cssText = Local.get('themeConfigStyle') || ''
        }
        // // 获取缓存中的全屏配置
        // const sessionFull = Session.get<boolean>('isTagsViewCurrentFull')
        // if (sessionFull) {
        //     stores.setCurrentFullscreen(sessionFull)
        // }
    })
})
</script>
