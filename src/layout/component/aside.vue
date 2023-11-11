<template>
    <div class="h100%">
        <el-aside class="layout-aside">
            <Logo />
            <el-scrollbar class="flex-auto">
                <Vertical />
            </el-scrollbar>
        </el-aside>
    </div>
</template>

<script setup lang="ts" name="layoutAside">
// 引入组件
const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const Vertical = defineAsyncComponent(() => import('@/layout/navMenu/vertical.vue'))
</script>
