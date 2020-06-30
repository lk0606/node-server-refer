

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../lib/sequelize')

class User extends Model {}

User.init({
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nickName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(128),
        unique: true,
    },
    password: DataTypes.STRING
}, {
    sequelize,
    underscored: true, // 驼峰转_
    tableName: 'user',
    createdAt: 'create_time',
    updatedAt: 'updated_time',
    deletedAt: 'deleted_time',
})

module.exports = {
    User
}