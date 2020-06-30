
const tpl = {
    success: true,
    data: {},
    code: 200,
    errorMsg: '',
    request: '',
    requestTime: '',
}

const catchError = async (ctx, next)=> {
    try {
        await next()
    } catch (error) {
        ctx.body = '服务器异常'
        // error_code message request_url
    }
}
module.exports = catchError
