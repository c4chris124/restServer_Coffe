import { request, response } from "express"
import { Product } from "../models/index.js"

// obtain Product - paginated - total - populate
const getProducts = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { status: true }

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(since))
      .limit(Number(limit))
      .populate("category", "name")
  ])
  res.json({ total, products })
}

// create product
const createProduct = async (req = request, res = response) => {
  const product = req.body
  const data = {
    ...product,
    user: req.user._id
  }

  const newProduct = await new Product(data)
  await newProduct.save()
  res.status(201).json(newProduct)
}

export { getProducts, createProduct }
