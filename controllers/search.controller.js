import { request, response } from "express"
import { Types } from "mongoose"
import { User, Category, Product } from "../models/index.js"

const allowedCollections = ["users", "categories", "products", "roles"]
const { ObjectId } = Types

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term)
  if (isMongoID) {
    const user = await User.findOne({ $and: [{ _id: term }, { status: true }] })
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(term, "i")

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  })
  res.json({
    results: users
  })
}

const search = (req = request, res = response) => {
  const { collection, term } = req.params

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The ${collection} is not allowed, allowed collections are ${allowedCollections}`
    })
  }

  switch (collection) {
    case "users":
      searchUsers(term, res)
      break
    case "categories":
      break
    case "products":
      break
    default:
      res.status(500).json({
        msg: "Search forgiven"
      })
  }
}

export { search }
