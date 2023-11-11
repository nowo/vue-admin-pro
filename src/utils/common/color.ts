/**
 * hex 颜色转 rgb 颜色
 * @param str  str 颜色值字符串
 * @returns {''|number[]} 空字符串或rgb三个值的数组
 * @example
 * ```js
 * hexToRgb('#000000')  // [0,0,0]
 * ```
 */
export const hexToRgb = (str: string): '' | number[] => {
    let hex: any = ''
    const reg = /^\#?[0-9A-Fa-f]{6}$/
    if (!reg.test(str)) {
        console.error('输入错误的hex')
        return ''
    }
    str = str.replace('#', '')
    hex = str.match(/../g)
    for (let i = 0; i < 3; i++) hex[i] = Number.parseInt(hex[i], 16)
    return hex
}

/**
 * rgb 颜色转 Hex 颜色
 * @param r 红色（范围0~255）
 * @param g 绿色（范围0~255）
 * @param b 蓝色（范围0~255）
 * @returns {string} hex颜色值
 * ```js
 * rgbToHex(0, 0, 0) // #000000
 * ```
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
    const reg = /^\d{1,3}$/
    if (!reg.test(r.toString()) || !reg.test(g.toString()) || !reg.test(b.toString())) {
        console.error('输入错误的rgb颜色值')
        return ''
    }
    const hex = [r.toString(16), g.toString(16), b.toString(16)]
    for (let i = 0; i < 3; i++) if (hex[i].length === 1) hex[i] = `0${hex[i]}`
    return `#${hex.join('')}`
}

/**
 * 颜色值加深
 * @param color hex颜色值
 * @param level 加深颜色的程度，范围在0-1之间
 * @returns {string} hex颜色值
 * @example
 * ```js
 * getDarkColor('#ffffff',0.5) // #7f7f7f
 * ```
 */
export const getDarkColor = (color: string, level: number): string => {
    const reg = /^\#?[0-9A-Fa-f]{6}$/
    if (!reg.test(color)) {
        console.error('输入错误的hex颜色值')
        return ''
    }
    const rgb = hexToRgb(color)
    if (!rgb) return ''
    for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level))
    return rgbToHex(rgb[0], rgb[1], rgb[2])
}

/**
 * 颜色值变浅
 * @param color hex颜色值
 * @param level 变浅颜色的程度，范围在0-1之间
 * @returns {string} hex颜色值
 * @example
 * ```js
 * getLightColor('#000000',0.6) // #999999
 * ```
 */
export const getLightColor = (color: string, level: number): string => {
    const reg = /^\#?[0-9A-Fa-f]{6}$/
    if (!reg.test(color)) {
        console.error('输入错误的hex颜色值')
        return ''
    }
    const rgb = hexToRgb(color)
    if (!rgb) return ''
    for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
    return rgbToHex(rgb[0], rgb[1], rgb[2])
}
