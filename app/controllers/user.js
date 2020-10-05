
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

class UserController {
    static async register(ctx, next) {
        const { body = {} } = ctx.request || {}
        let { username = '', password= '' } = body
        if(!username || !password) {
            ctx.status = 400
            ctx.body = {
                success: false,
                errorMsg: `expected an object with username, password, email but got: ${body}`
            }
            return
        }
        let user = await User.findOne({
            where: {
                username
            }
        })
        console.log('user :>> ', user);
        let result = user
        if(!user) {
            try {
                password = await bcrypt.hash(password, 10)
                result = await User.create({
                    username,
                    password
                })
                console.log('user :>> ', password)
            } catch(e) {
                console.log('e :>> ', e);
            }
        } else {
            var isReg = await bcrypt.compare(password, user.password)
        }
        ctx.status = 200
        const { username: name, password: pwd } = result
        ctx.body = {
            name,
            pwd,
            isReg,
        }
        await next()
    }
}

export default UserController