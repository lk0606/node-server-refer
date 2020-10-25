import UserService from '../services/user'
import { get } from '@wont/utils'
import { getValue } from '../lib/redis'
const {
    register,
    getUserInfo,
} = UserService

class UserController {
    static async register(ctx, next) {
        const { body = {} } = ctx.request || {}
        let { username = '', password = '', email = '', captcha = '' } = body
        let success = false
        let message = ''
        if(!username || !password) {
            ctx.status = 400
            ctx.body = {
                success: false,
                errorMsg: `expected an object with username, password, email but got: ${JSON.stringify(body)}`
            }
            return
        }

        try {
            const authCode = await getValue(email)
            if(authCode !== captcha) {
                ctx.body = {
                    success: false,
                    message: `验证码错误`,
                }
                return
            }

            const user = await register(body)
            console.log('user :>> ', user);
            success = true
            ctx.body = {
                success,
                message: `注册成功`,
                data: user
            }
        } catch (error) {
            success = false
            message = get(error, 'message', '')
            ctx.body = {
                success,
                message,
            }
        }

        await next()
    }

    static async getUserInfo(ctx, next) {
        const body = get(ctx, 'request.body', {})
        const { username = '' } = body
        let success = false
        let message = ''
        try {
            const data = await getUserInfo(body)
            let success = true
            if (data) {
                message = `登陆成功：${username}，欢迎您`
            } else {
                success = false
                message = `登录失败：用户${username}不存在，或用户密码不匹配`
            }
            ctx.body = {
                success,
                message,
                data,
            }
        } catch (error) {
            console.log('getUserInfo error :>> ', error);
            const { message: errorMsg } = error
            ctx.body = {
                success,
                message: errorMsg,
            }
        }
        await next()
    }
}

export default UserController
