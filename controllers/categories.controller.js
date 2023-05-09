import { response, request } from "express"
import { Category } from "../models/index.js"

// obtain categories - paginated - total - populate
const getCategories = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { status: true }

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("user")
  ])
  res.json({ total, categories })
}

// obtain category - populate - {}
const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params
  const category = await Category.findById(id)
  res.json(category)
}

// create category
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

// update category
const updateCategory = async (req = request, res = response) => {
  const { id } = req.params
  const { name } = req.body
  const categoryDB = await Category.findByIdAndUpdate(id, name)
  res.json(categoryDB)
}
// delete category - status:false
const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params
  const category = await Category.findOneAndUpdate(id, { status: false })
  res.json(category)
}

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}
