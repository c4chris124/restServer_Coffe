import { response, request } from "express"

const login = (req = request, res = response) => {
  res.json({
    msg: "Login Ok"
  })
}

export { login }
