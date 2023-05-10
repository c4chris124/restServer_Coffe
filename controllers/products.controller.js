import { request, response } from "express"
import { Product } from "../models/index.js"

// obtain Product - paginated - total - populate
const getProducts = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { status: true }

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(since))
      .limit(Number(limit))
  ])
  res.json({ total, products })
}

// obtain product - populate - {}
const getProductById = async (req = request, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name")
  res.json(product)
}

// create product
const createProduct = async (req = request, res = response) => {
  const { status, user, ...product } = req.body

  const productOnDb = await Product.findOne({ name: product.name })

  if (productOnDb) {
    return res.status(400).json({
      msg: `The Product with ${productOnDb.name}, already exist`
    })
  }

  // generate data to save
  const data = {
    ...product,
    name: product.name.toUpperCase(),
    user: req.user._id
  }

  const newProduct = new Product(data)

  await newProduct.save()
  res.status(201).json(newProduct)
}

// update Product
const updateProduct = async (req = request, res = response) => {
  const { id } = req.params
  const { status, user, ...product } = req.body

  if (product.name) {
    product.name = product.name.toUpperCase()
  }

  product.user = req.user._id

  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true
  })
  res.json(updatedProduct)
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params
  const product = await Product.findOneAndUpdate(
    id,
    { status: false },
    { new: true }
  )
  res.json(product)
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
