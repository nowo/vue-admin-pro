<template>
    <el-container direction="vertical" class="layout-container h-100%">
        <LayoutHeader />
        <!-- 头部 -->
        <el-container>
            <LayoutAside />
            <!-- 菜单 -->
            <div class="layout-backtop">
                <!-- <LayoutTagsView v-if="themeConfig.isTagsView" /> -->

                标签、
                内容
                <LayoutMain />
            </div>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))
const LayoutAside = defineAsyncComponent(() => import('@/layout/component/aside.vue'))
const LayoutHeader = defineAsyncComponent(() => import('@/layout/component/header.vue'))
</script>
