import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import InitManager from './app/core/init'
import catchError from'./app/middleware/exception'

const port = 3000
const app = new Koa() 

app
    .use(helmet())
    .use(bodyParser())

InitManager.initCore(app)
app.listen(port, ()=> {
    console.log(`app is running on ${port}`)
})