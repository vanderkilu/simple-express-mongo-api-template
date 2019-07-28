const router = require('express').Router()
const UserCtrl = require('./user.controller')


router.post('users/login', UserCtrl.login)
router.post('users/', UserCtrl.register)

module.exports = router