const router = require('express').Router()
const UserCtrl = require('./user.controller')
const auth = require('../auth')


router.post('/login', UserCtrl.login)
router.post('/register', UserCtrl.register)

module.exports = router