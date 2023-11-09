/**
 * 前端控制路由
 */
import type { RouteRecordRaw } from 'vue-router'
import { dynamicRoutes, notFoundAndNoPower } from './route'
import { formatFlatteningRoutes, router } from '@/router/index'
import { NextLoading } from '@/utils/loading'
import { Session } from '@/utils/storage'

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute(list: RouteRecordRaw[]) {
    await list.forEach((route) => {
        router.addRoute(route)
    })
}

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method useUserInfo(pinia).setUserInfos() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initFrontEndControlRoutes() {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()

    // // 无 token 停止执行下一步
    if (!Session.get('token')) return false

    // 触发初始化(`用户信息和菜单数据`)
    const stores = useUserInfo()
    await stores.getUserInfo()

    if (stores.userInfo?.roles.length && stores.userInfo?.roles.length > 0) {
        // 添加动态路由
        await setAddRoute(stores.menuList)
        // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
        // setFilterMenuAndCacheTagsViewRoutes()
        return true
    } else {
        return false
        // return Promise.resolve(true)
    }

    // // 无登录权限时，添加判断
    // // https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO
    // if (stores.userInfo?.roles.length <= 0) return Promise.resolve(true)
    // // 添加动态路由
    // await setAddRoute()
    // // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    // setFilterMenuAndCacheTagsViewRoutes()
}
