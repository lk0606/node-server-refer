
let tpl = {
    success: true,
    data: {},
    code: 200,
    message: '',
    requestUrl: '',
    requestTime: '',
}

const catchError = async (ctx, next)=> {
    try {
        await next()
    } catch (error) {
        const { message = '服务器异常' } = error
        tpl = {
            ...tpl,
            message,
        }
        ctx.body = tpl
    }
}

export default catchError
