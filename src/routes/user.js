const express = require('express')
const userController = require('../controller/user')
// const { Joi, celebrate } = require('celebrate')
const router = express.Router()

router.get('/me', userController.me)

module.exports = router
