import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import compose from 'koa-compose'
import helmet from 'koa-helmet'
import InitManager from './app/core/init'
import { errorHander } from'./app/middleware/errorHander'
import { koajwt } from './app/middleware/jwt'

const port = 13000
const host = '0.0.0.0'
const app = new Koa()

const middleware = compose([
    bodyParser(),
    cors({
        credentials: true,
    }),
    helmet(),
    koajwt,
    errorHander,
])

app.use(middleware)

InitManager.initCore(app)
app.listen(port, host, ()=> {
    console.log(`app is running on ${port}`)
})
