<template>
    <el-container class="layout-container h100%">
        <LayoutAside class="h100%" />
        <el-container direction="vertical" class="layout-container-view">
            <el-scrollbar class="layout-backtop">
                <LayoutHeader />

                <!-- 头部、 -->
                内容
                <LayoutMain />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'))
</script>
