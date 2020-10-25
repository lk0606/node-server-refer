import CommonService from '../services/common'
import sendEmail from '../config/nodemailer'
import { setValue, getValue } from '../lib/redis'
import { get } from '@wont/utils'


class CommonController {
    static async getCaptcha(ctx, next) {
        const captcha = CommonService.getCaptcha()
        ctx.body = {
            success: true,
            data: {
                ...captcha,
            }
        }
        await next()
    }
    static async sendEmail(ctx, next) {
        const body = get(ctx, 'request.body', {})
        const { username = '', email = '' } = body

        try {
            const code = await getValue(email)
            if(code) {
                ctx.body = {
                    success: false,
                    message: `验证码已发送至${email}，请勿重复操作`,
                }
                return
            }

            const limit = 24 * 60 * 60 * 1000
            const expire = +new Date() + limit
            const params = {
                username,
                email,
                expire,
                expireText: '1天',
                captcha: '0000',
            }
            const data = await sendEmail(params) || {}
            if (data) {
                const { accepted = [] } = data
                ctx.body = {
                    success: true,
                    message: `已发生至${accepted.join(',')}，注意查收`,
                    data: {
                        ...data,
                        captcha: params.captcha,
                    },
                }
                setValue(params.email, params.captcha, 24 * 60 * 60)
            } else {
                ctx.body = {
                    success: false,
                    message: '数据异常',
                }
            }
        } catch (error) {
            ctx.body = {
                success: false,
                message: error.message,
            }
        }
        await next()
    }
}

export default CommonController
