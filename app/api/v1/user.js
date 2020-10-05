import Router from 'koa-router'
import UserController from '../../controllers/user'

const router = new Router()
router.post('/reg', UserController.register)

module.exports = router
