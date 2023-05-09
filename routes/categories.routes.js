import { Router } from "express"
import { check } from "express-validator"
import { validateFields, validateJWT } from "../middlewares/index.js"
import { createCategory } from "../controllers/categories.controller.js"

const router = Router()

/* {{url/aoi/categories}} */

// obtain all categories - public
router.get("/", (req, res) => {
  res.json("get")
})

// obtain a category by id - public
router.get("/:id", (req, res) => {
  res.json("get - id")
})
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
router.put("/:id", (req, res) => {
  res.json("put")
})

// delete - Admin
router.delete("/:id", (req, res) => {
  res.json("delete")
})

export default router
