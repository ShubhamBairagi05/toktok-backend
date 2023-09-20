const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    email: { tyep: String },
    password: { tyep: String, minLength: 6 },
  },
  {
    timestamps: true,
  }
)

const User = new mongoose.model('User', userSchema)

module.exports = User
