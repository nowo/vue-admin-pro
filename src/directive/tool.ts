/**
 * 判断两数组字符串是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @param newArr 新数据
 * @param oldArr 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export function judgmentSameArr<T = string>(newArr: T[], oldArr: T[]): boolean {
    // 去重处理
    const news = [...new Set(newArr)]
    const olds = [...new Set(oldArr)]

    // 计算两个数组中相同元素的个数
    const count = news.reduce((acc, val) => {
        return acc + (olds.includes(val) ? 1 : 0)
    }, 0)

    return count === news.length
}

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auth(value: string): boolean {
    const stores = useUserInfo()
    return !!stores.userInfo?.authBtnList.includes(value)
}

/**
 * 多个权限验证，满足一个则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function auths(value: Array<string>): boolean {
    const stores = useUserInfo()

    const flag = stores.userInfo?.authBtnList.find(item => value.includes(item))
    return !!flag
}

/**
 * 多个权限验证，全部满足则为 true
 * @param value 权限值
 * @returns 有权限，返回 `true`，反之则反
 */
export function authAll(value: Array<string>): boolean {
    const stores = useUserInfo()
    return judgmentSameArr(value, stores.userInfo?.authBtnList || [])
}
