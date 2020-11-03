import mongoose from 'mongoose'
import config from '../config/mongoose'
const {
    url,
} = config

// 创建连接
mongoose.connect(url, {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// 连接成功
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to ' + url);
})

// 连接异常
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
})

// 断开连接
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
})

export default mongoose
