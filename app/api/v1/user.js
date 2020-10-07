import Router from 'koa-router'
import UserController from '../../controllers/user'

const router = new Router({
    prefix: '/v1/user'
})
router.post('/reg', UserController.register)
router.post('/getUserInfo', UserController.getUserInfo)

module.exports = router
