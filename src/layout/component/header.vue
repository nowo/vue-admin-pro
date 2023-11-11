<template>
    <el-header :height="headerHeight" class="layout-header">
        <div class="header-top flex justify-center">
            <Breadcrumb />
            <User />
        </div>
        <TagView class="header-tag" />
    </el-header>
</template>

<script setup lang="ts">
// 引入组件
const Breadcrumb = defineAsyncComponent(() => import('@/layout/other/breadcrumb.vue'))
const User = defineAsyncComponent(() => import('@/layout/other/user.vue'))
const TagView = defineAsyncComponent(() => import('@/layout/TagView/index.vue'))

const headerHeight = ref('84px')
</script>

<style lang="scss" scoped>
.layout-header{
    --el-header-padding:0;
}
.header-top {
    border-bottom: 1px solid var(--el-border-color-lighter);
    height: 50px;
}
</style>
