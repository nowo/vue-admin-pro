/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual<T extends Record<string, any>>(a: T, b: T): boolean {
    if (!a || !b) return false
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)
    if (aProps.length !== bProps.length) return false
    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i]
        const propA = a[propName]
        const propB = b[propName]

        // if (!b.hasOwnProperty(propName)) return false
        if (!Object.prototype.hasOwnProperty.call(b, propName)) return false
        if (propA instanceof Object) {
            if (!isObjectValueEqual(propA, propB)) return false
        } else if (propA !== propB) {
            return false
        }
    }
    return true
}

/**
 * 数组、数组对象去重
 * @param arr 数组内容
 * @param attr 需要去重的键值（数组对象）
 * @returns array
 */
export function removeDuplicate<T>(arr: T[], attr?: string) {
    if (!Object.keys(arr).length) {
        return arr
    } else {
        if (attr) {
            const obj: any = {}
            // return arr.reduce((cur: EmptyArrayType[], item: EmptyArrayType) => {
            //     obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item))
            //     return cur
            // }, [])

            const newArr = arr.reduce((cur: T[], item: any) => {
                const key = item[attr]
                if (!obj[key]) {
                    obj[key] = true
                    cur.push(item)
                }
                return cur
            }, [])
            return newArr
        } else {
            return [...new Set(arr)]
        }
    }
}
