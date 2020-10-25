

export const errorHander = async (ctx, next)=> {
    let tpl = {
        success: true,
        data: null,
        code: 200,
        message: '',
        requestUrl: ctx.request.url,
        requestTime: +new Date(),
    }

    try {
        await next()
    } catch (error) {
        console.log('errorHander :>> ', error);
        const { message = '服务器异常' } = error
        tpl = {
            ...tpl,
            message,
            success: false,
        }
        ctx.body = tpl
    }
}
