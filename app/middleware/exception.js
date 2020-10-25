export const errorHander = async (ctx, next)=> {
    let tpl = {
        success: true,
        data: null,
        // code: 200,
        message: '',
        requestUrl: ctx.href,
        requestTime: +new Date(),
    }

    return next().catch(err => {
        if (err.status === 401) {

        } else {
            console.log('errorHander :>> ', err);
            const { message = '服务器异常' } = err
            tpl = {
                ...tpl,
                message,
                success: false,
            }
            ctx.body = tpl
        }
    })
}
