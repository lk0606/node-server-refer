import KoaRouter from 'koa-router'
import requireDirectory from 'require-directory'

class InitManger {
    static initCore(app) {
        InitManger.app = app
        InitManger.initRouters()
    }
    static initRouters() {
        const rootDir = `${process.cwd()}/app/api`
        const routes = requireDirectory(module, rootDir, {
            visit: isKoaRouter
        })
        console.log('routes :>> ', routes);
        function isKoaRouter(obj) {
            if(obj instanceof KoaRouter) {
                InitManger.app.use(obj.routes())
            }
        }
    }
}


export default InitManger