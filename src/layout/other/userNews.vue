<template>
    <div class="layout-navbars-breadcrumb-user-news">
        <div class="head-box">
            <div class="head-box-title">
                通知
            </div>
            <div v-if="newsList.length > 0" class="head-box-btn" @click="onAllReadClick">
                全部已读
            </div>
        </div>
        <div class="content-box">
            <template v-if="newsList.length > 0">
                <div v-for="(v, k) in newsList" :key="k" class="content-box-item">
                    <div>{{ v.label }}</div>
                    <div class="content-box-msg">
                        {{ v.value }}
                    </div>
                    <div class="content-box-time">
                        {{ v.time }}
                    </div>
                </div>
            </template>
            <el-empty v-else description="暂无通知" />
        </div>
        <div v-if="state.newsList.length > 0" class="foot-box" @click="goNoticeList">
            前往通知中心
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
    list: string[] // 通知列表
}>()

const emits = defineEmits<{
    (e: 'update', params?: boolean): void
}>()

// 定义变量内容
const state = reactive({
    newsList: [
        {
            label: '标题',
            value: 'content content',
            time: '2023-12-08',
        },
    ],
})

const newsList = computed(() => {
    return [
        {
            label: '标题',
            value: props.list.length ? 'content content' : 'null',
            time: '2023-12-08',
        },
    ]
})

// 全部已读点击
const onAllReadClick = () => {
    state.newsList = []
    emits('update', true)
}
// 前往通知中心点击
const goNoticeList = () => {

}
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user-news {
    .head-box {
        display: flex;
        border-bottom: 1px solid var(--el-border-color-lighter);
        box-sizing: border-box;
        color: var(--el-text-color-primary);
        justify-content: space-between;
        height: 35px;
        align-items: center;

        .head-box-btn {
            color: var(--el-color-primary);
            font-size: 13px;
            cursor: pointer;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }

    .content-box {
        font-size: 13px;

        .content-box-item {
            padding-top: 12px;

            &:last-of-type {
                padding-bottom: 12px;
            }

            .content-box-msg {
                color: var(--el-text-color-secondary);
                margin-top: 5px;
                margin-bottom: 5px;
            }

            .content-box-time {
                color: var(--el-text-color-secondary);
            }
        }
    }

    .foot-box {
        height: 35px;
        color: var(--el-color-primary);
        font-size: 13px;
        cursor: pointer;
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid var(--el-border-color-lighter);

        &:hover {
            opacity: 1;
        }
    }

    :deep(.el-empty__description p) {
        font-size: 13px;
    }
}
</style>
