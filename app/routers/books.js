import Router from '@koa/router'

const router = new Router({
    prefix: '/book'
})

router.get('/latest', async (ctx, next) => {
    // await next()
    ctx.body = {
        key: 'book1',
        status: ctx.status
    }
    await next()
})

router.post('/:id/like', async (ctx, next) => {
    const params = ctx.params // :
    const query = ctx.request.query // ?
    const header = ctx.request.header
    const body = ctx.request.body // koa-bodyparser
    console.log(ctx.status, params, query, body,'path');
    ctx.body = {
        key: `book1, id=${params.id}`
    }
})

export default router
