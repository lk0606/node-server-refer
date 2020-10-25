import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import { get } from '@wont/utils'
import { getValue } from '../lib/redis'

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
            const { dataValues = {} } = await User.create({
                ...data,
                uuid: uuid(),
            }) || {}
            return dataValues
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    static async getUserInfo(data) {
        const { username, password } = data
        try {
            const user = await User.findOne({
                where: {
                    username,
                    password,
                }
            })
            return user
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    static async register(data) {
        const { username } = data
        try {
            const user = await UserService.getUserInfo(data)
            if(user) {
                const result = {
                    success: false,
                    message: `注册失败：用户名${username}已存在`,
                }
                return Promise.reject(result)
            }
            const newUser = await UserService.create(data)
            return newUser
        } catch (error) {
            console.log('error :>> ', error);
        }

    }
}

export default {
    create: UserService.create,
    getUserInfo: UserService.getUserInfo,
    register: UserService.register,
}
