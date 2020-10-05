import Router from 'koa-router'
const router = new Router()

router.get('/v2/book/latest', async (ctx, next) => {
    ctx.body = {
        key: 'book2'
    }
})

module.exports = router