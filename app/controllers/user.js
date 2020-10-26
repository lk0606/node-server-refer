import jsonwebtoken from 'jsonwebtoken'
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
            console.log('register user :>> ', user);
            if(user) {
                ctx.body = {
                    success: true,
                    message: `注册成功`,
                    data: user
                }
            } else {
                ctx.body = {
                    success: false,
                    message: `数据异常`,
                }
            }

        } catch (error) {
            console.log('UserController register error :>> ', error);
            success = false
            message = get(error, 'message', '')
            ctx.body = {
                success,
                message,
            }
        }

        await next()
    }

    static genToken(data) {
        const token = jsonwebtoken.sign(
            {
                data,
                // exp: +new Date() + 24*60*60*1000,
            },
            'secret',
            {
                expiresIn: '1d', // 等同exp
            }
        )
        return token
    }

    static async getUserInfo(ctx, next) {
        const body = get(ctx, 'request.body', {})
        const { username = '', password, email } = body
        try {
            const { dataValues } = await getUserInfo(body) || {}
            if (dataValues) {
                const payload = {
                    username,
                    password,
                    email,
                }
                const token = UserController.genToken(payload)
                ctx.cookies.set('token', token, {
                    // domain: 'localhost',
                    httpOnly: false,
                })
                ctx.body = {
                    success: true,
                    message: `登陆成功：${username}，欢迎您`,
                    data: dataValues,
                }
            } else {
                ctx.body = {
                    success: false,
                    message: `登录失败：用户${username}不存在，或用户密码不匹配`,
                }
            }
        } catch (error) {
            console.log('getUserInfo error :>> ', error);
            const { message: errorMsg } = error
            ctx.body = {
                success: false,
                message: errorMsg,
            }
        }
        await next()
    }
}

export default UserController
