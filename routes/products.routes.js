import { Router } from "express"
import { check } from "express-validator"
import { hasRole, validateFields, validateJWT } from "../middlewares/index.js"
import {
  getProducts,
  createProduct
} from "../controllers/products.controller.js"
import { categoryExistById } from "../helpers/db-validators.js"
const router = Router()

// obtain all products - public
router.get("/", getProducts)

// router.get('/')

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
