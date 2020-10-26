import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
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
            const { dataValues = {} } = await User.create({
                ...data,
                uuid: uuid(),
            }) || {}
            return dataValues
        } catch (error) {
            console.log('UserService create error :>> ', error);
            throw error
        }
    }

    static async getUserInfo(data) {
        const { username, password } = data
        try {
            const user = await User.findOne({
                where: {
                    username,
                }
            })
            if(!user) {
                return
            }
            const { password: hash = '' } = user || {}
            const isPass = bcrypt.compareSync(password, hash)
            if (isPass) {
                return user
            } else {
                return {
                    success: false,
                    message: `登录失败：密码错误`,
                }
            }
        } catch (error) {
            console.log('service getUserInfo error :>> ', error);
        }
    }

    static async register(data={}) {
        const {
            username = '',
            password = '',
            email = '',
         } = data
        try {
            const user = await UserService.getUserInfo(data)
            if(user) {
                const result = {
                    success: false,
                    message: `注册失败：邮箱${email}已被注册`,
                }
                return Promise.reject(result)
            }
            const hash = bcrypt.hashSync(password, 10)
            const params = {
                username,
                password: hash,
                email,
            }
            const newUser = await UserService.create(params)
            return newUser
        } catch (error) {
            console.log('UserService register error :>> ', error);
            throw error
        }

    }
}

export default {
    create: UserService.create,
    getUserInfo: UserService.getUserInfo,
    register: UserService.register,
}
