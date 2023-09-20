// const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const { isCelebrateError } = require('celebrate')
const morgan = require('morgan')
// const admin = require('firebase-admin')

require('./src/utility/connection')
const Router = require('./src/routes/index')

const secrets = require('./src/utility/config')

//firebase connection
// const serviceAccount = require('./src/utility/socialblox-95604-firebase-adminsdk-5znoz-94bf09a9be.json')
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

const app = express()
app.use(morgan('dev'))

app.use(express.static('public'))
app.use(
  express.json({
    limit: '50mb',
  })
)

app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  })
)

app.use('/api', Router)

// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//   const message = 'Route Not Found!'
//   res.status(404)
//   res.json({
//     message: message,
//     statusCode: statusCode,
//     success: false,
//   })
// })

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    // Celebrate validation error occurred
    const validationError = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed',
      validation: {},
    }
    let message = ''
    for (const [key, value] of err.details.entries()) {
      const source = key
      const keys = [value.details[0].context.key]
      message = value.details[0].message
      validationError.message = message

      validationError.validation[source] = {
        source,
        keys,
        message,
      }
    }
    res.status(400).json(validationError)
    next()
  }
})

app.listen(secrets.PORT, () => {
  console.log('Connection is Set : ', secrets.PORT)
})
