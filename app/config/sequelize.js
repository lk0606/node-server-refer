const dbConfig = {
    db: {
        dbName: 'demo',
        host: 'wont-org.cn',
        port: 3306,
        user: 'root',
        password: '5456'
    },
    security: {
        secret: 'demo',
        expiresIn: 60*60 // 一小时
    }
}

export default dbConfig
