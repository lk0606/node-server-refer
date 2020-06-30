

const Sequelize = require('sequelize')
const { db: {
    dbName,
    host,
    port,
    user,
    password,
}} = require('../../config/index')

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // mysql2
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        paranoid: true
    },
})

sequelize.sync({
    alter: true
})

module.exports = sequelize