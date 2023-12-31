const secrets = {
  PORT: process.env.APP_PORT,
  DB_URL: process.env.DB_URL,
  DEFAULT_OTP: '1234',
  EMAIL_CODE_EXPIRATION_TIME: 1, //in minutes
  PHONE_CODE_EXPIRATION_TIME: 1, //in minutes
  SMTP_USER_NAME: process.env.SMTP_USER_NAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SESSION_EXPIRED_TIME: 30,
  OTP_ATTEMPTS_MAXIMUM_COUNT: 3, //3 times
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
}

module.exports = secrets
