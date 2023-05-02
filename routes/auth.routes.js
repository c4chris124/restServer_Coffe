import { Router } from "express"
import { check } from "express-validator"
import { login } from "../controllers/auth.controller.js"
import { validateFields } from "../middlewares/validate-fields.js"

const router = Router()

router.post(
  "/login",
  [
    check("email", "The Email is a must").isEmail(),
    check("password", "The password is a must").not().isEmpty(),
    validateFields
  ],
  login
)

export default router
