import { response, request } from "express"
import { uploadFile } from "../helpers/index.js"

const loadFiles = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: "No files on the request"
    })
    return
  }

  try {
    // using try catch as rejects are blowing up the server
    // managed error in correct way
    // images
    // const ext = ["txt", "md"]
    // const fileName = await uploadFile(req.files, ext, "txt")
    const fileName = await uploadFile(req.files, undefined, "imgs")

    res.json({
      fileName
    })
  } catch (msg) {
    res.status(400).json({ msg })
  }
}

const updateImgs = async (req = request, res = response) => {
  const { id, collection } = req.params
  res.json({ id, collection })
}

export { loadFiles, updateImgs }
