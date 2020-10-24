import CommonService from '../services/common'
import sendEmail from '../config/nodemailer'


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
        const { body: {
            username='admin',
            expire='2020/12/31',
            url='wont-org.github.io/utils/',
        }={} } = ctx
        await sendEmail({
            username,
            expire,
            url,
        })
        ctx.body = {
            success: true,
            message: '',
        }
        await next()
    }
}

export default CommonController
