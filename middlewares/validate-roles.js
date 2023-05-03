import { request, response } from "express"

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "You want to verify the role without verifying the token first"
    })
  }
  const { role, name } = req.user
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not an administrator - Can not do the requested action`
    })
  }
  next()
}

export { isAdminRole }
