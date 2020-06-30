

const KoaRouter = require('koa-router')
const requireDirectory = require('require-directory')

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
        function isKoaRouter(obj) {
            if(obj instanceof KoaRouter) {
                InitManger.app.use(obj.routes())
            }
        }
    }
}


module.exports = InitManger