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
import { Session } from '@/utils/storage'

const Settings = defineAsyncComponent(() => import('@/layout/other/settings.vue'))

const themeState = useThemeConfig()

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    return 'default'
    return themeState.themeConfig.globalComponentSize
})

const onRemove = () => {
    Session.clear()
    location.reload()
}
</script>
