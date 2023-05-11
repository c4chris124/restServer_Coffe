import { response, request } from "express"
import { fileURLToPath } from "url"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const loadFiles = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: "No files on the request"
    })
    return
  }

  const { file } = req.files
  const cutName = file.name.split(".")
  const extension = cutName[cutName.length - 1]

  // validate extension
  const validExtensions = ["png", "JPG", "jpeg", "gif"]
  if (!validExtensions.includes(extension)) {
    return res.status(400).json({
      msg: `The extension ${extension} is not allowed in ${validExtensions}`
    })
  }

  const tempFileName = `${uuidv4()}.${extension}`
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const uploadPath = path.join(__dirname, "../uploads/", tempFileName)

  file.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).json({ err })
    }

    res.json({
      msg: `File uploaded to ${uploadPath}`
    })
  })
}

export { loadFiles }
