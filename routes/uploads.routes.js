import { Router } from "express"
import { check } from "express-validator"

import { validateFields } from "../middlewares/validate-fields.js"
import { loadFiles } from "../controllers/uploads.controller.js"

const router = Router()

router.post("/", loadFiles)

export default router
