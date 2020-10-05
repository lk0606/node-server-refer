const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const InitManager = require('./app/core/init')
const catchError = require('./app/middleware/exception')

const port = 3000
const app = new Koa() 

app
    .use(helmet())
    .use(bodyParser())

InitManager.initCore(app)
app.listen(port, ()=> {
    console.log(`app is running on ${port}`)
})