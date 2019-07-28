const router = require('express').Router()
const UserCtrl = require('./user.controller')


router.post('/login', UserCtrl.login)
router.post('/register', UserCtrl.register)

module.exports = router