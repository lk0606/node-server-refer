import Sequelize from 'sequelize'
import dbConfig from '../config/sequelize'

const { db: {
    dbName,
    host,
    port,
    user,
    password,
}} = dbConfig

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql', // mysql2
    host,
    port,
    logging: false, // console.log
    timezone: '+08:00',
    define: {
        paranoid: true,
        underscored: true, // 驼峰转_
        createdAt: 'created_time',
        updatedAt: 'updated_time',
        deletedAt: 'deleted_time',
    },
})

sequelize.sync({
    alter: true, // Alters tables to fit models
    force: true, // true, each Model will run DROP TABLE IF EXISTS, before create
})

export default sequelize
