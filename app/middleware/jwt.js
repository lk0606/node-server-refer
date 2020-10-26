import koaJwt from 'koa-jwt'

export const koajwt = koaJwt({
    secret: 'secret'
})
    .unless({
        path: [
            /^\/user/,
            /^\/common/,
        ]
    })
