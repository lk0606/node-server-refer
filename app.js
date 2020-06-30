
// require("babel-core/register");
// require("babel-polyfill");

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const InitManager = require('./app/core/init')
const catchError = require('./app/middleware/exception')

const port = 3000
const app = new Koa() 

require('./app/models/user')

app.use(
    catchError,
    bodyParser(),
)

InitManager.initCore(app)
app.listen(port, ()=> {
    console.log(`app is running on ${port}`)
})