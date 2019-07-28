const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
}, {timestamps:true})

//set has for pasword
UserSchema.pre('save', async (next)=> {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//compare passwords
UserSchema.methods.isValidPassword = async (password)=> {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
}

UserSchema.methods.generateJWT = () => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret)
}

UserSchema.methods.toJSON = ()=> {
    return {
        id: this._id,
        username: this.username,
        image: this.image
    }
}