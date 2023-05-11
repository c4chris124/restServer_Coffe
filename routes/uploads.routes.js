import { Router } from "express"
import { check } from "express-validator"
import { validateFields } from "../middlewares/index.js"
import { loadFiles, updateImgs } from "../controllers/uploads.controller.js"
import { allowCollections } from "../helpers/index.js"

const router = Router()

router.post("/", loadFiles)

router.put(
  "/:collection/:id",
  [
    check("id", "Invalid mongo ID").isMongoId(),
    check("collection").custom((c) =>
      allowCollections(c, ["users", "products"])
    ),
    validateFields
  ],
  updateImgs
)

export default router
