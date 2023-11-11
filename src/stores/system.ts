import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { filterRoutesFunc } from '@/router'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/route'
import { backEndComponent } from '@/router/backEnd'
import { Session } from '@/utils/storage'
import { ApiMenu } from '@/api/system/menu'
import { ApiUser } from '@/api/system/user'
import { deepClone } from '@/utils/other'
import { findNodeItem } from '@/utils/common/tree'

interface ISystemUserInfo {
    name: string
}

/**
 * 用户信息
 * @methods getUserInfo 设置用户信息
 */
export const useUserStore = defineStore('userInfo', () => {
    const onOff = ref(Session.get('adm') !== 'adm')

    // 用户信息
    const userInfo = ref<IUserInfo<ISystemUserInfo>>()

    // 权限菜单
    const menuList = ref<RouteRecordCustom[]>([])

    // 存储接口原始路由（未处理的component）
    const oldMenuList = ref<any[]>([])

    // 过滤后的路由
    const routesList = computed(() => {
        return filterRoutesFunc(menuList.value)
    })

    /**
     * 获取用户的权限菜单
     */
    const getAuthMenuList = async () => {
        let solveList: RouteRecordCustom[] = []
        const themeConfigState = useThemeConfig()
        if (themeConfigState.isRequestRoute) { // 后端返回路由
            const res = await ApiMenu.getAuthList()
            console.log('res :>> ', res)
            // const menu = formatBackRoutes(res.data.menu)
            // console.log(menu)
            const list = [
                // {
                //     path: '/',
                //     name: '/',
                //     // component: () => import('@/layout/index.vue'),
                //     component: () => import('@/layout/index.vue'),
                //     redirect: '/home',
                //     meta: {
                //         isKeepAlive: true,
                //     },
                //     children: [
                //         {
                //             path: '/home',
                //             name: 'home',
                //             component: () => import('@/pages/index.vue'),
                //             meta: {
                //                 title: '首页',
                //                 isLink: '',
                //                 isHide: false,
                //                 isKeepAlive: true,
                //                 isAffix: true,
                //                 isIframe: false,
                //                 roles: ['admin', 'common'],
                //                 icon: 'iconfont icon-shouye',
                //             },
                //         },
                //     ],
                // },
                // {
                //     path: '/',
                //     name: '/',
                //     // component: () => import('@/layout/index.vue'),
                //     component: 'layout/route/parent',
                //     redirect: '/home',
                //     meta: {
                //         isKeepAlive: true,
                //     },
                //     children: [
                //         {
                //             path: '/home',
                //             name: 'home',
                //             // component: () => import('@/pages/index.vue'),
                //             component: 'index',
                //             meta: {
                //                 title: '首页',
                //                 isLink: '',
                //                 isHide: false,
                //                 isKeepAlive: true,
                //                 isAffix: true,
                //                 isIframe: false,
                //                 roles: ['admin', 'common'],
                //                 icon: 'iconfont icon-shouye',
                //             },
                //         },
                //     ],
                // },
                {
                    path: '/system',
                    name: 'system',
                    // component: () => import('@/layout/route/parent.vue'),
                    component: 'layout/route/parent',

                    redirect: '/system/menu',
                    meta: {
                        title: '系统设置',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        isAffix: false,
                        isIframe: false,
                        roles: ['admin'],
                        icon: 'iconfont icon-xitongshezhi',
                    },
                    children: [
                        {
                            path: '/system/menu',
                            name: 'SystemMenu',
                            // component: () => import('@/views/system/menu/index.vue'),
                            component: 'system/menu/SystemMenu',

                            meta: {
                                title: '菜单管理',
                                isLink: '',
                                isHide: false,
                                isKeepAlive: true,
                                isAffix: false,
                                isIframe: false,
                                roles: ['admin'],
                                icon: 'iconfont icon-caidan',
                            },
                        },
                        {
                            path: '/system/role',
                            name: 'SystemRole',
                            component: 'system/role/SystemRole',
                            meta: {
                                title: '角色管理',
                                isLink: false,
                                isHide: false,
                                isKeepAlive: true,
                                isAffix: false,
                                isIframe: false,
                                roles: ['admin'],
                                icon: 'ele-ColdDrink',
                            },
                        },
                    ],
                },
            ]
            oldMenuList.value = deepClone(list)
            // component转换
            const child = await backEndComponent<RouteRecordRaw>(list)

            dynamicRoutes[0].children = child

            // dynamicRoutes的首页路由重定向到`/home`,判断后端返回的路由是否有/home，没有就用子类的第一个进行跳转
            const node = findNodeItem(child, dynamicRoutes[0].redirect, 'path', 'children')
            if (!node) dynamicRoutes[0].redirect = dynamicRoutes[0].children?.[0].path

            solveList = dynamicRoutes
        } else { // 前端路由
            solveList = dynamicRoutes
        }

        // notFoundAndNoPower 将 404、401 页面设置在 layout 布局中，不设置的话，404、401 界面将全屏显示
        solveList[0].children?.push(...notFoundAndNoPower)
        menuList.value = solveList
    }

    const updateUserInfo = (data: ISystemUserInfo) => {
        // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        const adminRoles: Array<string> = ['admin']
        // admin 按钮权限标识
        const adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link']
        // // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        // let testRoles: Array<string> = ['common'];
        // // test 按钮权限标识
        // let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];

        // 用户信息
        const userData = {
            ...data,
            username: data.name,
            photo: '',
            time: new Date().getTime(),
            roles: adminRoles,
            authBtnList: adminAuthBtnList,
        }

        userInfo.value = userData // 重新设置userData
        // Session.set("userData", userInfo)
    }

    /**
     * 获取用户信息和菜单
     * @returns userInfo
     */
    const getUserInfo = async () => {
        const [res] = await Promise.all([
            ApiUser.getInfo(),
            getAuthMenuList(),
        ])

        updateUserInfo(res)

        // if (res.code === 200) {
        //     const user = res.data.admin_info
        //     updateUserInfo(user)
        // } else if (res.code === 403) { // 账号失效
        //     Session.clear()
        // } else {
        //     throw new Error('返回用户信息有误！')
        // }

        // const res = await ApiUser.getInfo()

        // const themeConfigState = useThemeConfig()
        // if (res) {
        //     // 从后端获取路由
        //     if (themeConfigState.isRequestRoute) {
        //         getAuthMenuList()
        //     }
        // }

        // 存储用户信息到浏览器缓存
        // const user = Session.get<IUserInfo>('userInfo')
        // if (user) {
        //     userInfo.value = user
        // } else {
        //     // 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
        //     const userName = 'admin'
        //     // 模拟数据
        //     let defaultRoles: Array<string> = []
        //     let defaultAuthBtnList: Array<string> = []
        //     // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        //     const adminRoles: Array<string> = ['admin']
        //     // admin 按钮权限标识
        //     const adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link']
        //     // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
        //     const testRoles: Array<string> = ['common']
        //     // test 按钮权限标识
        //     const testAuthBtnList: Array<string> = ['btn.add', 'btn.link']
        //     // 不同用户模拟不同的用户权限
        //     if (userName === 'admin') {
        //         defaultRoles = adminRoles
        //         defaultAuthBtnList = adminAuthBtnList
        //     } else {
        //         defaultRoles = testRoles
        //         defaultAuthBtnList = testAuthBtnList
        //     }
        //     // 用户信息模拟数据
        //     const userInfos: IUserInfo = {
        //         username: userName,
        //         photo:
        //             userName === 'admin'
        //                 ? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
        //                 : 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        //         time: new Date().getTime(),
        //         roles: defaultRoles,
        //         authBtnList: defaultAuthBtnList,
        //     }
        //     userInfo.value = userInfos
        //     Session.set('userInfo', userInfos)
        // }
    }

    return {
        onOff,
        userInfo,
        menuList,
        oldMenuList,
        routesList,
        getUserInfo,
        getAuthMenuList,
    }
})
