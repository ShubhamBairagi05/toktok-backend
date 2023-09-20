const { s3bucket } = require('../statics/s3service')
const jwt = require('jsonwebtoken')
const secrets = require('./config')

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

const deleteFile = async (url) => {
  try {
    const key = url.replace('https://socialbox-018.s3.amazonaws.com', '')
    const deleteParams = {
      Bucket: 'socialbox-018',
      Key: key,
    }

    // Delete the image from the S3 bucket
    s3bucket.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.error('Error deleting image:', err)
      } else {
        console.log('Image deleted successfully:', data)
      }
    })
    return true
  } catch (error) {
    console.log('Image deleted successfully:', error.message)
    return false
  }
}

const createJWTToken = (payload) =>
  jwt.sign(payload, secrets.JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  })

module.exports = {
  isValidEmail: isValidEmail,
  isValidPassword: isValidPassword,
  deleteFile: deleteFile,
  createJWTToken: createJWTToken,
}
