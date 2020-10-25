import { setValue } from '../lib/redis'
import svgCaptcha from 'svg-captcha'

class CommonService {
    static getCaptcha() {
        const captcha = svgCaptcha.create({
            color: true,
            ignoreChars: 'l1io0',
            noise: 0, // 线条
            // noise: Math.floor(Math.random() * 3), // 线条
            width: 85,
            height: 36,
            fontSize: 36,
        })
        const litmit = 24 * 60 * 60 * 60
        setValue('captcha', captcha.text, litmit)
        return captcha
    }
}

export default CommonService
