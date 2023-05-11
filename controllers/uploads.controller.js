import { response, request } from "express"
import { uploadFile } from "../helpers/index.js"

const loadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: "No files on the request"
    })
    return
  }
  // images
  const fileName = await uploadFile(req.files)

  res.json({
    fileName
  })
}

export { loadFiles }
