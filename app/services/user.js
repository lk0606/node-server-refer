import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import { get } from '@wont/utils'

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

    static async getUserInfo(data) {
        const { username } = data
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })
            return user.dataValues
        } catch (error) {
        }
    }

    static async register(data) {
        const { username } = data
        const user = await UserService.getUserInfo(username)
        if(user) {
            const result = {
                success: false,
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
    getUserInfo: UserService.getUserInfo,
    register: UserService.register,
}
