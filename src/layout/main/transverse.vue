<template>
    <el-container class="layout-container flex-center layout-backtop">
        <!-- <LayoutHeader /> -->

        标签、
        内容
        <LayoutMain />
    </el-container>
</template>

<script setup lang="ts">
const LayoutMain = defineAsyncComponent(() => import('@/layout/component/main.vue'))
</script>
