import { get } from '@wont/utils'
import User from '../models/user'

class UserService {
    /**
     * @param {object} data 
     * @property {string} data.username
     * @property {string} data.password
     * @property {boolean} data.remember
     * @property {string} data.captcha
     */
    static async create(data) {
        try {
            const { dataValues = {} } = await User.create(data) || {}
            return dataValues
        } catch (error) {
        }
    }

    static async findUser(username) {
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })
            return user
        } catch (error) {
        }
    }

    static async register(data) {
        const { username } = data
        const user = await UserService.findUser(username)
        const hasUsername = get(user, 'dataValues.username')
        if(hasUsername) {
            const result = {
                success: false,
                username: hasUsername,
                message: `用户名${hasUsername}已存在`,
            }
            return result
        }
        
        const newUser = await UserService.create(data)
        return newUser
        
    }
}

export default {
    create: UserService.create,
    findUser: UserService.findUser,
    register: UserService.register,
}