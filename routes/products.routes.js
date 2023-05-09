import { Router } from "express"
import { check } from "express-validator"
import { hasRole, validateFields, validateJWT } from "../middlewares/index.js"
import {
  getProducts,
  getProductById,
  createProduct
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
    check("category").custom(categoryExistById),
    validateFields
  ],
  createProduct
)

// router.put('/')

// router.delete('/')

export default router
// 64598e7d9768c07f9092a5df
