import { Router } from "express"
import { check } from "express-validator"
import {
  isAdminRole,
  validateFields,
  validateJWT
} from "../middlewares/index.js"
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from "../controllers/categories.controller.js"

const router = Router()

/* {{url/aoi/categories}} */

// obtain all categories - public
router.get("/", getCategories)

// obtain a category by id - public
// [check("id").custom(categoryExist)]
router.get("/:id", getCategoryById)
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
router.put("/:id", updateCategory)

// delete - Admin
router.delete(
  "/:id",
  [validateJWT, isAdminRole, validateFields],
  deleteCategory
)

export default router
