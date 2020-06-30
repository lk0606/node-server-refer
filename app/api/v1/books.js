const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', async (ctx, next) => {
    ctx.body = {
        key: 'book1'
    }
})
router.post('/v1/book/:id/like', async (ctx, next) => {
    const params = ctx.params // :
    const query = ctx.request.query // ?
    const header = ctx.request.header
    const body = ctx.request.body // koa-bodyparser
    console.log(ctx.status, params, query, body,'path');
    ctx.body = {
        key: 'book2'
    }
    throw new Error('api error')
})

module.exports = router
