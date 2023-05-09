import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { request, response } from "express"

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token")
  if (!token) {
    return res.status(401).json({
      msg: "Theres is no token on the request"
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    // read user who corresponde the uid
    const user = await User.findById(uid)
    if (!user) {
      return res.status(401).json({
        msg: "Invalid Token - user does not exist on DB"
      })
    }
    // verify if uid is not false
    if (!user.status) {
      return res.status(401).json({
        msg: "Invalid Token - user false"
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      msg: "Invalid token"
    })
  }
}

export { validateJWT }
