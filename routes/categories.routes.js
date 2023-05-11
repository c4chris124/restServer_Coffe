import { Router } from "express"
import { check } from "express-validator"
import { hasRole, validateFields, validateJWT } from "../middlewares/index.js"
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from "../controllers/categories.controller.js"
import { categoryExistById } from "../helpers/index.js"

const router = Router()

/* {{url/aoi/categories}} */

// obtain all categories - public
router.get("/", getCategories)

// obtain a category by id - public
router.get(
  "/:id",
  [
    check("id", "This is not valid ID").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields
  ],
  getCategoryById
)
// create category - private - anyone with a valid token
router.post(
  "/",
  [
    validateJWT,
    check("name", "name is a must").not().isEmpty(),
    validateFields
  ],
  createCategory
)

// update - private - anyone with valid token
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is a must").not().isEmpty(),
    check("id").custom(categoryExistById),
    validateFields
  ],
  updateCategory
)

// delete - Admin
router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "This is not valid ID").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields
  ],
  deleteCategory
)

export default router
