// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId
const User = require('../schema/user')
const { apiResponse } = require('../utility/apiResponse')
const {
  isValidEmail,
  isValidPassword,
  deleteFile,
  createJWTToken,
} = require('../utility/helperFunction')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const { pushNotification } = require('../utility/pushNotification')

exports.register = async (req, res) => {
  try {
    const { email, password, user_name, full_name, birth_date, phone_no } =
      req.body

    let newUser

    if (!isValidEmail(email)) {
      deleteFile(req.file.location)
      return apiResponse.unknown(res, 'Invalid email')
    }
    const user = await User.findOne({ email })
    if (user) {
      deleteFile(req.file.location)
      return apiResponse.unknown(res, 'Email already in use')
    }
    if (password.length < 8) {
      deleteFile(req.file.location)
      return apiResponse.unknown(res, 'Password too short')
    }
    if (!isValidPassword(password)) {
      deleteFile(req.file.location)
      return apiResponse.unknown(
        res,
        'password must have at least one letter, one number and one special character'
      )
    }
    const passwordHash = await bcrypt.hash(password, 12)
    console.log({ body: req.body })
    if (!email || !user_name || !full_name || !birth_date || !phone_no) {
      deleteFile(req.file.location)
      return apiResponse.unknown(res, 'all fields are required')
    }
    if (req.file.location) {
      newUser = await User.create({
        email: email,
        user_name: user_name,
        phone_no: phone_no,
        full_name: full_name,
        birth_date: birth_date,
        avtar: req.file.location,
        bio: req.body.bio,
        password: passwordHash,
      })
    } else {
      newUser = await User.create({
        email: email,
        user_name: user_name,
        phone_no: phone_no,
        full_name: full_name,
        birth_date: birth_date,
        password: passwordHash,
      })
    }
    console.log({ newUser })
    return apiResponse.success(res, 'user crated successfully')
  } catch (error) {
    console.log({ error })
    return apiResponse.fail(res)
  }
}

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email,
    })
    if (!user) {
      return apiResponse.unknown(res, 'User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return apiResponse.unknown(res, 'Invalid email or password')
    }
    const token = createJWTToken({
      id: user._id,
    })
    user.token = `Bearer ${token}`
    await user.save()
    return apiResponse.success(res, 'successfully logged in', {
      token: `Bearer ${token}`,
    })
  } catch (error) {
    console.log({ error })
    return apiResponse.fail(res)
  }
}

exports.me = async (req, res) => {
  console.log({ _id: req.userId, user: req.user })
  apiResponse.success(res, 'Working out')
}
