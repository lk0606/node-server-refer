import mongoose from '../app/lib/mongoose'
const { Schema, Types } = mongoose
const { ObjectId } = Types

const UserSchema = new Schema({
    uuid: {
        type: ObjectId,
        required: false,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UserModel = mongoose.model('users', UserSchema)

// 增
const user = {
    uuid: ObjectId().toString(),
    username: 'wont',
    email: 'test1@qq.com',
    password: '123456'
}

const save = async () => {
    const data = new UserModel(user)
    const result = await data.save()
    console.log('save :>> ', result)
}
// save()
// 查
const find = async () => {
    const result = await UserModel.find()
    console.log('find :>> ', result)
}
// find()

// 改
const update = async () => {
    const result = await UserModel.updateOne(
        { email: 'test1@qq.com' },
        {
            username: 'wont-test'
        }
    )
    console.log('update :>> ', result)
}
// update()

// 删
const del = async () => {
    const result = await UserModel.deleteOne({ username: 'wont-test' })
    console.log('del :>> ', result)
}
// del()

