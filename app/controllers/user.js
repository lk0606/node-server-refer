import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import UserService from '../services/user'
const {
    register,
} = UserService

class UserController {
    static async register(ctx, next) {
        const { body = {} } = ctx.request || {}
        let { username = '', password= '' } = body
        if(!username || !password) {
            ctx.status = 400
            ctx.body = {
                success: false,
                errorMsg: `expected an object with username, password, email but got: ${JSON.stringify(body)}`
            }
            return
        }
        
        try {
            const user = await register(body)
            console.log('ctx :>> ', ctx);
            ctx.body = {
                code: ctx.status,
                data: {
                    ...user
                }
            }
        } catch (error) {
            
        }
        
        await next()
    }
}

export default UserController