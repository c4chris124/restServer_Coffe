import { response, request } from "express"
import { fileURLToPath } from "url"
import path from "path"

const loadFiles = (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: "No files on the request"
    })
    return
  }

  const { file } = req.files
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const uploadPath = path.join(__dirname, "../uploads/", file.name)

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
