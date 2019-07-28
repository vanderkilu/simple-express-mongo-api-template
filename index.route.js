const router = require('express').Router()
const userRoutes = require('./server/user/user.routes')

router.use('/users', userRoutes)

module.exports = router