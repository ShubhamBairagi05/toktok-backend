const express = require('express')
const userController = require('../controller/user')
const { Joi, celebrate } = require('celebrate')
const { uploadMedia } = require('../statics/s3service')
const auth = require('../utility/userAuth')
const router = express.Router()

router.post(
  '/register',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string(),
      password: Joi.string(),
      user_name: Joi.string(),
      full_name: Joi.string(),
      birth_date: Joi.date(),
      phone_no: Joi.number(),
    }),
  }),
  uploadMedia,
  userController.register
)

router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string(),
      password: Joi.string(),
    }),
  }),
  userController.login
)

router.get('/me', auth.loggedInUser, userController.me)
module.exports = router
