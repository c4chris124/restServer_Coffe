import { response, request } from "express"
import User from "../models/user.js"
import bcryptjs from "bcryptjs"
import { generateJWT } from "../helpers/generate-jwt.js"

const login = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    // verify if email exist
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: "User / Password are not correct - email"
      })
    }
    // if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: "User / Password are not correct - status: false"
      })
    }
    // verify password
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password are not correct - password"
      })
    }
    // generate JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: "Talk to the Admin"
    })
  }
}

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body
  res.json({
    msg: "Ok Google",
    id_token
  })
}

export { login, googleSignIn }
