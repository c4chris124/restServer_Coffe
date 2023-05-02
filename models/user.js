import { Schema, model } from "mongoose"

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is a must"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "The email is a must"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "The password is a must"]
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"]
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id
  return user
}

export default model("User", UserSchema)
