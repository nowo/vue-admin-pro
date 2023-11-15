import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { Session } from '@/utils/storage'

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrentFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
export const useTagViewRoutes = defineStore('tagViewRoutes', () => {
    const isTagsViewCurrentFull = ref(false)

    const tagViewRoutes = ref<RouteRecordRaw[]>(Session.get('tagViewRoutes') || [])

    const setTagViewRoutes = (data: Array<RouteRecordRaw>) => {
        tagViewRoutes.value = data

        Session.set('tagViewRoutes', tagViewRoutes.value)
    }

    /**
     * 添加tagView路由
     * @param data route对象
     */
    const addTagViewRoutes = (data: RouteRecordRaw) => {
        const node = tagViewRoutes.value.find(item => item.path === data.path)
        if (!node) {
            tagViewRoutes.value.push(data)
            Session.set('tagViewRoutes', tagViewRoutes.value)
        }
    }

    const setCurrentFullscreen = (bool: boolean) => {
        Session.set('isTagsViewCurrentFull', bool)
        isTagsViewCurrentFull.value = bool
    }

    return {
        isTagsViewCurrentFull,
        tagViewRoutes,
        setTagViewRoutes,
        addTagViewRoutes,
        setCurrentFullscreen,
    }
})

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 TagsView）
 * @methods addCachedView 添加要缓存的路由 names（关闭 TagsView）
 * @methods delCachedView 删除要缓存的路由 names（关闭 TagsView）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 TagsView）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 TagsView）
 */
export const useKeepAliveNames = defineStore('keepAliveNames', () => {
    const keepAliveNames = ref<string[]>([])

    const cachedViews = ref<string[]>([])

    const setKeepAliveNames = async (data: string[]) => {
        keepAliveNames.value = data
    }

    const addCachedView = (view: RouteRecordRaw) => {
        if (view.meta?.isKeepAlive && view.name) cachedViews.value.push(view.name as string)
    }

    const delCachedView = (view: RouteRecordRaw) => {
        const index = cachedViews.value.indexOf(view?.name as string)
        if (index >= 0) cachedViews.value.splice(index, 1)
    }
    const delOthersCachedViews = (view: RouteRecordRaw) => {
        if (view.meta?.isKeepAlive) cachedViews.value = [view.name as string]
        else cachedViews.value = []
    }
    const delAllCachedViews = () => {
        cachedViews.value = []
    }

    return {
        keepAliveNames,
        cachedViews,
        setKeepAliveNames,
        addCachedView,
        delCachedView,
        delOthersCachedViews,
        delAllCachedViews,
    }
})
