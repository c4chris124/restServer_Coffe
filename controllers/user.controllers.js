import { response, request } from "express"
import User from "../models/user.js"
import bcryptjs from "bcryptjs"

const getUsers = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit))
  ])
  res.json({ total, users })
}

const postUsers = async (req = request, res = response) => {
  const { name, email, password, role } = req.body
  const newUser = new User({
    name,
    email,
    password,
    role
  })
  // encrypt
  const salt = bcryptjs.genSaltSync()
  newUser.password = bcryptjs.hashSync(password, salt)
  // save db
  await newUser.save()
  res.json({
    msg: "post API - controller",
    newUser
  })
}

const putUsers = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...userProp } = req.body

  // validate in db
  if (password) {
    // encrypt
    const salt = bcryptjs.genSaltSync()
    userProp.password = bcryptjs.hashSync(password, salt)
  }

  const userdb = await User.findByIdAndUpdate(id, userProp)

  res.json(userdb)
}

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: "patch API - controller"
  })
}

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params

  // deleting user physically
  // const user = await User.findByIdAndDelete(id)
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json({
    user
  })
}

export { getUsers, postUsers, putUsers, patchUsers, deleteUsers }
