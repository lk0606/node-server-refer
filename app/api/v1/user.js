const Router = require('koa-router')
// const UserController = require('../../controllers/user')
import UserController from '../../controllers/user'
const router = new Router()

router.post('/reg', UserController.register)
module.exports = router
