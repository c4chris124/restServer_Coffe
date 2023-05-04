import { response, request, json } from "express"
import bcryptjs from "bcryptjs"
import User from "../models/user.js"
import { generateJWT } from "../helpers/generate-jwt.js"
import { googleVerify } from "../helpers/google-verify.js"

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
  try {
    const { name, img, email } = await googleVerify(id_token)

    let user = await User.findOne({ email })

    if (!user) {
      // create user
      const data = {
        name,
        email,
        password: ";",
        img,
        google: true,
        role: "USER_ROLE"
      }
      user = new User(data)
      await user.save()
    }

    // if user in db
    if (!user.status) {
      return res.status(401).json({
        mgs: "Talk to admin, user blocked"
      })
    }

    // generate jwt
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({
      msg: "Token can not be verified"
    })
  }
}

export { login, googleSignIn }
