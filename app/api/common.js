import Router from 'koa-router'
import CommonController from '../controllers/common'

const router = new Router({
    prefix: '/common'
})
router.get('/getCaptcha', CommonController.getCaptcha)
router.post('/sendEmail', CommonController.sendEmail)

module.exports = router
