import { Model, DataTypes, UUIDV4 } from 'sequelize'
import sequelize from '../lib/sequelize'

class User extends Model {}

User.init({
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'user',
})

export default User
