<template>
    <el-container class="layout-container">
        <!-- <LayoutAside /> -->
        菜单
        <el-container class="layout-container-view h100%!">
            <el-scrollbar class="layout-backtop">
                <!-- <LayoutHeader /> -->

                头部、
                内容
                <LayoutMain />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))
</script>
