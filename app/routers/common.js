import Router from '@koa/router'
import CommonController from '../controllers/common'
import * as sliderCaptcha from '@slider-captcha/core'
import { client, getValue, getHValue, setValue } from '../lib/redis'

const router = new Router({
    prefix: '/common'
})
router.get('/create', async(ctx, next)=> {
    const {data, solution} = await sliderCaptcha.create()
    setValue('captcha111', solution, 5 * 1000)
    ctx.body = data;
    next()
})
router.post('/verify', async(ctx, next)=> {
    const captcha = await getValue('captcha111')
    const {result, token} = await sliderCaptcha.verify(captcha, ctx.request.body)
    if(result === 'success') {
        ctx.body = {result, token}
    }
    next()
})
router.get('/getCaptcha', CommonController.getCaptcha)
router.post('/sendEmail', CommonController.sendEmail)
router.post('/getCaptchaByEmail', CommonController.sendEmail)

export default router
