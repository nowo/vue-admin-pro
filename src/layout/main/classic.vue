<template>
    <el-container class="layout-container flex-center">
        <!-- <LayoutHeader /> -->
        头部
        <el-container class="layout-main-height-50">
            <!-- <LayoutAside /> -->
            菜单
            <div class="flex-center layout-backtop">
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
</script>
