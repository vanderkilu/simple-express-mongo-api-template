const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

const UserSchema = new Schema({
    handle: {
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
UserSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//compare passwords
UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password)
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret)
}

UserSchema.methods.toAuthJSON = function() {
    return {
        id: this._id,
        username: this.handle,
        image: this.image,
        token: this.generateJWT()
    }
}

module.exports = mongoose.model('User', UserSchema)