import type { RouteRecordRaw } from 'vue-router'
import { router } from '@/router/index'

/**
 * 路由过滤递归函数，过滤隐藏路由
 * @param arr
 * @returns array
 */
export const filterRoutesFunc = (arr: RouteRecordRaw[]): RouteRecordRaw[] => {
    return arr.filter(item => !item.meta?.isHide).map((item) => {
        item = Object.assign({}, item)
        if (item.children) item.children = filterRoutesFunc(item.children)
        return item
    })
}

/**
 * 树形json数据数组转平级普通数组
 * @param classifyList 嵌套数组
 * @param id 关联的键值，默认id
 * @param key 上级所属的键值，默认pid
 * @param children 嵌套数组的子类，子类的键值，默认children
 * @returns any[]
 */
export function transformLevelArr<T = any>(classifyList: Array<T>, id = 'id' as keyof T, key = 'pid', children = 'children' as keyof T): T[] {
    const temp: any[] = []
    const forFn = function (arr: string | any[], val = 0) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (val) item[key] = val
            temp.push(item)

            if (item[children]) forFn(item[children], item[id])
        }
    }
    forFn(classifyList)
    return temp
}

/**
 * 路由过滤，并添加tagView标签里
 * @method setFilterMenuToTagViewRoutes(arr)
 * @param arr 动态添加的路由
 */
export async function setFilterMenuToTagViewRoutes(arr: RouteRecordRaw[]) {
    // 转平级数组
    const list = transformLevelArr(arr).filter(item => item.meta?.isAffix)

    const tagState = useTagViewRoutes()
    tagState.setTagViewRoutes(list)
}

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
