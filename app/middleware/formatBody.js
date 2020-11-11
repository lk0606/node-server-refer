import { formatTime } from '@wont/utils'

export const formatBody = async (ctx, next)=> {
    let tpl = {
        success: true,
        data: null,
        // code: 200,
        message: '',
        requestUrl: ctx.href,
        requestTime: formatTime(Date.now(), 'yyyy-MM-dd h:m:s'),
    }

    return next()
        .then(()=> {
            ctx.body = {
                ...tpl,
                ...ctx.body,
            }
        })
        .catch(err => {
            if (err.status === 401) {
                tpl = {
                    ...tpl,
                    success: false,
                    message: '鉴权失败，请先登录',
                }
            } else {
                const { message = '服务器异常', stack } = err
                tpl = {
                    ...tpl,
                    message,
                    success: false,
                }
                ctx.body = tpl
                console.log('errorHander :>> ', stack);
            }
        }
    )
}
