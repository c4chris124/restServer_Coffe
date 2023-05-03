import { Router } from "express"
import { check } from "express-validator"
import { validateFields } from "../middlewares/validate-fields.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { isAdminRole, hasRole } from "../middlewares/validate-roles.js"
import {
  emailExist,
  isRoleValid,
  userByIdExist
} from "../helpers/db-validators.js"
import {
  deleteUsers,
  getUsers,
  patchUsers,
  postUsers,
  putUsers
} from "../controllers/user.controllers.js"

const router = Router()

router.get("/", getUsers)
router.post(
  "/",
  [
    check("name", "Name is a must").not().isEmpty(),
    check(
      "password",
      "Password is a must, should be at least 6 characters"
    ).isLength({ min: 6 }),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailExist),
    // check("role", "This is not a valid role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields
  ],
  postUsers
)
router.put(
  "/:id",
  [
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(userByIdExist),
    check("role").custom(isRoleValid),
    validateFields
  ],
  putUsers
)
router.patch("/", patchUsers)
router.delete(
  "/:id",
  [
    validateJWT,
    // isAdminRole,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "Is not a valid ID").isMongoId(),
    check("id").custom(userByIdExist),
    validateFields
  ],
  deleteUsers
)

export default router
