<template>
    <el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
        <el-button @click="onRemove">
            clear
        </el-button>
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { Session } from '@/utils/storage'

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
