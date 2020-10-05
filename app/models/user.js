import { Model, DataTypes } from 'sequelize'
import sequelize from '../lib/sequelize'

class User extends Model {}

User.init({
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: DataTypes.STRING,
    // email: {
    //     type: DataTypes.STRING(128),
    //     unique: true,
    // },
    password: DataTypes.STRING,
    // createdTime: {
    //     type: DataTypes.DATE,
    //     field: "created_time"
    // },
    // updatedTime: {
    //     type: DataTypes.DATE,
    //     field: "updated_time"
    // },
    // deletedTime: {
    //     type: DataTypes.DATE,
    //     field: "deleted_time"
    // },
}, {
    sequelize,
    tableName: 'user',
})

module.exports = User