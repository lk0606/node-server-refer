import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import compose from 'koa-compose'
import helmet from 'koa-helmet'
import { formatBody } from'./middleware/formatBody'
import { koajwt } from './middleware/jwt'
import routers from './routers'

const routes = Object.values(routers).map(item=> item.routes())
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
    formatBody,
    ...routes,
])

app.use(middleware)
app.listen(port, host, () => {
    console.log(`app is running on http://${host}:${port}`)
})