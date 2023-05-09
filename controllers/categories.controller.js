import { response, request } from "express"
import { Category } from "../models/index.js"

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const categoryDb = await Category.findOne({ name })

  if (categoryDb) {
    return res.status(400).json({
      msg: `The category ${categoryDb.name}, already exist`
    })
  }

  //   Generate data
  const data = {
    name,
    user: req.user._id
  }

  const category = await new Category(data)
  //   Save DB
  await category.save()

  res.status(201).json(category)
}

export { createCategory }
