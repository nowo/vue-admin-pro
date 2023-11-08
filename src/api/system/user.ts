/**
 * 管理员（用户）相关api接口
 */
export const ApiUser = {

    /**
     * 获取登录用户信息
     * @returns {Promise}   Promise resolved when
     */
    getInfo: () => Promise.resolve({ id: 1, name: 'admin' }),
}
