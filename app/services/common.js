import svgCaptcha from 'svg-captcha'

class CommonService {
    static getCaptcha() {
        const captcha = svgCaptcha.create({
            color: true,
            noise: Math.floor(Math.random() * 3),
            width: 85,
            height: 36,
            fontSize: 36,
        })
        return captcha
    }
}

export default CommonService