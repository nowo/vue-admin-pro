import { NextLoading } from '@/utils/loading'
import { Session } from '@/utils/storage'
import { setAddRoute, setFilterMenuToTagViewRoutes } from '@/router/tool'

/**
 * 前端控制路由 /////////////////////////////////////////////////
 */

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 * @method  NextLoading 界面 loading 动画开始执行
 * @method useUserStore(pinia).getUserInfo() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initFrontEndControlRoutes() {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()

    // // 无 token 停止执行下一步
    if (!Session.get('token')) return false

    // 触发初始化(`用户信息和菜单数据`)
    const stores = useUserStore()
    await stores.getUserInfo()

    if (stores.userInfo?.roles.length && stores.userInfo?.roles.length > 0) {
        // 添加动态路由
        await setAddRoute(stores.menuList)
        // 设置递归过滤有权限的路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
        setFilterMenuToTagViewRoutes(stores.menuList)
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

/**
 * 后端控制路由 /////////////////////////////////////////////////
 */

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const layoutModules = import.meta.glob('../layout/route/*.{vue,tsx}')
const viewsModules = import.meta.glob('../views/**/*.{vue,tsx}')
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layoutModules }, { ...viewsModules })

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace(/..\/views|../, '')
        return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
    })
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0]
        return dynamicViewsModules[matchKey]
    }
    if (matchKeys?.length > 1) {
        return false
    }
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent<T = any>(routes: any): T[] {
    if (!routes) return []
    return routes.map((item: any) => {
        if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string)
        item.children && backEndComponent(item.children)
        return item
    })
}

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method NextLoading 界面 loading 动画开始执行
 * @method useUserStore().getUserInfo() 触发初始化用户信息 pinia
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initBackEndControlRoutes() {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start()
    // 无 token 停止执行下一步
    if (!Session.get('token')) return false
    // 触发初始化用户信息 pinia
    // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
    const userState = useUserStore()
    await userState.getUserInfo()

    // // 获取路由菜单数据
    // const res = await getBackEndControlRoutes()

    // // 无登录权限时，添加判断
    // // https://gitee.com/lyt-top/vue-next-admin/issues/I64HVO
    // if (res.data.length <= 0) return Promise.resolve(true)
    // // 存储接口原始路由（未处理component），根据需求选择使用
    // useRequestOldRoutes().setRequestOldRoutes(JSON.parse(JSON.stringify(res.data)))

    // // 处理路由（component），替换 dynamicRoutes（@/router/route）第一个顶级 children 的路由
    // dynamicRoutes[0].children = await backEndComponent(res.data)

    // const menu = userState.oldMenuList
    // dynamicRoutes[0].children = await backEndComponent(menu)
    setAddRoute(userState.menuList)
    // router.addRoute(userState.menuList)

    // 添加动态路由
    // await setAddRoute()

    // 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    // setFilterMenuAndCacheTagsViewRoutes()
}
