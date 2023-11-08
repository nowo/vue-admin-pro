<template>
    <el-config-provider :size="getGlobalComponentSize" :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const themeState = useThemeConfig()

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
    return 'default'
    return themeState.themeConfig.globalComponentSize
})
</script>
