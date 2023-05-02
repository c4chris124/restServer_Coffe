import jwt from "jsonwebtoken"
import { request, response } from "express"

const validateJWT = (req = request, res = response, next) => {
  const token = req.header("x-token")
  if (!token) {
    return res.status(401).json({
      msg: "Theres is token on the request"
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    req.uid = uid
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({
      msg: "Invalid token"
    })
  }
}

export { validateJWT }
