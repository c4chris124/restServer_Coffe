import { request, response } from "express"
import { Types } from "mongoose"
import { User, Category, Product } from "../models/index.js"

const allowedCollections = ["users", "categories", "products", "roles"]
const { ObjectId } = Types

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term)
  if (isMongoID) {
    const user = await User.findById(term)
    res.json({
      results: user ? [user] : []
    })
  }
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
