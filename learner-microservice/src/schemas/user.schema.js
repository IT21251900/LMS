import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { hashPassword } from '../utils/hash.util.js'
import { timetable } from '../utils/timetable.js';


const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Fisrtname field is required.']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname field is required.']
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: [true, 'Email already exists.']
  },
  phone:{
    type: String,
    required: [true, 'Phone number field is required.']
  },
  password: {
    type: String,
    required: [true, 'Password field is required.']
  },
  userImage: {
    type: String, 
    default: 'default-user-image.jpg'
  },
  TimeTableSessions: [{
    day: {
      type: String,
      required: true
    },
    timeSlots: [{
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
  }]

})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

const User = mongoose.model('User', userSchema)

export default User

