<template>
    <div>
        123456
        <i class="i-ep-open block text-1" />
        <i class="block" :class="icon" />
        <BaseIconSelect />
        <el-button @click="onRemove">
            clear
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { Session } from '@/utils/storage'

const onRemove = () => {
    Session.clear()
    location.reload()
}

onMounted(() => {
    console.log('all route', useRouter().getRoutes())
})

// import json from '@/assets/json/index.json'

const icon = ref('')

const setIconTest = async () => {
    setTimeout(() => {
        const txt = 'edit'
        icon.value = `i-ep-${txt}`
    }, 3000)
}
setIconTest()
</script>

<style lang="scss" scoped>
</style>
