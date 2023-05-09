import { Router } from "express"
import { check } from "express-validator"
import { hasRole, validateFields, validateJWT } from "../middlewares/index.js"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct
} from "../controllers/products.controller.js"
import {
  categoryExistById,
  productExistById
} from "../helpers/db-validators.js"
const router = Router()

// obtain all products - public
router.get("/", getProducts)

// obtain a category by id - public
router.get(
  "/:id",
  [
    check("id", "This is not valid ID").isMongoId(),
    check("id").custom(productExistById),
    validateFields
  ],
  getProductById
)

// create category - private - anyone with a valid token
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is a must").not().isEmpty(),
    check("category", "This is not valid Category ID").isMongoId(),
    check("category").custom(categoryExistById),
    validateFields
  ],
  createProduct
)

// update - private - anyone with valid token
router.put(
  "/:id",
  [
    validateJWT,
    check("id").custom(productExistById),
    check("category", "This is not valid Category ID").isMongoId(),
    check("category").custom(categoryExistById),
    validateFields
  ],
  updateProduct
)

// delete - Admin

export default router
