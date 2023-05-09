import { request, response } from "express"
import { Product } from "../models/index.js"

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

export { createProduct }
