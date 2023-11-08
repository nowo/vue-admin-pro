<template>
    <div>
        图标选择器
        <div v-for="(item, index) in list" :key="index" :class="item" />
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import ep from '@/assets/icon/ep.json'
import ic from '@/assets/icon/ic.json'

console.log(ep)

const list = ref<string[]>(ep.icons.map(item => `i-ep-${item}`))

const initIcons = async () => {
    const ep = await import('@iconify-json/ep/icons.json')
    console.log('ep :>> ', ep)
    const arr = Object.keys(ep.default.icons).map(item => `i-ep-${item}`)
    // list.value = arr
    const i = await import('@iconify-json/ic/icons.json')
    console.log('i :>> ', i)
}

onBeforeMount(() => {
    initIcons()
})
</script>

<style lang="scss" scoped>
</style>
