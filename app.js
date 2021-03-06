import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import compose from 'koa-compose'
import helmet from 'koa-helmet'
import InitManager from './app/core/init'
import catchError from'./app/middleware/exception'

const port = 3000
const app = new Koa() 

const middleware = compose([
    bodyParser(),
    cors(),
    helmet(),
])

app.use(middleware)

InitManager.initCore(app)
app.listen(port, ()=> {
    console.log(`app is running on ${port}`)
})