import Router from '@koa/router'
import CommonController from '../controllers/common'

const router = new Router({
    prefix: '/common'
})
router.get('/getCaptcha', CommonController.getCaptcha)
router.post('/sendEmail', CommonController.sendEmail)
router.post('/getCaptchaByEmail', CommonController.sendEmail)

export default router
