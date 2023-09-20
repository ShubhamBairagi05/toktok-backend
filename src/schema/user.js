const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    full_name: { type: String },
    user_name: { type: String },
    birth_date: { type: Date },
    phone_no: { type: Number },
    occupation: { type: String },
    bio: { type: String },
    avtar: { type: String },
    country: { type: Number },
    token: { type: String },
    location: { type: String },
    is_public: { type: Boolean, default: false },
    followers_count: { type: Number, default: 0 },
    following_count: { type: Number, default: 0 },
    post_count: { type: Number, default: 0 },
    // is_profile_complete: { type: Boolean, default: false },
    is_email_verified: { type: Boolean, default: false },
    is_mobile_verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
const User = new mongoose.model('User', userSchema)
module.exports = User
