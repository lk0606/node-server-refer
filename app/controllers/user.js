import UserService from '../services/user'
import { get } from '@wont/utils'
const {
    register,
    getUserInfo,
} = UserService

class UserController {
    static async register(ctx, next) {
        const { body = {} } = ctx.request || {}
        let { username = '', password= '' } = body
        let success = false
        if(!username || !password) {
            ctx.status = 400
            ctx.body = {
                success: false,
                errorMsg: `expected an object with username, password, email but got: ${JSON.stringify(body)}`
            }
            return
        }

        try {
            const user = await register(body)
            success = true
            ctx.body = {
                success,
                message: `注册成功`,
                data: user
            }
        } catch (error) {
            success = false
            ctx.body = {
                success,
                message: '系统异常',
            }
        }

        await next()
    }

    static async getUserInfo(ctx, next) {
        const body = get(ctx, 'request.body', {})
        const { username } = body
        let success = false
        try {
            const data = await getUserInfo(body)
            let success = true
            ctx.body = {
                success,
                message: `${username}，欢迎您`,
                data,
            }
        } catch (error) {
            ctx.body = {
                success,
                message: `未找到用户${username}`,
            }
        }
        await next()
    }
}

export default UserController
